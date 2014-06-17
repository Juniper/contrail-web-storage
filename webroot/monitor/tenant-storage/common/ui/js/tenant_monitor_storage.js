/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */

function tenantStorageMonitorClass () {
    var self = this,
        currPage;

    this.destroy = function () {
        var kGrid = $('.k-grid').data('kendoGrid');
        if(kGrid != null)
            kGrid.destroy();
        if(this.timerId){
            clearInterval(this.timerId);
        }
    }

    this.setCurrPage = function(page){
        currPage = page;
    }

    this.getCurrPage = function(){
        return currPage;
    }

    this.loadViewFromNode = function (hashObj){
        if (hashObj['node'].indexOf('Monitor:') == 0) {
            oneMntrView.load({name:hashObj['node'].split(':')[1], ip:hashObj['ip'],tab:hashObj['tab']});
        } else if (hashObj['node'].indexOf('Disks:') == 0) {
            oneOSDView.load({name:hashObj['node'].split(':')[1], ip:hashObj['ip'], uuid:hashObj['uuid'], tab:hashObj['tab'], filters:hashObj['filters']});
        } else if (hashObj['node'].indexOf('Placement Groups:') == 0) {
            onePgView.load({name:hashObj['node'].split(':')[1], ip:hashObj['ip'], uuid:hashObj['uuid'], tab:hashObj['tab']});
        } else {
            this.setCurrPage(hashObj['node']);
            if(hashObj['node'] == 'Monitor'){
                storInfraMonView.load();
            }
            else if(hashObj['node'] == 'Disks')
                storInfraOSDsView.load();
            else if(hashObj['node'] == 'Placement Groups')
                storInfraPgView.load();
            else
                tenantStorageMonitorView.load();
        }
    }

    this.load = function (){
        self.updateViewByHash(layoutHandler.getURLHashParams());
    }

    this.updateViewByHash = function(obj) {
        var hashParams = ifNullOrEmptyObject(obj,{node:'Dashboard'});
        
        if(hashParams['node'] != 'Dashboard') {
            var infraDashTemplate = Handlebars.compile($("#tenant-page-template").html());
            $(contentContainer).html('');
            $(contentContainer).html(infraDashTemplate);
            tenantStorageMonitorView.loadViewFromNode(hashParams);

        } else {    //Load Dashboard
            var infraDashboardTemplate = Handlebars.compile($('#storage-dashboard').html());
            $(contentContainer).html('');
            $(contentContainer).html(infraDashboardTemplate);
            self.setCurrPage('Dashboard');
            tenantStorageDashboardView.updateClusterDashboard(hashParams);
        }
    }

}

var tenantStorageMonitorView = new tenantStorageMonitorClass();

