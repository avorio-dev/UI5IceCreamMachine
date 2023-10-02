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
            var oManifest = sap.ui.core.Component.getOwnerComponentFor(oEvent.getSource()).getManifest();

            var appVersion = oManifest["sap.app"].applicationVersion.version;
            var versionInfo = "App Version" + "\t" + appVersion;

            sap.m.MessageBox.information(versionInfo, {
                styleClass: "sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer"
            });
        }

    };

});

