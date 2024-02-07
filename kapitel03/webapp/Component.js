sap.ui.define([
    "sap/ui/core/UIComponent",
    'de/sapui5buch/demo/controller/BaseController',
    "sap/ui/Device"
], function (UIComponent, BaseController, Device) {
    "use strict";
    return UIComponent.extend("de.sapui5buch.demo.Component",
        {
            metadata: {
                manifest: "json"
            },
            init: function () {
                UIComponent.prototype.init.apply(this, arguments);
                //this.getRouter().initialize();
            },
            getContentDensityClass: function(){

                if (this._sContentDensityClass === undefined) {
                    // check whether FLP has already set the content density class; do nothing in this case
                    // eslint-disable-next-line sap-no-proprietary-browser-api
                    if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
                        this._sContentDensityClass = "";
                    } else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
                        this._sContentDensityClass = "sapUiSizeCompact";
                    } else {
                        // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
                        this._sContentDensityClass = "sapUiSizeCozy";
                    }
                }
                return this._sContentDensityClass;
            }
    
        });
});
