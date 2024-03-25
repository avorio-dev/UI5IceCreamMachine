sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../libs/Settings",
	"../libs/Utils"
], function (Controller, Settings, Utils) {
	"use strict";

	// Maximum progress value for the loading bar
	let _maxProgress = 100;
	// Interval for updating the loading bar
	let _updateInterval = 15;

	/*
		Hides the loading bar component.
	    
		Parameters:
			oContext {object}: The context object containing the view where the loading bar is located.
	*/
	function _hideLoadingBar(oContext) {
		Utils.setComponentVisibility(oContext, ["loadingBar"], false);
	}

	/*
		Shows the loading bar component and initializes it.
	    
		Parameters:
			oContext {object}: The context object containing the view where the loading bar is located.
	*/
	function _showLoadingBar(oContext) {
		Utils.setComponentVisibility(oContext, ["loadingBar"], true);
		let oLoadingBar = oContext.getView().byId("loadingBar");
		oLoadingBar.setPercentValue(0);
		oLoadingBar.setDisplayValue("0%");
	}

	/*
		Shows additional components once the loading bar reaches 100%.
	    
		Parameters:
			oContext {object}: The context object containing the view where the loading bar is located.
	*/
	function _showComponent(oContext) {
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
		Fills the loading bar gradually until it reaches the maximum progress value.
	    
		Parameters:
			oContext {object}: The context object containing the view where the loading bar is located.
	*/
	function _fillLoadingBar(oContext) {
		let oLoadingBar = oContext.getView().byId("loadingBar"),
			currentValue = oLoadingBar.getPercentValue();

		if (currentValue < _maxProgress) {
			currentValue += 1;
			oLoadingBar.setPercentValue(+currentValue);
			oLoadingBar.setDisplayValue(currentValue + "%");
			setTimeout(_fillLoadingBar, _updateInterval, oContext);

		} else {
			setTimeout(_hideLoadingBar, 200, oContext);
			setTimeout(_showComponent, 200, oContext);

		}
	}

	/*
		Loads components and initializes the view.
	*/
	function _loadComponents(oContext) {
		oContext.getView().addStyleClass(oContext.getOwnerComponent().getContentDensityClass());

		_hideLoadingBar(oContext);
		Utils.setComponentVisibility(oContext, ["dashboardBtn"], false);

		setTimeout(_showLoadingBar, 1000, oContext);
		setTimeout(_fillLoadingBar, 1500, oContext);
	}

	/*
		Function to be executed during view initialization, responsible for loading components.
	*/
	function loadComponents() {
		_loadComponents(this);
	}

	/*
		Handles click event of the dashboard button.
	*/
	function onDashboardBtn() {
		let sNavTo = "toDashboard";
		Utils.onNavTo(this, sNavTo);
	}

	/*
		Handles the change event for setting the theme.
	    
		Parameters:
			oEvent {object}: The event object.
	*/
	function onSetTheme(oEvent) {
		Settings.setTheme(oEvent);
	}

	/*
		Handles the click event for displaying version information.
	    
		Parameters:
			oEvent {object}: The event object.
	*/
	function onVersionInfo(oEvent) {
		Settings.onVersionInfo(oEvent);
	}

	return Controller.extend("UI5IceCreamMachine.controller.App", {

		onInit: loadComponents,
		onDashboardBtn: onDashboardBtn,
		onSetTheme: onSetTheme,
		onVersionInfo: onVersionInfo

	});
});
