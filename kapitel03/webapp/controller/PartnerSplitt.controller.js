sap.ui.define([
    'de/sapui5buch/demo/controller/BaseController',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], function (BaseController, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend('de.sapui5buch.demo.controller.PartnerSplitt',
        {

            onSuggest: function (oEvent) {

                var sValue = oEvent.getParameter("suggestValue")
                var aFilters = []
                if (sValue) {
                    aFilters.push(new Filter("BusinessPartnerID", FilterOperator.StartsWith, sValue))
                }

                oEvent.getSource().getBinding("suggestionItems").filter(aFilters);

            },
            onSuggestionItemSelected: function (oEvent) {

                var oSelectedItem = oEvent.getParameter("selectedItem")
                var sBindingPath = oSelectedItem.getBindingContext("personal").getPath()
                this._updateUI("personal>" + sBindingPath)
            },
            _updateUI: function (sBindingPath) {

                this.byId("masterDetailBase").setLayout("TwoColumnsMidExpanded");

                var oContent = this.byId("BusinessPartnerDetails")
                oContent.bindElement(sBindingPath)
                oContent.setProperty("visible", true)

                var oHeaderContent = this.byId("headerContent")
               // oHeaderContent.bindElement(sBindingPath)
                oHeaderContent.setProperty("visible", true)

                var oAddressContent = this.byId("addressContent")
               // oAddressContent.bindElement(sBindingPath)
                oAddressContent.setProperty("visible", true)

                var oOrdersTable = this.byId("ordersTable")
                var count = oOrdersTable.getItems("personal").length
                var oOrdersTab = this.byId("ordersTab")
                oOrdersTab.setProperty("count", count)


            },
            onValueHelpRequest: function (oEvent) {
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
            onConfirm: function (oEvent) {

                var oSelectedItem = oEvent.getParameter("selectedItem")
                var oBindingContext = oSelectedItem.getBindingContext('personal')
                var sPath = oBindingContext.getPath()
                this._updateUI("personal>" + sPath)
            },
            onSearch: function (oEvent) {

                var sValue = oEvent.getParameter('value')
                var aFilters = []
                if (sValue) {
                    aFilters.push(new Filter("BusinessPartnerID", FilterOperator.StartsWith, sValue))
                }
                oEvent.getSource().getBinding("items").filter(aFilters);

            },
            onListItemSelected: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("listItem");
                var sBindingPath = oSelectedItem.getBindingContext("personal").getPath();
                this._updateUI("personal>" + sBindingPath);
            },
            onCloseDetail: function () {
                this.byId("idInputField").setValue();
                this.byId("businessPartnerTable").removeSelections(true);
                this.byId("masterDetailBase").setLayout("OneColumn");
            },
            onRefreshPartnerTable: function (oEvent) {

                //console.log(oEvent)
                var oPull = this.byId("pullToRefreshPartners").hide()
            }


        });
});