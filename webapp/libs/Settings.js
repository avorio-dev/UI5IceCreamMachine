sap.ui.define([], function () {
    "use strict";



    return {

        /* Theme Switch Function */
        setTheme: function (oEvent) {
            // Trigger from menu selection
            var oSelectedItem = oEvent.getSource();
            var sSelectedThemeId = oSelectedItem.getKey();
            sap.ui.getCore().applyTheme(sSelectedThemeId);
        },

        /* Get info of App from Manifest */
        onVersionInfo: function (oEvent) {
            console.log(oEvent);
            var oManifest = sap.ui.core.Component.getOwnerComponentFor(oEvent.getSource()).getManifest(),
                sVersionInfo = "";

            var sAppVersion = oManifest["sap.app"].applicationVersion.version;
            sVersionInfo = "App Version:" + "\t" + sAppVersion;

            sVersionInfo += "\n\n"
            
            var sMinUI5Version = oManifest["sap.ui5"].dependencies.minUI5Version;
            sVersionInfo += "UI5 Version:" + "\t" + sMinUI5Version;

            sap.m.MessageBox.information(sVersionInfo, {
                styleClass: "sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer"
            });
        }

    };

});

