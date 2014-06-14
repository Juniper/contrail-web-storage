/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */


cephOSDsView = function () {

    var self = this;
    var errorMsg;
    osdsBubble = new osdScatterPlot();
    this.osdsBubble = osdsBubble;
    osdsTree = new osdTree();
    this.osdsTree = osdsTree;
    var currOSD = null;

    /*osdDetailsDV = new kendo.data.DataSource({
        pageSize:10,
        sort: {field: "id", dir: "asc"}
    });

    singleOSDDS = new kendo.data.DataSource({pageSize:15});
    */
    osdDetailsDV = new ContrailDataView();
    singleOSDDS = new ContrailDataView();


    this.setOSDsBubbleData = function(data){
        this.osdsBubbleData = data;
        this.osdsBubble.refresh(this.osdsBubbleData);
    }

    this.setOSDsTreeData = function(data){
        this.osdsTreeData = data;
        this.osdsTree.update(this.osdsTreeData, true);
        /*
         if(!treeRoot) {
         treeRoot = true;
         this.osdsTree.update(this.osdsTreeData, treeRoot);
         }
         else{
         this.osdsTree.update(this.osdsTreeData, true);
         }*/
    }

    this.setOSDsDetailsData = function(data){
        osdDetailsDV.setData(data);
        /*if( currOSD == null)
         showOSDDetails();
         */
    }

    this.getOSDsDetailsData = function(){
        return osdDetailsDV.getItems();
    }

    this.setSingleOSDData = function(data){
        singleOSDDS.data(data);
    }

    this.setCurrOSD = function(data){
        currOSD = data;
        showOSDDetails(currOSD);
    }

    this.getCurrOSD = function(){
        return currOSD;
    }

    this.setErrorMessage = function(msg){
        errorMsg = msg;
        $('#scatter-log-message').text(errorMsg);
    }

    function populateOSDs() {
        var osdNodesTemplate = Handlebars.compile($("#storage-disks-template").html());
        $(pageContainer).html(osdNodesTemplate({}));

        $('#osdsTabStrip').contrailTabs({
            activate: onTabActivate
        });

        // scatter chart
        this.osdsBubble.init();
        this.osdsBubble.draw();
        // SVGs for Tree chart
        $("#svg-osd-tree-osd").html(svgOsd).contents();
        $("#svg-osd-tree-host").html(svgHost).contents();

        $("#gridOSDs").contrailGrid({

            header : {
                title : {
                    text : 'Disks',
                    cssClass : 'blue',
                    icon : 'icon-list',
                    iconCssClass : 'blue'
                }
            },
            columnHeader : {
                columns: [
                    {
                        field:"id",
                        name:"ID",
                        width:50
                    },
                    {
                        field:"status",
                        name:"Status",
                        formatter:function(r,c,d,cd,dc){
                            if(dc.status == "up")
                                return '<span class="grid-osd label label-info">up</span>';
                            else if(dc.status == "down")
                                return '<span class="grid-osd label label-important">down</span>';
                        },
                        cssClass: 'grid-status-label',
                        width:50
                    },
                    {
                        field:"cluster_status",
                        name:"Cluster Status",
                        formatter:function(r,c,d,cd,dc){
                            if(dc.cluster_status == "in")
                                return '<span class="grid-osd label label-success">in</span>';
                            else if(dc.cluster_status == "out")
                                return '<span class="grid-osd label label-warning">out</span>';
                        },
                        cssClass: 'grid-status-label',
                        width:100
                    },
                    {
                        field:"name",
                        name:"OSD name",
                        width:80
                    },
                    {
                        field:"host",
                        name:"Host",
                        width:150
                    },
                    {
                        field:"gb",
                        name:"Total GB",
                        width:100
                    },
                    {
                        field:"gb_used",
                        name:"Used GB",
                        width:100
                    },
                    {
                        field:"avail_percent",
                        name:"Available %",
                        width:100
                    }
                ]
            },
            body : {
                options : {
                    autoHeight : true,
                    checkboxSelectable: false,
                    lazyLoading: true,
                    forceFitColumns: true,
                    detail: {
                        template: '<p>Details :</p>',
                        onInit: function(e,dc) {
                            setTimeout(function(){
                                $.each(dc, function(idx,val){
                                    $(e.detail).addClass('basicDetails');
                                    $(e.detailRow).append('<p><span style="color: steelblue"> ' + idx +'</span> : ' + val +'</p>');
                                });
                                $("#gridOSDs").data('contrailGrid').adjustDetailRowHeight(dc.id);
                            },1000);
                        },
                        onExpand: function(e,dc) {

                        },
                        onCollapse: function(e,dc) {

                        }
                    }
                },
                dataSource : {
                    dataView : osdDetailsDV,
                    events: {
                        onUpdateDataCB: function() {
                            var dvGrid = $('#gridOSDs').data('contrailGrid');
                            dvGrid.removeGridLoading();
                        }
                    }
                }
            },
            footer : {
                pager : {
                    options : {
                        pageSize : 5,
                        pageSizeSelect : [ 5, 10, 50 ]
                    }
                }
            }
        });

        this.osdsTree.init();

        getOSDs();
        getOSDsTree();

    }

    this.load = function (obj) {
        layoutHandler.setURLHashParams({node:'Disks'},{merge:false,triggerHashChange:false});
        populateOSDs();
    };
    this.parseOSDsData = function(respData){

        var retArr = [], osdErrArr = [];
        var osdArr = [], osdUpInArr= [], osdDownArr = [], osdUpOutArr = [];
        var skip_osd_bubble = new Boolean();

        if(respData != null){
            var osds = respData.osds;
            $.each(osds, function(idx, osd){
                skip_osd_bubble = false;

                if(osd.kb){
                    osd.avail_percent = calcPercent(osd.kb_avail,osd.kb);
                    osd.gb =  kiloByteToGB(osd.kb);
                    osd.gb_avail = kiloByteToGB(osd.kb_avail);
                    osd.gb_used = kiloByteToGB(osd.kb_used);
                }
                else{
                    skip_osd_bubble = true;
                    osd.gb = 'Not Available';
                    osd.gb_used = 'Not Available';
                    osd.gb_avail = 'Not Available';
                    osd.avail_percent = 'Not Available';
                }

                // Add to OSD scatter chart data of flag is not set
                if(!skip_osd_bubble){
                    if (osd.status == "up"){
                        if(osd.cluster_status == "in"){
                            osdUpInArr.push(osd);
                        }
                        else if(osd.cluster_status == "out"){
                            osdUpOutArr.push(osd);
                        }else{}
                    }
                    else if(osd.status == "down"){
                        osdDownArr.push(osd);
                    }
                    else{}
                }
                else{
                    osdErrArr.push(osd.name);
                }

                // All OSDs data should be pushed here for List grid
                osdArr.push(osd);
            });

            allGroup = {}, upInGroup = {}, upOutGroup = {}, downGroup= {};
            /*
             allGroup.key = "OSDs";
             allGroup.values = osdArr;
             retArr.push(allGroup);
             */

            //UP & IN OSDs
            upInGroup.key = "UP & IN ";
            upInGroup.values = osdUpInArr;
            upInGroup.color = color_success;
            retArr.push(upInGroup);
            //UP & OUT OSDs
            upOutGroup.key = "UP & OUT";
            upOutGroup.values = osdUpOutArr;
            upOutGroup.color = color_warn;
            retArr.push(upOutGroup);
            //Down OSDs
            downGroup.key = "Down";
            downGroup.values = osdDownArr;
            downGroup.color = color_imp;
            retArr.push(downGroup);
        }
        this.setOSDsDetailsData(osdArr);
        this.setOSDsBubbleData(retArr);
        if(osdErrArr.length != 0){
            var msg = ' Following OSDs were not added to Scatter Chart due to insuffient data ';
            $.each(osdErrArr, function(idx, osd){
                msg = msg + " " +osd + " ";
            });
            this.setErrorMessage(msg);
        }
        else{
            this.setErrorMessage('None');
        }
    }
    function onTabActivate(e, ui){
        selTab = ui.newTab.context.innerText;
        if(selTab == "Scatter Plot"){
            storInfraOSDsView.osdsBubble.refresh(storInfraOSDsView.osdsBubbleData);
        }
    }

}

