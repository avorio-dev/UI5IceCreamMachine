sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel'

], function (Controller, JSONModel) {
	"use strict";

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
		var oStartButton = oContext.getView().byId("startBtn"),
			oThemeSelect = oContext.getView().byId("themeSelect");

		oStartButton.setVisible(false);
		oThemeSelect.setVisible(false);
	}


	/*
		If you want to show some components, for example when loading bar is full,
		add here your component 
	*/
	function _showComponent(oContext) {
		var oLoadingBar = oContext.getView().byId("loadingBar");

		if (oLoadingBar.getPercentValue() === 100) {
			// set visible = true to your component here 

			var oStartButton = oContext.getView().byId("startBtn"),
				oThemeSelect = oContext.getView().byId("themeSelect");

			oStartButton.setVisible(true);
			oThemeSelect.setVisible(true);
		}
	}


	/* Theme Switch Function */
	function _setTheme(oContext) {
		var oThemeSelect = oContext.getView().byId("themeSelect");
		var selectedKeyTheme = oThemeSelect.getSelectedKey();

		sap.ui.getCore().applyTheme(selectedKeyTheme);
	}


	return Controller.extend("UI5IceCreamMachine.controller.App", {

		/* Initialize all components on first call of the page */
		onInit: function () {

			// Set THEME Selector
			var oDataThemes = {
				"SelectedTheme": "sap_horizon",
				"ThemesCollection": [
					{
						"ThemeId": "sap_horizon",
						"Name": "Morning Horizon"
					},
					{
						"ThemeId": "sap_horizon_dark",
						"Name": "Evening Horizon"
					},
					{
						"ThemeId": "sap_belize",
						"Name": "Belize"
					},
					{
						"ThemeId": "sap_belize_plus",
						"Name": "Belize Plus"
					},
					{
						"ThemeId": "sap_bluecrystal",
						"Name": "SAP Blue Crystal"
					},
					{
						"ThemeId": "sap_fiori_3",
						"Name": "Quartz Light"
					},
					{
						"ThemeId": "sap_fiori_3_dark",
						"Name": "Quartz Dark"
					}
				]
			};
			var oModelThemes = new JSONModel(oDataThemes);
			this.getView().setModel(oModelThemes, "modelThemes");
			_setTheme(this);


			// Set LOADING Bar and component visibility
			_hideLoadingBar(this);
			_hideComponent(this);
			setTimeout(_showLoadingBar, 1000, this);

			var maxProgress = 100,
				updateInterval = 15,
				currentValue = 0;

			function _loadingBar(oContext) {
				var oLoadingBar = oContext.getView().byId("loadingBar");

				if (currentValue <= maxProgress) {
					oLoadingBar.setPercentValue(+currentValue);
					oLoadingBar.setDisplayValue(currentValue + "%");
					setTimeout(_loadingBar, updateInterval, oContext);

					currentValue += 1;
				} else {
					setTimeout(_hideLoadingBar, 200, oContext);
					setTimeout(_showComponent, 250, oContext);
				}
			}

			setTimeout(_loadingBar, 1500, this);
		},

		/* Function that will be called on Start Button Press */
		onStartBtn: function () {
			window.open("https://shorturl.at/tILT5", "_blank");
		},

		onSelectTheme: function () {
			_setTheme(this);
		}

	});
});