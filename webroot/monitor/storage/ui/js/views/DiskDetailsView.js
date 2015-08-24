/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
], function (_, ContrailView) {
    var DiskDetailsView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                diskName = viewConfig.disk,
                storageNodeName = viewConfig.storageNode;

            self.renderDiskDetails(diskName, storageNodeName);
        },

        renderDiskDetails: function (diskName, storageNodeName) {
            var self = this,
                detailsConfig = swvc.getDetailsViewConfig(swc.DETAILS_ELEMENT_DISK, {disk: diskName, storageNode: storageNodeName});

            self.renderView4Config(self.$el, null, detailsConfig, null, null, null);
        }

    });
    return DiskDetailsView;
});