storInfraOSDsView = new cephOSDsView();

function getOSDs(){
    $.ajax({
        url: '/api/tenant/storage/cluster/osds/summary',
        dataType: "json",
        cache: false

    }).done(function(response){
        test = response;
        storInfraOSDsView.parseOSDsData(test);

    }).fail(function(result) {

    });

}

function osdScatterPlot(){
    var self = this;
    var chart;

    this.init = function(){
        var chart = nv.models.scatterChart()
            .margin({top: 20, right: 20, bottom: 50, left: 80})
            .showDistX(true)
            .showDistY(true)
            .showLegend(true)
            .tooltips(true)
            //.transitionDuration(350)
            .size(25).sizeRange([200,200])
            .shape("circle")
            .x(function(d){return d.avail_percent})
            .y(function(d){return d.gb})
            .tooltipContent(function(key, x, y, e, graph){
                return '<h3>' + e.point.name + '</h3>' +
                    '<p> Status: ' + e.point.status + '</p>' +
                    '<p> Host: ' + e.point.host + '</p>' +
                    '<p> GB Avail: ' + e.point.gb_avail+ '</p>';})
            .color(function(d){return d.color});

        //Axis settings
        chart.xAxis
            .tickFormat(d3.format('.02f'))
            .axisLabel('Available Percentage');
            //.axisLabelDistance(5);

        chart.yAxis
            .tickFormat(d3.format('.02f'))
            .axisLabel('Total space (GB)')

        chart.scatter.dispatch.on('elementClick', function(e){ showOSDDetails(e.point.name);});
        //chart.scatter.dispatch.on('elementMouseover', function(){ /*console.log(d3.select(this).attr());*/});

        this.chart = chart;

    }

    this.draw = function(){
        nv.addGraph(function() { return this.chart});
    }

    this.refresh = function(data){

        /*var q = d3.geom.quadtree(nodes),
         i = 0,
         n = nodes.length;

         while (++i < n) {
         q.visit(collide(nodes[i]));
         }

         this.chart.selectAll("circle")
         .attr("cx", function(d) { return d.x; })
         .attr("cy", function(d) { return d.y; });
         */

        // retrieves all the data from chart
        //d3.selectAll('g.nv-wrap.nv-scatter').data()

        /* calculating X and Y axis ranges.
         extent of gb and avail_percent of all OSDs in all groups
         is taken and padding is added to eliminate circles shown on chart margin
         */
        var yvals = [];
        $.each(data, function(idx,grp){
            $.each(grp.values, function(i,osd){
                yvals.push(parseFloat(osd.gb));
            });
        });
        var yscale = d3.extent(yvals);

        yscale[0] = yscale[0] - 150;
        yscale[1] = yscale[1] + 150;

        var xvals = [];
        $.each(data, function(idx,grp){
            $.each(grp.values, function(i,osd){
                xvals.push(parseFloat(osd.avail_percent));
            });
        });
        var xscale = d3.extent(xvals);
        xscale[0] = xscale[0] - 0.2;
        xscale[1] = (xscale[1] >= 95.5)? 100.00:xscale[1]+0.5;

        this.chart.forceX(xscale)
            .forceY(yscale)

        d3.select('#osd-bubble svg')
            .datum(data)
            .call(this.chart);

        nv.utils.windowResize(this.chart.update);

    }
    function collide(node) {
        var r = node.radius + 16,
            nx1 = node.x - r,
            nx2 = node.x + r,
            ny1 = node.y - r,
            ny2 = node.y + r;
        return function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                    y = node.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = node.radius + quad.point.radius;
                if (l < r) {
                    l = (l - r) / l * .5;
                    node.x -= x *= l;
                    node.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2
                || x2 < nx1
                || y1 > ny2
                || y2 < ny1;
        };
    }
}

