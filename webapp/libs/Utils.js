sap.ui.define([
    "sap/ui/core/routing/History"

], function (History) {
    "use strict";

    /*
    Shows or hides the busy indicator.
    
    Parameters:
        showIndicator {boolean}: If true, shows the busy indicator, otherwise hides it.
*/
    function _showBusyIndicator(showIndicator) {
        if (showIndicator) {
            sap.ui.core.BusyIndicator.show(0);
        } else {
            sap.ui.core.BusyIndicator.hide();
        }
    }

    /*
        Hides specified components based on their IDs.
        
        Parameters:
            oContext {object}: The context object containing the view where the components are located.
            idToHide {array<string>}: An array containing the IDs of the components to hide.
    */
    function _hideComponent(oContext, idToHide) {
        idToHide.forEach(id => {
            let oComponent = oContext.getView().byId(id);
            if (oComponent) {
                oComponent.setVisible(false);
            }
        });
    }

    /*
        Shows specified components based on their IDs.
        
        Parameters:
            oContext {object}: The context object containing the view where the components are located.
            idToShow {array<string>}: An array containing the IDs of the components to show.
    */
    function _showComponent(oContext, idToShow) {
        idToShow.forEach(id => {
            let oComponent = oContext.getView().byId(id);
            if (oComponent) {
                oComponent.setVisible(true);
            }
        });
    }

    /*
        Handles navigation to a specific route.
        
        Parameters:
            oContext {object}: The context object containing the application.
            routeName {string}: The name of the route to navigate to.
    */
    function onNavTo(oContext, routeName) {
        _showBusyIndicator(true);

        let oRouter = oContext.getOwnerComponent().getRouter();
        oRouter.navTo(routeName);

        oRouter.getRoute(routeName).attachPatternMatched(function () {
            _showBusyIndicator(false);
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
            showBusyIndicator {boolean}: If true, shows the busy indicator, otherwise hides it.
    */
    function showBusyIndicator(showBusyIndicator) {
        _showBusyIndicator(showBusyIndicator);
    }

    /*
        Hides specified components based on their IDs.
        
        Parameters:
            oContext {object}: The context object containing the view where the components are located.
            idToHide {array<string>}: An array containing the IDs of the components to hide.
    */
    function hideComponent(oContext, idToHide) {
        _hideComponent(oContext, idToHide);
    }

    /*
        Shows specified components based on their IDs.
        
        Parameters:
            oContext {object}: The context object containing the view where the components are located.
            idToShow {array<string>}: An array containing the IDs of the components to show.
    */
    function showComponent(oContext, idToShow) {
        _showComponent(oContext, idToShow);
    }

    return {
        onNavTo: onNavTo,
        onNavBack: onNavBack,
        showBusyIndicator: showBusyIndicator,
        hideComponent: hideComponent,
        showComponent: showComponent
    };

});
