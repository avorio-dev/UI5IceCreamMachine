sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"UI5IceCreamMachine/model/models",
	"sap/ui/model/json/JSONModel"

], function (UIComponent, Device, models, JSONModel) {
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

			// Set Model with namespaces
			var oNamespaceModel = new JSONModel({
				path_root: "UI5IceCreamMachine",
				path_fragment: "UI5IceCreamMachine.view.fragment"
			});
			this.setModel(oNamespaceModel, "namespace");

			// Set Default Theme
			var oModelThemes = this.getModel("themes");
			oModelThemes.attachRequestCompleted(function () {
				var sDefaultThemeId = oModelThemes.getData().defaultTheme;
				sap.ui.getCore().applyTheme(sDefaultThemeId);
			});


			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// create the views based on the url/hash
			this.getRouter().initialize();

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