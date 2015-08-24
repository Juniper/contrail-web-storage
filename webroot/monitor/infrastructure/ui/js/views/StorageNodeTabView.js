/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-view-model'
], function (_, ContrailView, ContrailViewModel) {
    var StorageNodeTabView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this, viewConfig = this.attributes.viewConfig,
                modelMap = contrail.handleIfNull(this.modelMap, {});

            self.renderView4Config(self.$el, null, swvc.getStorageNodeTabViewConfig(viewConfig), null, null, modelMap);
        }
    });

    return StorageNodeTabView;
});
