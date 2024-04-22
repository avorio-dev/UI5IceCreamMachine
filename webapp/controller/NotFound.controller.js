sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../libs/Utils"

], function (Controller, Utils) {
    "use strict";
    return Controller.extend("sap.ui.demo.nav.controller.NotFound", {
        onInit: function () {

        },

        onNavBack: function (oEvent) {
            Utils.onNavBack(this);
        }

    });
});