sap.ui.define([
    "sap/ui/core/routing/History",
    "sap/ui/core/format/NumberFormat",

], function (History, NumberFormat) {
    "use strict";

    // --> PRIVATE SECTION
    // --------------------------------------------------

    /*
        Handles navigation to a specific route.
        
        Parameters:
            oContext {object}: The context object containing the application.
            routeName {string}: The name of the route to navigate to.
    */
    function _onNavTo(oContext, routeName) {
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
    function _onNavBack(oContext, defaultPage) {
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

    /*
        Formats a number with specified decimals using a short style.
        
        Parameters:
            value {number}: The number to be formatted.
            decimals {number}: The number of decimals to display.
        
        Returns:
            {string}: The formatted number.
    */
    function _formatNumber(value, decimals) {
        let oFloatFormatter = NumberFormat.getFloatInstance({
            style: "short",
            decimals: decimals
        });
        return oFloatFormatter.format(value);
    }

    /*
        Formats a date object to a localized date string.
        
        Parameters:
            date {Date|string}: The date object or string representation of the date.
        
        Returns:
            {string}: The formatted date string.
    */
    function _formatDate(date) {
        let oDate = new Date(Date.parse(date));
        return oDate.toLocaleDateString();
    }


    // --> PUBLIC SECTION
    // --------------------------------------------------

    return {

        // --> Public Interface
        // --------------------------------------------------

        onNavTo: _onNavTo,
        onNavBack: _onNavBack,
        setBusyIndicatorVisibility: _setBusyIndicatorVisibility,
        setComponentVisibility: _setComponentVisibility,
        formatNumber: _formatNumber,
        formatDate: _formatDate
        
    };

});
