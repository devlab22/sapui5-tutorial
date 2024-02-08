sap.ui.define([
    'de/sapui5buch/demo/controller/BaseController',
    'de/sapui5buch/demo/model/models',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
  
], function (BaseController, models, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend('de.sapui5buch.demo.controller.Personal',
        {

            onInit: function(){
                var oData = models.createPersonalModel();
                this.setModel(oData, 'personal');
    
            },
            onSuggest: function(oEvent){

                var sValue = oEvent.getParameter("suggestValue")
                var aFilters = []
                if(sValue){
                    aFilters.push(new Filter("BusinessPartnerID", FilterOperator.StartsWith, sValue))
                }

                var oSource = oEvent.getSource()
                var oBinding = oSource.getBinding("suggestionItems")
                oBinding.filter(aFilters)
                
            },
            onSuggestionItemSelected: function(oEvent){
                console.log(oEvent)
            },

        });
});