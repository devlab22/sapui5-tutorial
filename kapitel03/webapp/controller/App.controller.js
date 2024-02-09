sap.ui.define([
    'de/sapui5buch/demo/controller/BaseController',
    'de/sapui5buch/demo/model/models',
    'sap/m/MessageBox',
    'sap/ui/core/Fragment'
], function (BaseController, models, MessageBox, Fragment) {
    'use strict';
    return BaseController.extend('de.sapui5buch.demo.controller.App',
        {

            onInit: function () {
                var oData = models.createDataModel();
                this.setModel(oData, 'person');

            },
            onHello: function (oEvent) {

                var sFirstname = this.byId("firstName").getValue()
                var sLastname = this.byId("lastName").getValue()
                var sValue = `${sFirstname} ${sLastname}`

                MessageBox.show(
                    "Hallo " + sValue, {
                    icon: MessageBox.Icon.INFORMATION,
                    title: "Hallo Nachricht",
                }
                );

            },
            onSelectionChange: function (oEvent) {

                var oSelectedItem = oEvent.getParameter("listItem");
                var oBindingContext = oSelectedItem.getBindingContext("person");
                var sPath = oBindingContext.getPath()
                var oForm = this.byId("addressForm")
                var sBinding = "person>" + sPath + "/Adresse"
                oForm.bindElement(sBinding)
            },
            onOpenDialog: function (oEvent) {

                if (!this.byId("myDialog")) {
                    Fragment.load({
                        id: this.getView().getId(),
                        name: "de.sapui5buch.demo.view.PersonDialog",
                        type: "XML",
                        controller: this
                    }).then(function (oDialog) {
                        oView = this.getView();
                        oView.addDependent(oDialog);
                        oDialog.open();
                    }).catch(function (error) {
                        console.log(error.message)
                    });
                } else {
                    this.byId("myDialog").open();
                }
            },
            onCloseDialog: function (oEvent) {
                this.byId("myDialog").close();
            }

        });
});