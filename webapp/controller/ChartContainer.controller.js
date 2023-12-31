sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../libs/Utils",
    "sap/base/strings/formatMessage"

], function (Controller, Utils, formatMessage) {
    "use strict";

    return Controller.extend("UI5IceCreamMachine.controller.ChartContainer", {

        onNavBack: function (oEvent) {
            Utils.onNavBack(this);
        },

        formatMessage: formatMessage,
    });
});