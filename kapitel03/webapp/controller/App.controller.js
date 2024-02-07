sap.ui.define([
    'de/sapui5buch/demo/controller/BaseController',
    'de/sapui5buch/demo/model/models',
    'sap/m/MessageBox',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
  
], function (BaseController, models, MessageBox, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend('de.sapui5buch.demo.controller.App',
        {

            onInit: function () {
                var oData = models.createDataModel();
                this.setModel(oData, 'person');
            },

            onPress: function(oEvent){
                
                
            },
            onHello: function(oEvent){

                var sValue = this.byId("idInputField").getValue()

                MessageBox.show(
                    "Hallo " + sValue, {
                      icon: MessageBox.Icon.INFORMATION,
                      title: "Hallo Nachricht",
                      }
                  );
                
            },
            onSuggest: function(oEvent){

                var sValue = oEvent.getParameter("suggestValue")
                var aFilters = []
                if(sValue){
                    aFilters.push(new Filter("BusinessPartnerID", FilterOperator.StartsWith, sValue))
                }

                var oSource = oEvent.getSource()
                var oBinding = oSource.getBinding("suggestionItems")
                //oEvent.getSource().getBinding("suggestionItems").filter(aFilters)
                console.log(oBinding)
            },
            onSuggestionItemSelected: function(oEvent){
                console.log(oEvent)
            },
            onSelectionChange: function(oEvent){

                var oSelectedItem = oEvent.getParameter("listItem");
                var oBindingContext = oSelectedItem.getBindingContext("person");
                var sPath = oBindingContext.getPath()
                var oForm = this.byId("addressForm")
                var sBinding = "person>" + sPath + "/Adresse"
                oForm.bindElement(sBinding)
            }

        });
});