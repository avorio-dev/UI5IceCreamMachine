sap.ui.define([
    "sap/m/MessageBox"

], function (MessageBox) {
    "use strict";

    return {

        /* 
            Show component "Settings" on your toolbar, 
            passing context (onInit) and Toolbar ID

            How to Use:
            onInit: function () {
                Settings.loadSettingsFrag(this, "toolbar");
            }
        */
        loadSettingsFrag: function (oContext, sViewId) {

            var sFragmentPath = oContext.getOwnerComponent().getModel("namespace").getProperty("/path_fragment") + ".Settings";
            if (!oContext.pFragment) {
                oContext.pFragment = oContext.loadFragment({
                    name: sFragmentPath
                });
            }

            oContext.pFragment.then(function (oFragment) {
                var oToolbar = oContext.getView().byId(sViewId);
                oToolbar.addContent(oFragment);
            }.bind(oContext));
        },

        /* 
            Theme Switch Function 

            How to Use:
            onSetTheme: function (oEvent) {
                Settings.setTheme(oEvent);
            }
        */
        setTheme: function (oEvent) {
            // Trigger from menu selection
            var oSelectedItem = oEvent.getSource();
            var sSelectedThemeId = oSelectedItem.getKey();
            sap.ui.getCore().applyTheme(sSelectedThemeId);
        },

        /* 
            Get info of App from Manifest 

            How to Use:
            onVersionInfo: function (oEvent) {
                Settings.onVersionInfo(oEvent);
            }
        */
        onVersionInfo: function (oEvent) {
            console.log(oEvent);
            var oManifest = sap.ui.core.Component.getOwnerComponentFor(oEvent.getSource()).getManifest(),
                sVersionInfo = "";

            var sAppVersion = oManifest["sap.app"].applicationVersion.version;
            sVersionInfo = "App Version:" + "\t" + sAppVersion;

            sVersionInfo += "\n\n"

            var sMinUI5Version = oManifest["sap.ui5"].dependencies.minUI5Version;
            sVersionInfo += "UI5 Version:" + "\t" + sMinUI5Version;

            MessageBox.information(sVersionInfo, {
                styleClass: "sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer"
            });
        }

    };

});

