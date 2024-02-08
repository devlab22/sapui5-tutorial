sap.ui.define([
    'sap/ui/model/json/JSONModel'
], function (JSONModel) {
    'use strict';
    return {
        createDataModel: function () {
            var oModel = new JSONModel('./model/data.json');
            return oModel;
        },
        createPersonalModel: function () {
            var oModel = new JSONModel('./model/personal.json');
            return oModel;
        }
    };
});