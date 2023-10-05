sap.ui.define([
    "sap/ui/core/routing/History"

], function (History) {
    "use strict";


    return {

        onNavBack: function (oContext) {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = oContext.getOwnerComponent().getRouter();
                oRouter.navTo("toDashboard", {}, true);
            }
        }

    };

});
