sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../libs/Utils"

], function (Controller, Utils) {
    "use strict";

    return Controller.extend("UI5IceCreamMachine.controller.Invoices", {
        onInit: function () {

        },

        onNavBack: function (oEvent) {
            Utils.onNavBack(this);
        },

        formatCurrency: function (unitPrice, currency) {
            return unitPrice + ' ' + currency;
        }

    });
});