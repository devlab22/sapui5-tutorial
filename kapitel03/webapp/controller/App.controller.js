sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'de/sapui5buch/demo/model/models'
], function (Controller, models) {
    'use strict';
    return Controller.extend('de.sapui5buch.demo.controller.App',
        {

            onInit: function () {
                var oData = models.createDataModel();
                this.getView().setModel(oData, 'person');
            }

        });
});