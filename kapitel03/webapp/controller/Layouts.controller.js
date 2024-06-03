sap.ui.define([
    'de/sapui5buch/demo/controller/BaseController',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'

], function (BaseController, Fragment, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend('de.sapui5buch.demo.controller.Layouts',
        {

            onOpenDialog: function () {

                var oView = this.getView()

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

            onConfirm : function(oEvent) {

                var oSelectedItem =  oEvent.getParameter("selectedItem");
               // console.log(oSelectedItem)
                if (oSelectedItem) {
                  /* this._updateUI(
                   oSelectedItem.getBindingContext().getPath()); */
                }
             }

        });
});