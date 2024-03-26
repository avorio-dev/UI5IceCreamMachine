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
	let _loadingCompleted = false;

	function _loadComponents() {
		let oContext = this;
		oContext.getView().addStyleClass(oContext.getOwnerComponent().getContentDensityClass());

		Utils.setComponentVisibility(oContext, ["loadingBar", "dashboardBtn"], false);

		setTimeout(_showLoadingBar, 1000, oContext);
		setTimeout(_fillLoadingBar, 1500, oContext);
		setTimeout(_hideLoadingBar, 1700, oContext);
		setTimeout(_showComponent, 1900, oContext);
	}

	function _hideLoadingBar(oContext) {
		let loadingBarId = "loadingBar";

		Utils.setComponentVisibility(oContext, [loadingBarId], false);
	}

	function _showLoadingBar(oContext) {
		let loadingBarId = "loadingBar",
			oLoadingBar = oContext.getView().byId(loadingBarId);

		Utils.setComponentVisibility(oContext, [loadingBarId], true);
		oLoadingBar.setPercentValue(0);
		oLoadingBar.setDisplayValue("0%");
	}

	function _fillLoadingBar(oContext) {
		let oLoadingBar = oContext.getView().byId("loadingBar"),
			currentValue = oLoadingBar.getPercentValue();

		_loadingCompleted = false;

		if (currentValue < _maxProgress) {
			currentValue += 1;
			oLoadingBar.setPercentValue(+currentValue);
			oLoadingBar.setDisplayValue(currentValue + "%");

			setTimeout(_fillLoadingBar, _updateInterval, oContext);
		} else {
			_loadingCompleted = true;
		}
	}

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

	function _onSetTheme(oEvent) {
		Settings.setTheme(oEvent);
	}

	function _onVersionInfo(oEvent) {
		Settings.onVersionInfo(oEvent);
	}

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
		onDashboardBtn: _onDashboardBtn,

	});
});