function showOSDDetails(osd_name){
    var retArr = [];

    osds = storInfraOSDsView.getOSDsDetailsData();

    var fields = ['Name', 'Host', 'UUID', 'Public Address', 'Reweight', 'Crush Weight', 'Depth',
        'Total GB', 'Available GB', 'Used GB', 'Apply Latency ms', 'Commit Latency ms', 'Down Stamp','Cluster Status', 'Status'];

    $.each(fields, function(idx,val){
        var obj = {};
        obj['field'] = val;
        obj['value'] = '';
        retArr.push(obj);
    });

    if(osd_name == null){
        osd_name = 'osd.0';
    }

    if(osds != null){
        $.each(osds, function(idx, osd){
            if(osd.name == osd_name){
                retArr[0]['value'] = osd.name;
                retArr[1]['value'] = osd.host;
                retArr[2]['value'] = osd.uuid;
                retArr[3]['value'] = osd.public_addr;
                retArr[4]['value'] = osd.reweight;
                retArr[5]['value'] = osd.crush_weight;
                retArr[6]['value'] = osd.depth;
                retArr[7]['value'] = osd.gb;
                retArr[8]['value'] = osd.gb_avail;
                retArr[9]['value'] = osd.gb_used;
                retArr[10]['value'] = osd.fs_perf_stat.apply_latency_ms;
                retArr[11]['value'] = osd.fs_perf_stat.commit_latency_ms;
                retArr[12]['value'] = osd.osd_xinfo.down_stamp;
                retArr[13]['value'] = osd.cluster_status;
                retArr[14]['value'] = osd.status;
            }
        });
    }
    $("#osd-details").removeClass("osd-details-default");
    $("#osd-details").addClass("osd-details");
    storInfraOSDsView.setSingleOSDData(retArr);
    return retArr;
}

function getOSDsTree(){
    $.ajax({
        url: '/api/tenant/storage/cluster/osds/tree',
        dataType: "json",
        cache: false

    }).done(function(response){
        parseOSDsTreeData(response);

    }).fail(function(result) {

    });

}

function getOSDColor(status, cluster_status){
    if(status == 'up'){
        if(cluster_status == 'in')
            return color_success;
        else if(cluster_status == 'out')
            return color_warn;
        else
            return color_info;
    }
    else if (status == 'down')
        return color_imp;
    else{}
}

function getHostColor(osdColorArr){
    var host_color = color_info;
    $.each(osdColorArr, function(idx, color){
        if(color == color_imp){
            host_color = color_imp;
            return;
        }
        else if(color == color_warn && host_color != color_warn && host_color != color_imp){
            host_color = color_warn;
        }
        else if(color == color_success && host_color != color_warn && host_color != color_imp){
            host_color = color_success;
        }
        else {}
    });
    return host_color;
}

function getHostStatus(statusArr){
    var host_status = 'up';
    $.each(statusArr, function(idx, status){
        // Following checks for OSD status [in, out, down]
        if(status == 'down'){
            host_status = 'critical';
            return;
        }
        else if(status == 'out' && host_status != 'critical'){
            host_status = 'warn';
        }
        else if(status == 'in' && host_status != 'warn' && host_status != 'critical'){
            host_status = 'active';
        }
        // Following checks for Host status itself [critical, warn, active]
        else if(status == 'critical'){
            host_status = 'critical';
        }
        else if(status == 'warn' && host_status != 'critical'){
            host_status = 'warn';
        }
        else if(status == 'active' && host_status != 'warn' && host_status != 'critical'){
            host_status = 'active';
        }
        else {}
    });
    return host_status;
}

