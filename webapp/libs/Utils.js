sap.ui.define([
    "sap/ui/core/routing/History"

], function (History) {
    "use strict";

    // --> PRIVATE SECTION
    // --------------------------------------------------

    /*
        Shows or hides the busy indicator.
        
        Parameters:
            visible {boolean}: If true, shows the busy indicator, otherwise hides it.
    */
    function _setBusyIndicatorVisibility(visible) {
        if (visible) {
            sap.ui.core.BusyIndicator.show(0);
        } else {
            sap.ui.core.BusyIndicator.hide();
        }
    }

    /*
        Show or Hides specified components based on their IDs.
        
        Parameters:
            oContext {object}: The context object containing the view where the components are located.
            idToHide {array<string>}: An array containing the IDs of the components to set visibility.
            visible {boolean}: If true, shows the components, otherwise hides them.
    */
    function _setComponentVisibility(oContext, idToSet, visible) {
        idToSet.forEach(id => {
            let oComponent = oContext.getView().byId(id);
            if (oComponent) {
                if (visible) {
                    oComponent.setVisible(true);
                } else {
                    oComponent.setVisible(false);
                }
            }
        });
    }


    // --> PUBLIC SECTION
    // --------------------------------------------------

    /*
        Handles navigation to a specific route.
        
        Parameters:
            oContext {object}: The context object containing the application.
            routeName {string}: The name of the route to navigate to.
    */
    function onNavTo(oContext, routeName) {
        _setBusyIndicatorVisibility(true);

        let oRouter = oContext.getOwnerComponent().getRouter();
        oRouter.navTo(routeName);

        oRouter.getRoute(routeName).attachPatternMatched(function () {
            _setBusyIndicatorVisibility(false);
        });
    }

    /*
        Handles navigating back.
        
        Parameters:
            oContext {object}: The context object containing the application.
            defaultPage {string}: The default page to navigate to if there is no previous page.
    */
    function onNavBack(oContext, defaultPage) {
        let oHistory = History.getInstance();
        let sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        } else {
            let oRouter = oContext.getOwnerComponent().getRouter();
            oRouter.navTo(defaultPage, {}, true);
        }
    }

    /*
        Shows or hides the busy indicator.
        
        Parameters:
            visible {boolean}: If true, shows the busy indicator, otherwise hides it.
    */
    function setBusyIndicatorVisibility(visible) {
        _setBusyIndicatorVisibility(visible);
    }

    /*
        Shows or Hides specified components based on their IDs.
        
        Parameters:
            oContext {object}: The context object containing the view where the components are located.
            idToHide {array<string>}: An array containing the IDs of the components to show or hide.
            visible {boolean}: If true, shows the components, otherwise hides them
    */
    function setComponentVisibility(oContext, idToHide, visible) {
        _setComponentVisibility(oContext, idToHide, visible);
    }


    // --> EVENTS
    // --------------------------------------------------

    return {
        onNavTo: onNavTo,
        onNavBack: onNavBack,
        setBusyIndicatorVisibility: setBusyIndicatorVisibility,
        setComponentVisibility: setComponentVisibility,
    };

});
