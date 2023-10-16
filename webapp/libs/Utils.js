sap.ui.define([
    "sap/ui/core/routing/History"

], function (History) {
    "use strict";


    return {
        /* Nav to input Route */
        onNavTo: function(oContext, routeName) {
            oContext.startLoading();
            oContext.getRouter().navTo(routeName);
            oRouter.getRoute(routeName).attachPatternMatched(oContext.stopLoading, this);
        },

        /* Nav to the back page */
        onNavBack: function (oContext) {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = oContext.getOwnerComponent().getRouter();
                oRouter.navTo("toDashboard", {}, true);
            }
        },

        /* Start loading page */
        startLoading: function () {
            sap.ui.core.BusyIndicator.show(0);
        },


        /* Stop loading page */
        stopLoading: function (routeName) {
            sap.ui.core.BusyIndicator.hide();
        }

    };

});