function parseOSDsTreeData(data){
    root = data.osd_tree[0];
    var osdColorArr, osdStatusArr,
        hostColorArr = []
    hostStatusArr = [];

    $.each(root.children, function(idx, host){
        osdColorArr = [];
        osdStatusArr = [];
        $.each(host.children, function(idx, osd){
            osd.color =  getOSDColor(osd.status, osd.cluster_status);
            osdColorArr.push(osd.color);
            osdStatusArr.push(osd.status);
            osdStatusArr.push(osd.cluster_status);
        });
        host.color = getHostColor(osdColorArr);
        hostColorArr.push(host.color);
        host.status = getHostStatus(osdStatusArr);
        hostStatusArr.push(host.status);
    });

    root.color = getHostColor(hostColorArr);
    root.status = getHostStatus(hostStatusArr);
    storInfraOSDsView.setOSDsTreeData(root);
}

function osdTree() {
    this.init = function () {
        var self = this,
            margin = {top: 20, right: 120, bottom: 20, left: 120};

        this.width = 960 - margin.right - margin.left;
        this.height = 500 - margin.top - margin.bottom;
        this.duration = 750;
        this.expandedNodes = [];

        this.tree = d3.layout.tree()
            .size([this.height, this.width]);

        this.diagonal = d3.svg.diagonal()
            .projection(function (d) {
                return [d.y, d.x];
            });

        this.infoTooltip = d3.select("#tree-tip").append("div")
            .attr("class", "nvtooltip")
            .style("opacity", 0);

        this.svgTree = d3.select("#osd-tree").append("svg")
            .attr("width", this.width + margin.right + margin.left)
            .attr("height", this.height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    }

    function selectiveCollapse(d, expansionArr){
        $.each(d.children, function(idx, host){
            var found = $.inArray(host.name, expansionArr);
            if(found < 0 ){
                if (host.children) {
                    host._children = host.children;
                    host._children.forEach(collapse);
                    host.children = null;
                }
            }
        });
        return d;
    }

    this.update = function(source, root_flag) {
        if(root_flag) {
            root.x0 = this.height / 2;
            root.y0 = 0;
            var duration = 750;
            diagonal = this.diagonal;

            //root.children.forEach(collapse);
            //source = root;
            this.infoTooltip = d3.select("#tree-tip").append("div")
                .attr("class", "nvtooltip")
                .style("opacity", 0);


            if (storInfraOSDsView.osdsTree.expandedNodes.length != 0) {
                var clickedArr = storInfraOSDsView.osdsTree.expandedNodes.slice(0);
                source = selectiveCollapse(source, clickedArr);
            }
            else {
                source.children.forEach(collapse);
                root = source;
            }
        }

        // Compute the new tree layout.
        var nodes = this.tree.nodes(root).reverse(),
            links = this.tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function(d) { d.y = d.depth * 180; });

        // Update the nodes…
        var node = this.svgTree.selectAll("g.node")
            .data(nodes, function(d) { return d.id; });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; });

        /*
         nodeEnter.append("circle")
         .attr("r", 1e-6)
         .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
         */
        nodeEnter.append("use")
            .attr("xlink:href", function (d) {
                if (d.type == 'osd') {
                    if (d.status == 'up')
                        return "#" + d.type + "-" + d.cluster_status;
                    else
                        return "#" + d.type + "-" + d.status;
                }
                else if (d.type == 'host') {
                    return "#" + d.type + "-" + d.status;
                }
                else if (d.type == 'root') {
                    return "#host" + "-" + d.status;
                }
                else {
                }
            })
            .attr("transform", "translate(0,-10)")
            .style("opacity", 0.9)
            .on("click", nodeClick)
            .on("mouseover", nodeMouseover)
            .on("mouseout", nodeMouseout);

        nodeEnter.append("text")
            .attr("x", function(d) { return d.children || d._children ? -24 : 35; })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
            .text(function(d) { return d.name; })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("use")
            .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("use")
            .style("opacity", 0);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = this.svgTree.selectAll("path.link")
            .data(links, function(d) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .style("stroke", function (d) {
                return d.target.color;
            })
            .attr("d", function(d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

    }
    nodeClick = function (d) {
        var clickedArr = [];

        if(d.type == "host" || d.type == "root") {
            if (storInfraOSDsView.osdsTree.expandedNodes.length != 0) {
                clickedArr = storInfraOSDsView.osdsTree.expandedNodes.slice(0);
            }
            if (d.children) {
                d._children = d.children;
                d.children = null;
                var found = $.inArray(d.name, clickedArr);
                if (found >= 0) {
                    clickedArr.splice(found, 1);
                }
            } else {
                d.children = d._children;
                d._children = null;
                clickedArr.push(d.name);

            }
            if (clickedArr.length != 0) {
                storInfraOSDsView.osdsTree.expandedNodes = clickedArr.slice(0);
            }
            else {
                storInfraOSDsView.osdsTree.expandedNodes = [];
            }
            storInfraOSDsView.osdsTree.update(d, false);
        }

    }
    nodeMouseover = function(d){
        var infoTooltip = storInfraOSDsView.osdsTree.infoTooltip;
        var content = '';

        if(d.type == "host" || d.type == "root") {
            content = '<h3>' + d.name + '</h3>' +
                '<p> Status: ' + d.status + '</p>';
        }
        else if(d.type == "osd"){
            content = '<h3>' + d.name + '</h3>' +
                '<p> Status: ' + d.status + '</p>' +
                '<p> Cluster Status: ' + d.cluster_status + '</p>' +
                '<p> Cluster Addr: ' + d.cluster_addr + '</p>' +
                '<p> UUID: ' + d.uuid + '</p>';
            if(d.status != 'down'){
                content = content + '<p> Apply Latency: ' + d.fs_perf_stat.apply_latency_ms + '</p>' +
                '<p> Commit Latency: ' + d.fs_perf_stat.commit_latency_ms + '</p>';
            }
        }
        else{}

        infoTooltip.transition()
            .duration(200)
            .style("opacity", 0.9);

        infoTooltip.html(content)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) - 80 + "px");

    }
    nodeMouseout = function(d){
        var infoTooltip = storInfraOSDsView.osdsTree.infoTooltip;

        infoTooltip.transition()
            .duration(500)
            .style("opacity", 0);

    }
}
function OSDsDataRefresh(){
    getOSDs();
    getOSDsTree();
}

