sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/ui/model/xml/XMLModel"

], function (Controller, JSONModel, XMLModel) {
    "use strict";

    return Controller.extend("UI5IceCreamMachine.controller.Dashboard", {

        /* Initialize all components on first call of the page */
        onInit: function () {

            //var sDataPath = sap.ui.require.toUrl("sap/suite/ui/commons/demokit/tutorial/icecream/03/model/data") + "/News.json";
            //var oModel = new JSONModel(sDataPath);


            /*
            var sRssLink = "https://www.ansa.it/sito/ansait_rss.xml";
            var oXmlModel = new XMLModel();

            oXmlModel.loadData(sRssLink);
            this.getView().setModel(oXmlModel, "feeds");
            */

            /* 
            var sDataPath = sap.ui.require.toUrl("sap/suite/ui/commons/demokit/tutorial/icecream/03/model/data") + "/News.json";
            var oNewsModel = new JSONModel(sDataPath);
            this.getView().setModel(oNewsModel, "news");
            */

            // Assume che il tuo modello sia già caricato con i dati
            var oSlideTile = this.getView().byId("slideTileId");
            var oFeedsModel = this.getOwnerComponent().getModel("feeds");

            var aItems = oFeedsModel.getData().getElementsByTagName("item");
            Array.from(aItems).forEach(function (oItem) {

                var link = oItem.getElementsByTagName("link")[0].textContent;

                var oGenericTile = new sap.m.GenericTile({
                    header: oItem.getElementsByTagName("title")[0].textContent,
                    subheader: oItem.getElementsByTagName("description")[0].textContent,
                    info: oItem.getElementsByTagName("pubDate")[0].textContent,

                    press: function () {
                        //window.open("https://shorturl.at/tILT5", "_blank");
                        window.open(link, "_blank");
                    }
                });

                var oTileContent = new sap.m.TileContent({
                    footer: new sap.m.Link({ text: "Leggi di più", href: link })
                });

                oGenericTile.addTileContent(oTileContent);
                oSlideTile.addTile(oGenericTile);
            });
        },

        getProgress: function (aNodes) {
            if (!aNodes || aNodes.length === 0) {
                return 0;
            }
            var iSum = 0;
            for (var i = 0; i < aNodes.length; i++) {
                iSum += aNodes[i].state === "Positive";
            }
            var fPercent = (iSum / aNodes.length) * 100;
            return fPercent.toFixed(0);
        },

        getEntityCount: function (entities) {
            return entities && entities.length || 0;
        },

        formatNumber: function (value) {
            var oFloatFormatter = NumberFormat.getFloatInstance({
                style: "short",
                decimals: 2
            });
            return oFloatFormatter.format(value);
        },

        formatJSONDate: function (date) {
            var oDate = new Date(Date.parse(date));
            return oDate.toLocaleDateString();
        }
    });
});