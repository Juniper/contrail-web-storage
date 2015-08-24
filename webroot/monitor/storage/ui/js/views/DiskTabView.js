/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
], function (_, ContrailView) {
    var DiskTabView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this, viewConfig = this.attributes.viewConfig,
                modelMap = contrail.handleIfNull(this.modelMap, {});

            self.renderView4Config(self.$el, null, swvc.getDiskTabViewConfig(viewConfig), null, null, modelMap);
        }
    });

    return DiskTabView;
});
