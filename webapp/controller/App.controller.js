sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../libs/Settings",
    "../libs/Utils"
], function (Controller, Settings, Utils) {
    "use strict";

    // --> PRIVATE SECTION
    // --------------------------------------------------

    let _maxProgress = 100; // Maximum progress value for the loading bar
    let _updateInterval = 15; // Interval for updating the loading bar

    /*
        A utility function to wait for a specified amount of time.
        
        Parameters:
            ms {number}: The number of milliseconds to wait.
        
        Returns:
            {Promise}: A promise that resolves after the specified time.
    */
    function _wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /*
        Loads components and initializes the view.
    */
    function _loadComponents() {
        let oContext = this;
        oContext.getView().addStyleClass(oContext.getOwnerComponent().getContentDensityClass());

        // Hide loading bar and dashboard button initially
        Utils.setComponentVisibility(oContext, ["loadingBar", "dashboardBtn"], false);

        // Asynchronous function to handle loading sequence
        (async function () {
            await _wait(1000); // Wait for 1 second
            await _showLoadingBar(oContext);

            await _wait(500); // Wait for 0.5 second
            await _fillLoadingBar(oContext);

            await _wait(500); // Wait for 0.5 second
            await _hideLoadingBar(oContext);
            await _showComponent(oContext);

        })();
    }

    /*
        Hides the loading bar component.
    */
    async function _hideLoadingBar(oContext) {
        let loadingBarId = "loadingBar";
        Utils.setComponentVisibility(oContext, [loadingBarId], false);
    }

    /*
        Shows the loading bar component and initializes it.
    */
    async function _showLoadingBar(oContext) {
        let loadingBarId = "loadingBar",
            oLoadingBar = oContext.getView().byId(loadingBarId);

        Utils.setComponentVisibility(oContext, [loadingBarId], true);
        oLoadingBar.setPercentValue(0);
        oLoadingBar.setDisplayValue("0%");
    }

    /*
        Fills the loading bar gradually until it reaches the maximum progress value.
    */
    async function _fillLoadingBar(oContext) {
        let oLoadingBar = oContext.getView().byId("loadingBar"),
            currentValue = oLoadingBar.getPercentValue();

        while (currentValue < _maxProgress) {
            currentValue += 1;
            oLoadingBar.setPercentValue(+currentValue);
            oLoadingBar.setDisplayValue(currentValue + "%");

            await _wait(_updateInterval); // Wait for the update interval
        }
    }

    /*
        Shows additional components once the loading bar reaches 100%.
    */
    async function _showComponent(oContext) {
        let oLoadingBar = oContext.getView().byId("loadingBar");

        if (oLoadingBar.getPercentValue() === 100) {
            Utils.setComponentVisibility(oContext, ["dashboardBtn"], true);

            let sFragmentPath = oContext.getOwnerComponent().getModel("namespace").getProperty("/path_fragment") + ".Settings";
            if (!oContext.pFragment) {
                oContext.pFragment = oContext.loadFragment({
                    name: sFragmentPath
                });
            }

            oContext.pFragment.then(function (oFragment) {
                let oToolbar = oContext.getView().byId("toolbar");
                oToolbar.addContent(oFragment);
            }.bind(oContext));
        }
    }

    /*
        Handles the change event for setting the theme.
        
        Parameters:
            oEvent {object}: The event object.
    */
    function _onSetTheme(oEvent) {
        Settings.setTheme(oEvent);
    }

    /*
        Handles the click event for displaying version information.
        
        Parameters:
            oEvent {object}: The event object.
    */
    function _onVersionInfo(oEvent) {
        Settings.onVersionInfo(oEvent);
    }

    /*
        Handles the click event for the dashboard button.
    */
    function _onDashboardBtn() {
        let sNavTo = "toDashboard";
        Utils.onNavTo(this, sNavTo);
    }

    // --> PUBLIC SECTION
    // --------------------------------------------------

    return Controller.extend("UI5IceCreamMachine.controller.App", {
        onInit: _loadComponents,
        onSetTheme: _onSetTheme,
        onVersionInfo: _onVersionInfo,
        onDashboardBtn: _onDashboardBtn
    });
});
