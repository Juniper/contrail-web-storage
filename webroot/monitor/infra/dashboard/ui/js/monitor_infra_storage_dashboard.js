/**
 * Storage Nodes Tab
 */

var infraMonitorStorageDashView = (function() {
    var self = this;
    this.load = function (obj) {
        var hashParams = ifNull(obj['hashParams'], {});
        addStorageTabs();
        infraDashboardView.selectTabByHash();
    }
    return{
        load:self.load
    }
})();

function addStorageTabs() {
    /**
     * Storage Nodes Tab
     */
    storNodesDashboardTab = (function() {
        var storageNodesViewModel = function() {
            var self = this;
            self.data = ko.observableArray([]);
            self.downCnt = ko.computed(function() { return infraMonitorStorageUtils.getDownNodeCnt(self.data());});
            self.upCnt = ko.computed(function() { return self.data().length - self.downCnt();});
            self.totalCnt = ko.computed(function() { return self.upCnt() === '' ? '' : self.upCnt() + self.downCnt();});
        }
        var viewModel = new storageNodesViewModel();
        viewModel.data.subscribe(function(newValue) {
            self.updateView(newValue);
        })

        this.updateView = function(data) {
            if(!isScatterChartInitialized('#storageNode-bubble')) {
                $('#storageNodeStats-header').initWidgetHeader({title:'Storage Nodes',link:{hashParams:{p:'mon_infra_storage',q:{node:'Storage Nodes'}}}});
                var chartsData = {title:'Storage Nodes',xLbl:'Available (%)',yLbl:'Total Storage (GB)',chartOptions:{xPositive:true,addDomainBuffer:true},d:[{key:'Storage Nodes',values:data}]};
                $('#storageNode-bubble').initScatterChart(chartsData);
            } else {
            }
            self.updateStorageInfoBoxes();
        }

        this.updateStorageInfoBoxes = function(){

            var data = viewModel.data();
            var diskBuckets;
            var diskCnt=0,disks=[];
            var storageCF = crossfilter(data);
            $.each(data,function(idx,obj) {
                diskCnt += obj['osds'].length;
                obj.diskCnt = obj['osds'].length;
            });
            diskBuckets = bucketizeCFData(storageCF,function(d) { return d.diskCnt});
            var sparklinesStorData = {
                disks: {title:'Disks',data:[]}
            };

            $.each(ifNull(diskBuckets['data'],[]), function(key,val){
                sparklinesStorData['disks']['data'].push(val);
            });

            $('#sparkLineStorageStats').html('');
            var sparkLineTemplate  = contrail.getTemplate4Id('sparkline-template');
            var diskElem = $('<div></div>').html(sparkLineTemplate({title:'Disks',totalCnt:diskCnt,id:'infobox-disks'}));

            $('#sparkLineStorageStats').append(diskElem);
            $.each(sparklinesStorData,function(key,val){
                drawSparkLineBar('#infobox-' + key + ' .sparkline', val);
            })

            d3.select('#infobox-disks .sparkline')
                .selectAll("rect")
                .on("mouseover", function(d,i) {
                    $('body').find('.nvtooltip').remove();
                    var div = d3.select('body').append("div")
                        .attr("class", "nvtooltip");

                    div.transition().duration(10);

                    div.html('<span class="lbl">' + parseInt(d.value) + '</span> Hosts with <span class="lbl">' + d.name +'</span> ' + sparklinesStorData.disks.title)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    $('body').find('.nvtooltip').remove();
                });
        }

        infraDashboardView.addInfoBox({
            title: 'Storage Nodes',
            dataSourceObj: 'storageNodeDS',
            template: 'storageNode-dashboard-tab',
            viewModel: viewModel,
            tabId: 'storageNode'
        });

    }());
}

