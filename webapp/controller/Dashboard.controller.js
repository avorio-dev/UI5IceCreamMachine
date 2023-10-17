sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/ui/model/xml/XMLModel",
    "sap/base/strings/formatMessage",
    "sap/ui/core/format/NumberFormat",
    "../libs/Settings",
    "../libs/Utils"

], function (Controller, JSONModel, XMLModel, formatMessage, NumberFormat, Settings, Utils) {
    "use strict";

    // --> GLOBALS
    // --------------------------------------------------
    var sNavTo;

    // --> FUNCTIONS
    // --------------------------------------------------

    /* Fill Tile with data loaded from XML Model */
    function _initXMLTile(oContext) {

        var oSlideTileXml = oContext.getView().byId("slideTileXml");

        /* 
        var sRssLink = "https://www.ansa.it/sito/ansait_rss.xml";
        var oXmlModel = new XMLModel();

        oXmlModel.loadData(sRssLink);
        oContext.getView().setModel(oXmlModel, "feeds");
        */

        var oFeedsModel = oContext.getOwnerComponent().getModel("feeds");

        var aItems = oFeedsModel.getData().getElementsByTagName("item");
        Array.from(aItems).forEach(function (oItem) {

            var oGenericTile = new sap.m.GenericTile({
                header: oItem.getElementsByTagName("title")[0].textContent,
                subheader: oItem.getElementsByTagName("description")[0].textContent,
                frameType: "TwoByOne",

                press: function () {
                    //window.open("https://shorturl.at/tILT5", "_blank");
                    var link = oItem.getElementsByTagName("link")[0].textContent;
                    window.open(link, "_blank");
                }
            });

            var oTileContent = new sap.m.TileContent({
                footer: oItem.getElementsByTagName("pubDate")[0].textContent,
            });

            oGenericTile.addTileContent(oTileContent);
            oSlideTileXml.addTile(oGenericTile);
        });
    }

    /* Fill Tile with data loaded from XML Model and Converted in JSON Model */
    function _initJSONTile(oContext) {
        var oSlideTileXmlToJson = oContext.getView().byId("slideTileXmlToJson");
        var oFeedsModel = oContext.getOwnerComponent().getModel("feeds");

        var aTileItems = [];
        var aItems = oFeedsModel.getData().getElementsByTagName("item");
        Array.from(aItems).forEach(function (oItem) {
            var oTileItem = {
                title: oItem.getElementsByTagName("title")[0].textContent,
                description: oItem.getElementsByTagName("description")[0].textContent,
                pubDate: oItem.getElementsByTagName("pubDate")[0].textContent,
                link: oItem.getElementsByTagName("link")[0].textContent
            };

            aTileItems.push(oTileItem);
        });

        var oTileModel = new JSONModel();
        oTileModel.setData({ tiles: aTileItems });
        oSlideTileXmlToJson.setModel(oTileModel, "feedsXmlToJson");

    }

    // --> EVENTS
    // --------------------------------------------------
    return Controller.extend("UI5IceCreamMachine.controller.Dashboard", {

        /* Initialize all components on first call of the page */
        onInit: function () {

            Settings.load_settings(this, "toolbar");
            _initXMLTile(this);
            _initJSONTile(this);

        },

        formatMessage: formatMessage,

        onSetTheme: function (oEvent) {
            Settings.setTheme(oEvent);
        },

        onVersionInfo: function (oEvent) {
            Settings.onVersionInfo(oEvent);
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
        },

        onFeedOpen: function (oEvent) {
            //window.open("https://shorturl.at/tILT5", "_blank");
            var oSource = oEvent.getSource();
            var sLink = oSource.getBindingContext("feedsXmlToJson").getProperty("link");
            window.open(sLink, "_blank");
        },

        onRepoZag: function () {
            var sLink = "https://github.com/avorio-dev/S4ZAG/tree/main";
            window.open(sLink, "_blank");
        },

        onRepoZagUI5: function () {
            var sLink = "https://github.com/avorio-dev/UI5IceCreamMachine";
            window.open(sLink, "_blank");
        },

        // --> NAV TO EVENTS
        // --------------------------------------------------
        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },

        onNavToProcessFlow: function () {
            sNavTo = "toProcessFlow";
            Utils.onNavTo(this, sNavTo);
        },

        onNavToInvoicesList: function () {
            sNavTo = "toInvoicesList";
            Utils.onNavTo(this, sNavTo);
        },

        onNavToChartContainer: function () {
            sNavTo = "toChartContainer";
            Utils.onNavTo(this, sNavTo);
        },

        onNavToReviews: function () {
            sNavTo = "toReviews";
            Utils.onNavTo(this, sNavTo);
        }
    });
});