// Following SVG elemets are used int the tree plot. [osd-in, osd-out, osd-down] [host-active, host-warn, host-critical, host-up]

var svgOsd = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\
<!-- Created with Inkscape (http://www.inkscape.org/) -->\
\
<svg\
   xmlns:dc="http://purl.org/dc/elements/1.1/"\
   xmlns:cc="http://creativecommons.org/ns#"\
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\
   xmlns:svg="http://www.w3.org/2000/svg"\
   xmlns="http://www.w3.org/2000/svg"\
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\
   width="23.558245"\
   height="24.036367"\
   id="svg-osd"\
   version="1.1"\
   inkscape:version="0.48.2 r9819"\
   sodipodi:docname="osd_in.svg">\
  <defs\
     id="defs4" />\
  <sodipodi:namedview\
     id="base"\
     pagecolor="#ffffff"\
     bordercolor="#666666"\
     borderopacity="1.0"\
     inkscape:pageopacity="0.0"\
     inkscape:pageshadow="2"\
     inkscape:zoom="1.4"\
     inkscape:cx="268.98731"\
     inkscape:cy="131.20387"\
     inkscape:document-units="px"\
     inkscape:current-layer="layer1"\
     showgrid="false"\
     inkscape:window-width="1428"\
     inkscape:window-height="832"\
     inkscape:window-x="122"\
     inkscape:window-y="209"\
     inkscape:window-maximized="0"\
     fit-margin-top="0"\
     fit-margin-left="0"\
     fit-margin-right="0"\
     fit-margin-bottom="0" />\
  <metadata\
     id="metadata7">\
    <rdf:RDF>\
      <cc:Work\
         rdf:about="">\
        <dc:format>image/svg+xml</dc:format>\
        <dc:type\
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />\
        <dc:name />\
      </cc:Work>\
    </rdf:RDF>\
  </metadata>\
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="osd-in"\
     style="display:inline"\
     transform="translate(-7.7631987e-7,-1028.3258)">\
    <g\
       id="g4185"\
       style="fill:#1f77b4; opacity:0.5"\
       transform="matrix(0.767342,0,0,0.7889846,-170.94185,826.90093)">\
      <g\
         transform="matrix(0.09598435,0,0,0.07112623,201.26825,244.0475)"\
         id="g3147"\
         style="fill:#1f77b4;">\
        <g\
           id="g3144"\
           style="fill:#1f77b4;" />\
      </g>\
      <g\
         id="g12"\
         transform="matrix(0.06196776,0,0,-0.04969585,216.35724,287.25507)"\
         style="fill:#1f77b4;">\
        <g\
           id="g3169"\
           style="fill:#1f77b4;">\
          <g\
             id="g3163"\
             style="fill:#1f77b4;">\
            <g\
               id="g3158"\
               style="fill:#1f77b4;">\
              <g\
                 id="g3154"\
                 style="fill:#1f77b4;">\
                <g\
                   id="g3151"\
                   style="fill:#1f77b4;">\
                  <path\
                     sodipodi:nodetypes="csccccsccccc"\
                     d="m 598.68268,528.21905 c -13.926,-38.313 -110.496,-61.25 -246.621,-61.25 -136.121,0 -229.18,26.25 -246.621,63.445 l 0.254,0.305 0.125,-431.675998 -0.25,-0.305 c 0,-40.124517 114.78455,-68.679893 250.90955,-68.679893 136.121,0 242.07845,28.555376 242.07845,68.679893 l 0,0 0.262,0.305 0.125,429.476998 -0.262,-0.301"\
                     inkscape:connector-curvature="0"\
                     id="path14"\
                     style="fill:#1f77b4;;fill-rule:evenodd;stroke:none" />\
                </g>\
              </g>\
            </g>\
          </g>\
        </g>\
        <path\
           style="fill:#2ca02c;;fill-rule:evenodd;stroke:none"\
           id="path16"\
           inkscape:connector-curvature="0"\
           d="m 596.492,579.375 c 0,35.254 -110.379,63.711 -246.504,63.711 -136.121,0 -246.48,-28.457 -246.48,-63.711 0,-35.137 110.359,-63.727 246.48,-63.727 136.125,0 246.504,28.59 246.504,63.727 l 0,0" />\
      </g>\
      <path\
         inkscape:connector-curvature="0"\
         id="path4158"\
         d="m 234.01786,285.55097 c -5.85856,-0.51157 -9.46184,-1.36749 -10.61606,-2.52171 l -0.45537,-0.45537 0,-10.72106 0,-10.72106 0.40178,0.36738 c 1.20917,1.10563 4.48098,1.9636 9.10771,2.38832 3.08,0.28273 11.8722,0.11481 14.47111,-0.27639 2.3957,-0.36061 4.73406,-1.02755 5.66653,-1.61618 l 0.71001,-0.44822 0,10.61137 0,10.61137 -0.53293,0.44843 c -0.99172,0.83448 -3.36388,1.53913 -6.7885,2.01652 -1.79245,0.24987 -10.18512,0.47196 -11.96428,0.3166 z"\
         style="fill:#1f77b4; opacity:0.5" />\
    </g>\
  </g>\
  \
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="osd-out"\
     style="display:inline"\
     transform="translate(-7.7631987e-7,-1028.3258)">\
    <g\
       id="g4185"\
       style="fill:#1f77b4;"\
       transform="matrix(0.767342,0,0,0.7889846,-170.94185,826.90093)">\
      <g\
         transform="matrix(0.09598435,0,0,0.07112623,201.26825,244.0475)"\
         id="g3147"\
         style="fill:#1f77b4;">\
        <g\
           id="g3144"\
           style="fill:#1f77b4;" />\
      </g>\
      <g\
         id="g12"\
         transform="matrix(0.06196776,0,0,-0.04969585,216.35724,287.25507)"\
         style="fill:#1f77b4;">\
        <g\
           id="g3169"\
           style="fill:#1f77b4;">\
          <g\
             id="g3163"\
             style="fill:#1f77b4;">\
            <g\
               id="g3158"\
               style="fill:#1f77b4;">\
              <g\
                 id="g3154"\
                 style="fill:#1f77b4;">\
                <g\
                   id="g3151"\
                   style="fill:#1f77b4;">\
                  <path\
                     sodipodi:nodetypes="csccccsccccc"\
                     d="m 598.68268,528.21905 c -13.926,-38.313 -110.496,-61.25 -246.621,-61.25 -136.121,0 -229.18,26.25 -246.621,63.445 l 0.254,0.305 0.125,-431.675998 -0.25,-0.305 c 0,-40.124517 114.78455,-68.679893 250.90955,-68.679893 136.121,0 242.07845,28.555376 242.07845,68.679893 l 0,0 0.262,0.305 0.125,429.476998 -0.262,-0.301"\
                     inkscape:connector-curvature="0"\
                     id="path14"\
                     style="fill:#1f77b4;;fill-rule:evenodd;stroke:none" />\
                </g>\
              </g>\
            </g>\
          </g>\
        </g>\
        <path\
           style="fill:#ff7f0e;;fill-rule:evenodd;stroke:none"\
           id="path16"\
           inkscape:connector-curvature="0"\
           d="m 596.492,579.375 c 0,35.254 -110.379,63.711 -246.504,63.711 -136.121,0 -246.48,-28.457 -246.48,-63.711 0,-35.137 110.359,-63.727 246.48,-63.727 136.125,0 246.504,28.59 246.504,63.727 l 0,0" />\
      </g>\
      <path\
         inkscape:connector-curvature="0"\
         id="path4158"\
         d="m 234.01786,285.55097 c -5.85856,-0.51157 -9.46184,-1.36749 -10.61606,-2.52171 l -0.45537,-0.45537 0,-10.72106 0,-10.72106 0.40178,0.36738 c 1.20917,1.10563 4.48098,1.9636 9.10771,2.38832 3.08,0.28273 11.8722,0.11481 14.47111,-0.27639 2.3957,-0.36061 4.73406,-1.02755 5.66653,-1.61618 l 0.71001,-0.44822 0,10.61137 0,10.61137 -0.53293,0.44843 c -0.99172,0.83448 -3.36388,1.53913 -6.7885,2.01652 -1.79245,0.24987 -10.18512,0.47196 -11.96428,0.3166 z"\
         style="fill:#1f77b4;" />\
    </g>\
  </g>\
  \
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="osd-up"\
     style="display:inline"\
     transform="translate(-7.7631987e-7,-1028.3258)">\
    <g\
       id="g4185"\
       style="fill:#1f77b4;"\
       transform="matrix(0.767342,0,0,0.7889846,-170.94185,826.90093)">\
      <g\
         transform="matrix(0.09598435,0,0,0.07112623,201.26825,244.0475)"\
         id="g3147"\
         style="fill:#1f77b4;">\
        <g\
           id="g3144"\
           style="fill:#1f77b4;" />\
      </g>\
      <g\
         id="g12"\
         transform="matrix(0.06196776,0,0,-0.04969585,216.35724,287.25507)"\
         style="fill:#1f77b4;">\
        <g\
           id="g3169"\
           style="fill:#1f77b4;">\
          <g\
             id="g3163"\
             style="fill:#1f77b4;">\
            <g\
               id="g3158"\
               style="fill:#1f77b4;">\
              <g\
                 id="g3154"\
                 style="fill:#1f77b4;">\
                <g\
                   id="g3151"\
                   style="fill:#1f77b4;">\
                  <path\
                     sodipodi:nodetypes="csccccsccccc"\
                     d="m 598.68268,528.21905 c -13.926,-38.313 -110.496,-61.25 -246.621,-61.25 -136.121,0 -229.18,26.25 -246.621,63.445 l 0.254,0.305 0.125,-431.675998 -0.25,-0.305 c 0,-40.124517 114.78455,-68.679893 250.90955,-68.679893 136.121,0 242.07845,28.555376 242.07845,68.679893 l 0,0 0.262,0.305 0.125,429.476998 -0.262,-0.301"\
                     inkscape:connector-curvature="0"\
                     id="path14"\
                     style="fill:#1f77b4;;fill-rule:evenodd;stroke:none" />\
                </g>\
              </g>\
            </g>\
          </g>\
        </g>\
        <path\
           style="fill:#1F77B4;;fill-rule:evenodd;stroke:none"\
           id="path16"\
           inkscape:connector-curvature="0"\
           d="m 596.492,579.375 c 0,35.254 -110.379,63.711 -246.504,63.711 -136.121,0 -246.48,-28.457 -246.48,-63.711 0,-35.137 110.359,-63.727 246.48,-63.727 136.125,0 246.504,28.59 246.504,63.727 l 0,0" />\
      </g>\
      <path\
         inkscape:connector-curvature="0"\
         id="path4158"\
         d="m 234.01786,285.55097 c -5.85856,-0.51157 -9.46184,-1.36749 -10.61606,-2.52171 l -0.45537,-0.45537 0,-10.72106 0,-10.72106 0.40178,0.36738 c 1.20917,1.10563 4.48098,1.9636 9.10771,2.38832 3.08,0.28273 11.8722,0.11481 14.47111,-0.27639 2.3957,-0.36061 4.73406,-1.02755 5.66653,-1.61618 l 0.71001,-0.44822 0,10.61137 0,10.61137 -0.53293,0.44843 c -0.99172,0.83448 -3.36388,1.53913 -6.7885,2.01652 -1.79245,0.24987 -10.18512,0.47196 -11.96428,0.3166 z"\
         style="fill:#1f77b4;" />\
    </g>\
  </g>\
  \
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="osd-down"\
     style="display:inline"\
     transform="translate(-7.7631987e-7,-1028.3258)">\
    <g\
       id="g4185"\
       style="fill:#1f77b4;"\
       transform="matrix(0.767342,0,0,0.7889846,-170.94185,826.90093)">\
      <g\
         transform="matrix(0.09598435,0,0,0.07112623,201.26825,244.0475)"\
         id="g3147"\
         style="fill:#1f77b4;">\
        <g\
           id="g3144"\
           style="fill:#1f77b4;" />\
      </g>\
      <g\
         id="g12"\
         transform="matrix(0.06196776,0,0,-0.04969585,216.35724,287.25507)"\
         style="fill:#1f77b4;">\
        <g\
           id="g3169"\
           style="fill:#1f77b4;">\
          <g\
             id="g3163"\
             style="fill:#1f77b4;">\
            <g\
               id="g3158"\
               style="fill:#1f77b4;">\
              <g\
                 id="g3154"\
                 style="fill:#1f77b4;">\
                <g\
                   id="g3151"\
                   style="fill:#1f77b4;">\
                  <path\
                     sodipodi:nodetypes="csccccsccccc"\
                     d="m 598.68268,528.21905 c -13.926,-38.313 -110.496,-61.25 -246.621,-61.25 -136.121,0 -229.18,26.25 -246.621,63.445 l 0.254,0.305 0.125,-431.675998 -0.25,-0.305 c 0,-40.124517 114.78455,-68.679893 250.90955,-68.679893 136.121,0 242.07845,28.555376 242.07845,68.679893 l 0,0 0.262,0.305 0.125,429.476998 -0.262,-0.301"\
                     inkscape:connector-curvature="0"\
                     id="path14"\
                     style="fill:#1f77b4;;fill-rule:evenodd;stroke:none" />\
                </g>\
              </g>\
            </g>\
          </g>\
        </g>\
        <path\
           style="fill:#D62728;;fill-rule:evenodd;stroke:none"\
           id="path16"\
           inkscape:connector-curvature="0"\
           d="m 596.492,579.375 c 0,35.254 -110.379,63.711 -246.504,63.711 -136.121,0 -246.48,-28.457 -246.48,-63.711 0,-35.137 110.359,-63.727 246.48,-63.727 136.125,0 246.504,28.59 246.504,63.727 l 0,0" />\
      </g>\
      <path\
         inkscape:connector-curvature="0"\
         id="path4158"\
         d="m 234.01786,285.55097 c -5.85856,-0.51157 -9.46184,-1.36749 -10.61606,-2.52171 l -0.45537,-0.45537 0,-10.72106 0,-10.72106 0.40178,0.36738 c 1.20917,1.10563 4.48098,1.9636 9.10771,2.38832 3.08,0.28273 11.8722,0.11481 14.47111,-0.27639 2.3957,-0.36061 4.73406,-1.02755 5.66653,-1.61618 l 0.71001,-0.44822 0,10.61137 0,10.61137 -0.53293,0.44843 c -0.99172,0.83448 -3.36388,1.53913 -6.7885,2.01652 -1.79245,0.24987 -10.18512,0.47196 -11.96428,0.3166 z"\
         style="fill:#1f77b4;" />\
    </g>\
  </g>\
</svg>';

var svgHost = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\
<!-- Created with Inkscape (http://www.inkscape.org/) -->\
\
<svg\
   xmlns:dc="http://purl.org/dc/elements/1.1/"\
   xmlns:cc="http://creativecommons.org/ns#"\
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\
   xmlns:svg="http://www.w3.org/2000/svg"\
   xmlns="http://www.w3.org/2000/svg"\
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\
   width="46.517853"\
   height="13.169642"\
   id="svg-host"\
   version="1.1"\
   inkscape:version="0.48.2 r9819"\
   sodipodi:docname="host.svg">\
  <defs\
     id="defs4" />\
  <sodipodi:namedview\
     id="base"\
     pagecolor="#ffffff"\
     bordercolor="#666666"\
     borderopacity="1.0"\
     inkscape:pageopacity="0.0"\
     inkscape:pageshadow="2"\
     inkscape:zoom="0.98994949"\
     inkscape:cx="252.94643"\
     inkscape:cy="352.80815"\
     inkscape:document-units="px"\
     inkscape:current-layer="layer1"\
     showgrid="false"\
     inkscape:window-width="1656"\
     inkscape:window-height="974"\
     inkscape:window-x="85"\
     inkscape:window-y="71"\
     inkscape:window-maximized="0"\
     fit-margin-top="0"\
     fit-margin-left="0"\
     fit-margin-right="0"\
     fit-margin-bottom="0" />\
  <metadata\
     id="metadata7">\
    <rdf:RDF>\
      <cc:Work\
         rdf:about="">\
        <dc:format>image/svg+xml</dc:format>\
        <dc:type\
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />\
        <dc:name></dc:name>\
      </cc:Work>\
    </rdf:RDF>\
  </metadata>\
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="host-warn"\
     transform="translate(0,-1039.1925)">\
    <rect\
       style="fill:#8c564b;fill-opacity:1"\
       id="rect4280"\
       width="46.517853"\
       height="13.169642"\
       x="0"\
       y="1039.1925" />\
    <rect\
       style="fill:#ff7f0e;fill-opacity:1"\
       id="rect4282"\
       width="17.74563"\
       height="5.3064327"\
       x="24.992325"\
       y="1041.8243" />\
  </g>\
  \
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="host-critical"\
     transform="translate(0,-1039.1925)">\
    <rect\
       style="fill:#636363;fill-opacity:1"\
       id="rect4280"\
       width="46.517853"\
       height="13.169642"\
       x="0"\
       y="1039.1925" />\
    <rect\
       style="fill:#D62728;fill-opacity:1"\
       id="rect4282"\
       width="17.74563"\
       height="5.3064327"\
       x="24.992325"\
       y="1041.8243" />\
  </g>\
  \
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="host-active"\
     transform="translate(0,-1039.1925)">\
    <rect\
       style="fill:#7f7f7f;fill-opacity:1"\
       id="rect4280"\
       width="46.517853"\
       height="13.169642"\
       x="0"\
       y="1039.1925" />\
    <rect\
       style="fill:#2ca02c;fill-opacity:1"\
       id="rect4282"\
       width="17.74563"\
       height="5.3064327"\
       x="24.992325"\
       y="1041.8243" />\
  </g>\
  \
  <g\
     inkscape:label="Layer 1"\
     inkscape:groupmode="layer"\
     id="host-up"\
     transform="translate(0,-1039.1925)">\
    <rect\
       style="fill:#c7c7c7;fill-opacity:1"\
       id="rect4280"\
       width="46.517853"\
       height="13.169642"\
       x="0"\
       y="1039.1925" />\
    <rect\
       style="fill:#1F77B4;fill-opacity:1"\
       id="rect4282"\
       width="17.74563"\
       height="5.3064327"\
       x="24.992325"\
       y="1041.8243" />\
  </g>\
</svg>';
