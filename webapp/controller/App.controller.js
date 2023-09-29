sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	/* 
		Hide Loading Bar
	*/
	function hideLoadingBar(oContext) {
		var oLoadingBar = oContext.getView().byId("loadingBar");
		oLoadingBar.setVisible(false);
	}


	/* 
		Show Loading Bar 
	*/
	function showLoadingBar(oContext) {
		var oLoadingBar = oContext.getView().byId("loadingBar");

		oLoadingBar.setVisible(true);

		oLoadingBar.setPercentValue(0);
		oLoadingBar.setDisplayValue(0 + "%");
	}


	/*
		If you want to hide some component, for example when loading bar is filling up,
		add here your component
	*/
	function hideComponent(oContext) {

	}


	/*
		If you want to show some components, for example when loading bar is full,
		add here your component 
	*/
	function showComponent(oContext) {
		var oLoadingBar = oContext.getView().byId("loadingBar");

		if (oLoadingBar.getPercentValue() === 100) {
			// set visible = true to your component here 

		}
	}


	return Controller.extend("UI5IceCreamMachine.controller.App", {
		onInit: function () {

			// hideLoadingBar(this);
			hideComponent(this);

			setTimeout(showLoadingBar, 1000, this);

			var maxProgress = 100,
				updateInterval = 15,
				currentValue = 0;

			function loadingBar(oContext) {
				var oLoadingBar = oContext.getView().byId("loadingBar");

				if (currentValue <= maxProgress) {
					oLoadingBar.setPercentValue(+currentValue);
					oLoadingBar.setDisplayValue(currentValue + "%");
					setTimeout(loadingBar, updateInterval, oContext);

					currentValue += 1;
				} else {
					setTimeout(hideLoadingBar, 200, oContext);
					setTimeout(showComponent, 250, oContext);
				}
			}

			setTimeout(loadingBar, 1500, this);
		}

	});
});