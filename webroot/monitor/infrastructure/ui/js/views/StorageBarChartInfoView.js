/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
],function(_,ContrailView) {
    var BarChartInfoView = ContrailView.extend({
        el: ".chart",
        chart: null,
        chartSelection: null,
        initialize: function(options) {
            var self = this;
            self.options = options;
            self.$el.append($('<div/>',{
                class:'infobox-container'
            }));
        },
        renderInfoboxes: function() {
            var self = this;
            var infoChartCfg = getValueByJsonPath(self,'attributes;viewConfig;config',[],false);
            var totalCntModel = getValueByJsonPath(self,'attributes;viewConfig;totalCntModel',null,false);
            var data = self.model.getItems();
            var dataCF = crossfilter(data);
             var chartInfoTmpl = contrail.getTemplate4Id(cowc.TMPL_CHARTINFO);
            var chartMonInfoTmpl = contrail.getTemplate4Id(swc.TMPL_STORAGE_CHARTINFO);
            var totalCntMap = {};
            //Sum-up each field across all records
            $.each(data,function(idx,obj) {
                for(var i=0;i<infoChartCfg.length;i++) {
                    var currField = infoChartCfg[i]['field'];
                    if(idx == 0) {
                        totalCntMap[currField] = 0;
                    }
                    totalCntMap[currField] += obj[currField]
                }
            });
            for(var i=0;i<infoChartCfg.length;i++) {
                var currCfg = infoChartCfg[i];
                if (currCfg['title'] == 'Monitor'){
                    var chartCfg = {
                        title : currCfg['title'],
                        totalCnt: totalCntModel.has(currCfg['field']) ? '' : totalCntMap[currCfg['field']]
                    };
                    self.$el.find('.infobox-container').append(chartMonInfoTmpl(chartCfg));
                    var currElem = self.$el.find('.infobox-container .infobox:last');
                    if(totalCntModel.has(currCfg['monOnly'])) {
                        var monOnlyCnt = totalCntModel.get(currCfg['monOnly']);
                        if(monOnlyCnt > 0){
                            $(currElem).find('.infobox-plus').text("+");
                            $(currElem).find('.infobox-mon-number').text(totalCntModel.get(currCfg['monOnly']));
                        }else{
                           $(currElem).find('.infobox-plus').text("");
                        }
                        $(currElem).find('.infobox-stg-number').text(totalCntModel.get(currCfg['field']));
                        var downCnt = totalCntModel.get(currCfg['downCnt']);
                        if (downCnt >0 ){
                            $(currElem).find('.monstat-down').text(totalCntModel.get(currCfg['downCnt']));
                            $(currElem).find('.monstat-down').addClass("monstat");
                            $(currElem).find('.monstat-down').addClass("monstat-important");
                        }
                        totalCntModel.on('change',function(updatedModel) {
                            var monOnlyCnt = totalCntModel.get(currCfg['monOnly']);
                            if(monOnlyCnt > 0){
                               $(currElem).find('.infobox-plus').text("+");
                               $(currElem).find('.infobox-mon-number').text(totalCntModel.get(currCfg['monOnly']));
                            }else{
                                $(currElem).find('.infobox-plus').text("");
                            }
                            var downCnt = totalCntModel.get(currCfg['downCnt']);
                            if (downCnt >0 ){
                                $(currElem).find('.monstat-down').text(totalCntModel.get(currCfg['downCnt']));
                                $(currElem).find('.monstat-down').addClass("monstat");
                                $(currElem).find('.monstat-down').addClass("monstat-important");
                            }
                            $(currElem).find('.infobox-stg-number').text(totalCntModel.get(currCfg['field']));
                        })
                        $(currElem).find('.infobox-mon-number').hover(
                            function(event) {
                                $('body').find('.nvtooltip').remove();
                                var div = d3.select('body').append("div")
                                    .attr("class", "nvtooltip");
                                div.transition().duration(10);

                                var content = "Monitor only Node";

                                div.html('<span class="lbl">' + content +'</span>')
                                    .style("left", (event.pageX) + "px")
                                    .style("top", (event.pageY - 50) + "px");

                            }, function() {
                                $('body').find('.nvtooltip').remove();
                            }
                        );
                        $(currElem).find('.infobox-stg-number').hover(
                            function(event) {
                                $('body').find('.nvtooltip').remove();
                                var div = d3.select('body').append("div")
                                    .attr("class", "nvtooltip");
                                div.transition().duration(10);

                                var content = "Storage Node with Monitor";
                                div.html('<span class="lbl">' + content +'</span>')
                                    .style("left", (event.pageX) + "px")
                                    .style("top", (event.pageY - 50) + "px");

                            }, function() {
                                $('body').find('.nvtooltip').remove();
                            }
                        );

                    }
                }else{
                    var chartCfg = {
                        title : currCfg['title'],
                        totalCnt: totalCntModel.has(currCfg['field']) ? '' : totalCntMap[currCfg['field']]
                    };
                    self.$el.find('.infobox-container').append(chartInfoTmpl(chartCfg));
                    var currElem = self.$el.find('.infobox-container .infobox:last');
                    if(totalCntModel.has(currCfg['field'])) {
                        $(currElem).find('.infobox-stg-number').text(totalCntModel.get(currCfg['field']));
                        totalCntModel.on('change',function(updatedModel) {
                            $(currElem).find('.infobox-stg-number').text(updatedModel.get(currCfg['field']));
                        })
                    }
                }
                var sparkLineData = bucketizeCFData(dataCF,function(d) {
                    return d[currCfg['field']];
                });
                //Draw sparkline
                chUtils.drawSparkLineBar(currElem.find('.sparkline')[0], {
                    data: sparkLineData['data'],
                    //title: chartCfg['title'],
                    xLbl: currCfg['title'],
                    yLbl: currCfg['yLbl'],
                });
            }
        },
        render: function() {
            var self = this;
            //Need to initialize crossfilter with model
            //If model is already populated
            if(self.model.isRequestInProgress() == false) {
                self.renderInfoboxes();
            }
            self.model.onAllRequestsComplete.subscribe(function() {
                self.renderInfoboxes();
            });
        }
    });
    return BarChartInfoView;
});
