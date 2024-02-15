sap.ui.define([
    'de/sapui5buch/demo/controller/BaseController',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/ui/core/Fragment"
], function (BaseController, Filter, FilterOperator, Sorter, Fragment) {
    'use strict';

    return BaseController.extend('de.sapui5buch.demo.controller.PartnerSplitt',
        {

            onInit: function () {
                this.bGrouped = true
                this.bDescending = false
                this.sSearchQuery = 0
                this._mViewSettingsDialogs = {}
                this._oFilterDialog = null
            },

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
            },
            onSortPartnerTable: function (oEvent) {

                this.bDescending = !this.bDescending;
                this.fnApplyFiltersAndOrdering();

            },
            onGroupPress: function (oEvent) {

                this._loadFragment(
                    "de.sapui5buch.demo.view.GroupSettingsDialog").then(
                        function (oDialog) {
                            oDialog.open();
                        });
            },
            fnApplyFiltersAndOrdering: function (oEvent) {
                var aFilters = [],
                    aSorters = [];


                if (this.bGrouped) {
                    aSorters.push(new Sorter("LegalForm", this.bDescending, this._fnGroup));
                } else {
                    aSorters.push(new Sorter("LegalForm", this.bDescending));
                }

                if (this.sSearchQuery) {
                    var oFilter = new Filter("CompanyName", FilterOperator.Contains, this.sSearchQuery);
                    aFilters.push(oFilter);
                }

                this.byId("businessPartnerTable").getBinding("items").filter(aFilters).sort(aSorters);
            },
            _fnGroup: function (oContext) {
                var sLegalForm = oContext.getProperty("LegalForm");

                return {
                    key: sLegalForm,
                    text: sLegalForm
                };
            },
            _loadFragment: function (sFragmentName) {

                return new Promise(function (resolve) {
                    var oDialog = this._mViewSettingsDialogs[sFragmentName];
                    if (!oDialog) {
                        Fragment.load({
                            name: sFragmentName,
                            type: "XML",
                            controller: this
                        }).then(function (oDialog) {
                            this._oFilterDialog = oDialog;
                            this.getView().addDependent(oDialog);
                            this._mViewSettingsDialogs[sFragmentName] = oDialog;
                            resolve(oDialog);
                        }.bind(this));
                    } else {
                        resolve(oDialog);
                    }
                }.bind(this));

            },
            onGroupDialogConfirm: function (oEvent) {
                var mParams = oEvent.getParameters()
                var oBinding = this.byId("businessPartnerTable").getBinding("items")
                var sPath = ''
                var aGroups = []
                var bDescending = false

                if(mParams.groupItem){
                    sPath = mParams.groupItem.getKey();
                    bDescending = mParams.groupDescending;
                    aGroups.push(new Sorter(sPath, bDescending, true));        
                    oBinding.sort(aGroups);
                }
              
            }



        });
});