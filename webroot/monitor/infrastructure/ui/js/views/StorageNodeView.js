/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var StorageNodeView = ContrailView.extend({
        el: $(contentContainer),

        render: function() {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                storageNodeName = viewConfig.storageNode;

            self.renderStorageNodeTabs(storageNodeName);
        },

        renderStorageNodeTabs: function(storageNodeName) {
            var self = this,
                tabConfig = swvc.getTabsViewConfig(swc.TAB_ELEMENT_STORAGENODE, {storageNode: storageNodeName});

            self.renderView4Config(self.$el, null, tabConfig, null, null, null);
        }

    });
    return StorageNodeView;
});