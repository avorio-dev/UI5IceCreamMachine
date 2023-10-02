sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/Component",
	"../libs/Settings"

], function (Controller, MessageBox, Component, Settings) {
	"use strict";

	// Globals
	var _maxProgress = 100,
		_updateInterval = 15;


	/* Hide Loading Bar */
	function _hideLoadingBar(oContext) {
		var oLoadingBar = oContext.getView().byId("loadingBar");
		oLoadingBar.setVisible(false);
	}

	/* Show Loading Bar */
	function _showLoadingBar(oContext) {
		var oLoadingBar = oContext.getView().byId("loadingBar");

		oLoadingBar.setVisible(true);

		oLoadingBar.setPercentValue(0);
		oLoadingBar.setDisplayValue(0 + "%");
	}

	/*
		If you want to hide some component, for example when loading bar is filling up,
		add here your component
	*/
	function _hideComponent(oContext) {
		var oDashboardButton = oContext.getView().byId("dashboardBtn");

		oDashboardButton.setVisible(false);
	}

	/*
		If you want to show some components, for example when loading bar is full,
		add here your component 
	*/
	function _showComponent(oContext) {
		var oLoadingBar = oContext.getView().byId("loadingBar");

		if (oLoadingBar.getPercentValue() === 100) {
			// set visible = true to your component here 

			var oDashboardButton = oContext.getView().byId("dashboardBtn");

			oDashboardButton.setVisible(true);

			// Load Settings Fragment 
			var sFragmentPath = oContext.getOwnerComponent().getModel("namespace").getProperty("/path_fragment") + ".Settings";
			if (!oContext.pFragment) {
				// Carica il fragment in modo asincrono
				oContext.pFragment = oContext.loadFragment({
					name: sFragmentPath
				});
			}

			oContext.pFragment.then(function (oFragment) {
				// Aggiungi il fragment al Toolbar
				var oToolbar = oContext.getView().byId("toolbar");
				oToolbar.addContent(oFragment);
			}.bind(oContext));
		}
	}

	/* 
		Start Animation of Loading Bar, 
		at the end, all components will be print on the screen
	*/
	function _fillLoadingBar(oContext) {

		var oLoadingBar = oContext.getView().byId("loadingBar"),
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

	/* Load all components of the View */
	function _loadComponents(oContext) {

		// Set content density
		this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

		// Set LOADING Bar and components visibility
		_hideLoadingBar(oContext);
		_hideComponent(oContext);
		setTimeout(_showLoadingBar, 1000, oContext);
		setTimeout(_fillLoadingBar, 1500, oContext);

	}

	/* -------------------------------------------------------------------------*/

	return Controller.extend("UI5IceCreamMachine.controller.App", {

		/* Initialize all components on first call of the page */
		onInit: function () {
			_loadComponents(this);
		},

		/* Function that will be called on Dashboard Button Press */
		onDashboardBtn: function () {
			//window.open("https://shorturl.at/tILT5", "_blank");
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("toDashboard");
		},

		onSetTheme: function (oEvent) {
			Settings.setTheme(oEvent);
		},

		onVersionInfo: function (oEvent) {
			Settings.onVersionInfo(oEvent);
		}

	});
});