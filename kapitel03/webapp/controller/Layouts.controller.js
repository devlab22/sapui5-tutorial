sap.ui.define([
    'de/sapui5buch/demo/controller/BaseController',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'

], function (BaseController, Fragment, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend('de.sapui5buch.demo.controller.Layouts',
        {

            onInit: function () {

                var oContent = this.byId("PartnerDetailsTab")
                if (oContent) {
                    oContent.setProperty("visible", false)
                }

            },
            handleSuggest: function (oEvent) {

                var sValue = oEvent.getParameter("suggestValue")
                var oModel = this.getModel("personal")
                var data = oModel.getData()
                console.log(oModel)
                var index = data['data'].map(function (e) { return e.BusinessPartnerID; }).indexOf(sValue);

                if (index >= 0) {
                    var sPath = "personal>/data/" + index
                    this._updateUI(sPath)
                }

            },
            onOpenDialog: function () {

                var oView = this.getView()
                var oInput = this.byId("idLayoutInput")
                

                if (!this.byId("myDialog")) {
                    Fragment.load({
                        id: oView.getId(),
                        name: "de.sapui5buch.demo.view.Dialog",
                        type: "XML",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog)
                        oDialog.open()
                    })
                }
                else {
                    this.byId("myDialog").open()
                }
            },

            onCloseDialog: function () {
                this.byId("myDialog").close()
            },

            onValueHelpRequest: function (oEvent) {
                var sInputValue = oEvent.getSource().getValue();
                this._sInputId = oEvent.getSource().getId();

                if (!this._oValueHelpDialog) {
                    this._oValueHelpDialog = sap.ui.xmlfragment(
                        "de.sapui5buch.demo.view.SelectBusinessPartner",
                        this
                    )
                    this.getView().addDependent(this._oValueHelpDialog)
                }

                if (sInputValue) {
                    this._oValueHelpDialog.getBinding("items").filter([
                        new Filter("BussinessPartnerID", FilterOperator.Contains, sInputValue)
                    ])
                }

                this._oValueHelpDialog.open(sInputValue);
            },

            onSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value")
                var oFilter = new Filter(
                    "BussinessPartnerID",
                    FilterOperator.Contains, sValue
                )
                oEvent.getSource().getBinding("items").filter([oFilter])
            },

            onConfirm: function (oEvent) {

                var oSelectedItem = oEvent.getParameter("selectedItem");
                var sPath = oSelectedItem.getBindingContext("personal")
                sPath = "personal>" + sPath

                if (sPath) {
                    this._updateUI(sPath);
                }
            },
            _updateUI: function (sBindingPath) {


                var oContent = this.byId("PartnerDetailsTab")
                oContent.bindElement(sBindingPath)
                oContent.setProperty("visible", true)


                var oHeaderContent = this.byId("headerContent")
                //oHeaderContent.bindElement(sBindingPath)
                oHeaderContent.setProperty("visible", true)

                var oAddressContent = this.byId("addressContent")
                //oAddressContent.bindElement(sBindingPath)
                oAddressContent.setProperty("visible", true)

                var oOrdersTable = this.byId("ordersTable")
                var count = oOrdersTable.getItems("personal").length
                var oOrdersTab = this.byId("ordersTab")
                oOrdersTab.setProperty("count", count)


            },

        });
});