sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"UI5IceCreamMachine/model/models"
	
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("UI5IceCreamMachine.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// create the views based on the url/hash
			this.getRouter().initialize();

			// Set Default Theme
			var oModelThemes = this.getModel("themes");
			oModelThemes.attachRequestCompleted(function () {
				var sDefaultThemeId = oModelThemes.getData().defaultTheme;
				sap.ui.getCore().applyTheme(sDefaultThemeId);
			});

		},

		getContentDensityClass: function () {
			if (!this._sContentDensityClass) {
				if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	});
});