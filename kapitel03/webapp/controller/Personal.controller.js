sap.ui.define([
    'de/sapui5buch/demo/controller/BaseController',
    'de/sapui5buch/demo/model/models',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/core/Fragment'
  
], function (BaseController, models, Filter, FilterOperator, Fragment) {
    'use strict';
    return BaseController.extend('de.sapui5buch.demo.controller.Personal',
        {

            
            onSuggest: function(oEvent){

                var sValue = oEvent.getParameter("suggestValue")
                var aFilters = []
                if(sValue){
                    aFilters.push(new Filter("BusinessPartnerID", FilterOperator.StartsWith, sValue))
                }

                oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
                
            },
            onSuggestionItemSelected: function(oEvent){

                var oSelectedItem = oEvent.getParameter("selectedItem")
                var sBindingPath = oSelectedItem.getBindingContext("personal").getPath()
                this._updateUI("personal>" + sBindingPath)
            },
            _updateUI: function(sBindingPath){

                var oHeaderContent = this.byId("headerContent")
                oHeaderContent.bindElement(sBindingPath)

                var oObjLayout = this.byId("ObjectPageLayout");
                oObjLayout.setShowHeaderContent(true);
                oObjLayout.setToggleHeaderOnTitleClick(true);

                var oAddressSection = this.byId("addressSection")
                oAddressSection.bindElement(sBindingPath)
                oAddressSection.setProperty("visible", true)

                var oAddressSection2 = this.byId("addressSection2")
                oAddressSection2.bindElement(sBindingPath)
                oAddressSection2.setProperty("visible", true)
            },
            onPlus: function(oEvent){
                
                var oCnt = this.byId("cntLbl")
                var value = Number(oCnt.getProperty("text"))
                value++
                oCnt.setProperty("text", value)
            },
            onMinus: function(oEvent){

                var oCnt = this.byId("cntLbl")
                var value = Number(oCnt.getProperty("text"))
                value--
                oCnt.setProperty("text", value)
            },
            onValueHelpRequest : function(oEvent) {
                var sInputValue = oEvent.getSource().getValue();
                this._sInputId = oEvent.getSource().getId();
                if (!this._oValueHelpDialog) {
                 this._oValueHelpDialog = sap.ui.xmlfragment(
                    "de.sapui5buch.demo.view.PersonDialog",
                    this);
                   
                 this.getView().addDependent(this._oValueHelpDialog);
                }
                this._oValueHelpDialog.getBinding("items").filter(
                  [new Filter("BusinessPartnerID",
                   FilterOperator.Contains, sInputValue
                )]);
                this._oValueHelpDialog.open(sInputValue);
             },
             onConfirm: function(oEvent){
                
                var oSelectedItem = oEvent.getParameter("selectedItem")
                var oBindingContext = oSelectedItem.getBindingContext('personal')
                var sPath = oBindingContext.getPath()
                this._updateUI("personal>" + sPath)
             },
             onSearch: function(oEvent){
                
                var sValue = oEvent.getParameter('value')
                var aFilters = []
                if(sValue){
                    aFilters.push(new Filter("BusinessPartnerID", FilterOperator.StartsWith, sValue))
                }
                oEvent.getSource().getBinding("items").filter(aFilters);
                
             }

        });
});