sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"de/sapui5buch/demo/model/formatter",
	"sap/ui/core/Fragment"
], function(Controller, History, formatter, Fragment) {
	"use strict";

	return Controller.extend("de.sapui5buch.demo.controller.BaseController", {
		
		formatter: formatter,
		onInit: function(){
			this._mViewSettingsDialogs = {}
		},
		onNavBack: function () {
			//console.log("base controller onNavBack");
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("home", {}, true /*no history*/);
			}
		},

		/**
             * Convenience method for getting the view model by name in every controller of the application.
             * @public
             * @param {string} sName the model name
             * @returns {sap.ui.model.Model} the model instance
             */
		getModel: function(sName){
			return this.getView().getModel(sName);
		},

		/**
             * Convenience method for setting the view model in every controller of the application.
             * @public
             * @param {sap.ui.model.Model} oModel the model instance
             * @param {string} sName the model name
             * @returns {sap.ui.mvc.View} the view instance
             */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
             * Convenience method for getting the resource bundle.
             * @public
             * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
             */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
             * Method for navigation to specific view
             * @public
             * @param {string} psTarget Parameter containing the string for the target navigation
             * @param {Object.<string, string>} pmParameters? Parameters for navigation
             * @param {boolean} pbReplace? Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
             */
		navTo: function (psTarget, pmParameters, pbReplace) {
			this.getRouter().navTo(psTarget, pmParameters, pbReplace);
		},

		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		setIconTabProperties: function({view, tabId, count=0}){
			var oTab = view.byId(tabId);
			oTab.setProperty("count", count);
		},
		loadFragment: function (sFragmentName) {

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

	});

});