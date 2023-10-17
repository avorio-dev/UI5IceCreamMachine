sap.ui.define([
    "sap/ui/core/routing/History"

], function (History) {
    "use strict";

    /* Start loading page */
    function _startLoading() {
        sap.ui.core.BusyIndicator.show(0);
    }

    /* Stop loading page */
    function _stopLoading(routeName) {
        sap.ui.core.BusyIndicator.hide();
    }

    return {
        /* Nav to input Route */
        onNavTo: function (oContext, routeName) {

            // Show Busy Indicator 
            _startLoading();

            // Start navigation
            var oRouter = oContext.getOwnerComponent().getRouter();
            oRouter.navTo(routeName);

            // Hide Busy Indicator once that route has been loaded
            oRouter.getRoute(routeName).attachPatternMatched(_stopLoading, this);
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

        startLoading: function () {
            _startLoading();
        },

        stopLoading: function () {
            _stopLoading();
        }

    };

});
