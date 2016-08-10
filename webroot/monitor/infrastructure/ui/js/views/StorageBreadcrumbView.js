/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var BreadcrumbView = ContrailView.extend({

        renderDomainBreadcrumbDropdown: function (fqName, initCB, changeCB) {}

    });

    function populateDomainBreadcrumbDropdown(contrailListModel, fqName, initCB, changeCB) {
        var dropdownData = contrailListModel.getItems();

        if (dropdownData.length > 0) {

        } else {
            //TODO - Empty message - that.$el.html(ctwm.NO_PROJECT_FOUND);
        }

    };

    function constructBreadcrumbDropdownDOM(breadcrumbDropdownId) {
        var breadcrumbElement = $('#breadcrumb'); //TODO - move to constants

        destroyBreadcrumbDropdownDOM(breadcrumbDropdownId);

        breadcrumbElement.children('li').removeClass('active');
        breadcrumbElement.children('li:last').append('<span class="divider"><i class="fa fa-angle-right"></i></span>');
        breadcrumbElement.append('<li class="active ' + breadcrumbDropdownId + '"><div id="' + breadcrumbDropdownId + '"></div></li>');

        return $('#' + breadcrumbDropdownId);
    };

    function destroyBreadcrumbDropdownDOM(breadcrumbDropdownId) {
        if (contrail.checkIfExist($('#' + breadcrumbDropdownId).data('contrailDropdown'))) {
            $('#' + breadcrumbDropdownId).data('contrailDropdown').destroy();
            if ($('li.' + breadcrumbDropdownId).hasClass('active')) {
                $('li.' + breadcrumbDropdownId).prev().addClass('active')
            }
            $('li.' + breadcrumbDropdownId).prev().find('.divider').remove();
            $('li.' + breadcrumbDropdownId).remove();
        }
    };

    return BreadcrumbView;
});