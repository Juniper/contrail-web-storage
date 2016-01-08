/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
], function (_, ContrailView) {
    var DiskView = ContrailView.extend({
        el: $(contentContainer),

        render: function() {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                diskName = viewConfig.disk,
                storageNodeName = viewConfig.storageNode,
                uuid= viewConfig.uuid;
            self.renderDiskTabs({disk: diskName, storageNode: storageNodeName, uuid:uuid});
        },

        renderDiskTabs: function(elementObj) {
            var self = this,
                tabConfig = swvc.getTabsViewConfig(swc.TAB_ELEMENT_DISK, elementObj);

            self.renderView4Config(self.$el, null, tabConfig, null, null, null);
        }

    });
    return DiskView;
});