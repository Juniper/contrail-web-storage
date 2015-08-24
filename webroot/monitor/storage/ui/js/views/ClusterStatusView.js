/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var clusterStatusView = ContrailView.extend({
        render: function () {
            var self = this,
                viewConfig = self.attributes.viewConfig,
                ajaxConfig = viewConfig['ajaxConfig'],
                selector = $(self.$el);

            if (self.model === null && viewConfig['modelConfig'] !== null) {
                self.model = new ContrailListModel(viewConfig['modelConfig']);
            }

            if (self.model !== null) {
                self.model = new ContrailListModel(viewConfig['modelConfig']);
                if (self.model.loadedFromCache || !(self.model.isRequestInProgress())) {
                    var statusData = self.model.getItems();
                    self.renderStatus(selector, viewConfig, statusData);
                }

                self.model.onAllRequestsComplete.subscribe(function () {
                    var statusData = self.model.getItems();
                    self.renderStatus(selector, viewConfig, statusData);
                });

                if (viewConfig.loadChartInChunks) {
                    self.model.onDataUpdate.subscribe(function () {
                        var statusData = self.model.getItems();
                        self.renderStatus(selector, viewConfig, statusData);
                    });
                }
            }
        },

        renderStatus: function (selector, viewConfig, data) {
            var widgetConfig = contrail.checkIfExist(viewConfig.widgetConfig) ? viewConfig.widgetConfig : null,
                statusTemplate = contrail.getTemplate4Id(swc.TMPL_CLUSTER_STATUS);
                //tooltip = nvd3v181.models.tooltip();

            if (contrail.checkIfFunction(viewConfig['parseFn'])) {
                data = viewConfig['parseFn'](data);
            }

            if ($(selector).find("div") != null) {
                $(selector).empty();
            }

            var statusData = data[0];
            var clusterHealthTmplData = {
                clusterHealth: statusData['health_status'],
                clusterHealthEvents: [],
                clusterHealthDetails: []
            }

            $.each(statusData['health']['summary'], function (idx, event) {
                clusterHealthTmplData.clusterHealthEvents.push({
                    severity: swu.getHealthSevLevelLbl(event['severity']).toLowerCase(),
                    summary: event['summary']
                });
            });

            $.each(statusData['health']['details'], function (idx, event) {
                clusterHealthTmplData.clusterHealthDetails.push({
                    count: ++idx,
                    message: event
                });
            });

            $(selector).append(statusTemplate(clusterHealthTmplData));

            $("#cluster-health-status-icon").attr('class', 'icon-status ' +
                swu.getHealthIconClass(clusterHealthTmplData.clusterHealth) + ' ' +
                swu.getHealthIconColorClass(clusterHealthTmplData.clusterHealth)
            );
            $("#cluster-health-status-icon").parent().on("click", function () {
                //Handle click to popup alerts
                swu.showStorageAlertsPopup(statusData['alerts']);
            });

            /*
            commenting out mouseover popup now
             $("#cluster-health-status").parent().on("mouseover", function(e) {

             var tooltipContents = {};

             tooltipContents.series = [{
             key: 'Overall Cluster Status',
             value: healthStatus
             }];

             $.each(statusData['health']['summary'], function(idx, event) {
             tooltipContents.series.push({
             key: 'Event',
             value: '[ ' + swu.getHealthSevLevelLbl(event['severity']).toLowerCase() + ' ] ' + event['summary']
             });
             });

             var details = [];
             $.each(statusData['health']['details'], function(idx, event) {
             details.push(' [ ' + ++idx + ' ] ' + event )
             });
             if (details.length > 1) {
             details = details[0] + ' ...';
             }
             tooltipContents.series.push({
             key: 'Details',
             value: details
             });

             tooltipContents.point = {};
             tooltipContents.point = null;
             tooltip.position({top: e.pageY, left: e.pageX})();
             tooltip.data(tooltipContents).hidden(false);
             });
             $("#cluster-health-status").parent().on("mouseout", function(e) {
             tooltip.hidden(true);
             });
             */
            if (widgetConfig !== null) {
                this.renderView4Config(selector.find('.status-container'), self.model, widgetConfig, null, null, null);
            }

        }
    });

    return clusterStatusView;
});