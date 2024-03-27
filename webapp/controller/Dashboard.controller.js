sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/ui/model/xml/XMLModel",
    "sap/base/strings/formatMessage",
    "../libs/Settings",
    "../libs/Utils"

], function (Controller, JSONModel, XMLModel, formatMessage, Settings, Utils) {
    "use strict";

    // --> PRIVATE SECTION
    // --------------------------------------------------

    /*
        Loads components and initializes the view.
    */
    function _loadComponents() {
        let oContext = this;

        // Load settings fragment into toolbar
        Settings.loadSettingsFrag(oContext, "toolbar");

        // Initialize XML and JSON tiles
        _initXMLTile(oContext);
        _initJSONTile(oContext);
    }

    function _createTileFromXMLItem(item) {
        let title = item.getElementsByTagName("title")[0]?.textContent || "Title Not Available";
        let description = item.getElementsByTagName("description")[0]?.textContent || "Description Not Available";
        let pubDate = item.getElementsByTagName("pubDate")[0]?.textContent || "Date Not Available";
        let link = item.getElementsByTagName("link")[0]?.textContent || "#";

        let tile = new sap.m.GenericTile({
            header: title,
            subheader: description,
            frameType: "TwoByOne",
            press: function () {
                window.open(link, "_blank", "noopener,noreferrer");
            }
        });

        let tileContent = new sap.m.TileContent({
            footer: pubDate
        });

        tile.addTileContent(tileContent);

        return tile;
    }

    /*
        Initializes the XML tile.
    */
    function _initXMLTile(oContext) {
        let oSlideTileXml = oContext.getView().byId("slideTileXml");
        let oFeedsModel = oContext.getOwnerComponent().getModel("feeds");

        let aItems = oFeedsModel.getData().getElementsByTagName("item");
        Array.from(aItems).forEach(function (oItem) {
            let tile = _createTileFromXMLItem(oItem);
            oSlideTileXml.addTile(tile);
        });
    }

    /*
        Initializes the JSON tile.
    */
    function _initJSONTile(oContext) {
        let oSlideTileXmlToJson = oContext.getView().byId("slideTileXmlToJson");
        let oFeedsModel = oContext.getOwnerComponent().getModel("feeds");

        let aTileItems = [];

        let aItems = oFeedsModel.getData().getElementsByTagName("item");
        Array.from(aItems).forEach(function (oItem) {
            let oTileItem = {
                title: oItem.getElementsByTagName("title")[0].textContent,
                description: oItem.getElementsByTagName("description")[0].textContent,
                pubDate: oItem.getElementsByTagName("pubDate")[0].textContent,
                link: oItem.getElementsByTagName("link")[0].textContent
            };

            aTileItems.push(oTileItem);
        });

        let oTileModel = new JSONModel();
        oTileModel.setData({ tiles: aTileItems });
        oSlideTileXmlToJson.setModel(oTileModel, "feedsXmlToJson");
    }

    /*
        Handles the change event for setting the theme.
        
        Parameters:
            oEvent {object}: The event object.
    */
    function _onSetTheme(oEvent) {
        Settings.setTheme(oEvent);
    }

    /*
        Handles the click event for displaying version information.
        
        Parameters:
            oEvent {object}: The event object.
    */
    function _onVersionInfo(oEvent) {
        Settings.onVersionInfo(oEvent);
    }

    /*
        Calculates the progress based on the state of the nodes.
        
        Parameters:
            aNodes {array}: An array of nodes.
        
        Returns:
            {number}: The progress percentage.
    */
    function _getProgress(aNodes) {
        if (!aNodes || aNodes.length === 0) {
            return 0;
        }
        let iSum = 0;
        for (var i = 0; i < aNodes.length; i++) {
            iSum += aNodes[i].state === "Positive";
        }
        let fPercent = (iSum / aNodes.length) * 100;
        return fPercent.toFixed(0);
    }

    /*
        Gets the count of entities.
        
        Returns:
            {number}: The count of entities.
    */
    function _getEntitiesCount(entities) {
        return entities && entities.length || 0;
    }

    /*
        Formats a number with 2 decimals.
        
        Parameters:
            value {number}: The number to be formatted.
    */
    function _formatNumber(value) {
        Utils.formatNumber(value, 2);
    }

    /*
        Formats a date.
        
        Parameters:
            date {Date|string}: The date object or string representation of the date.
    */
    function _formatDate(date) {
        Utils.formatDate(date)
    }

    /*
        Handles the click event for opening a feed.
        
        Parameters:
            oEvent {object}: The event object.
    */
    function _onFeedOpen(oEvent) {
        let oSource = oEvent.getSource();
        let sLink = oSource.getBindingContext("feedsXmlToJson").getProperty("link");
        window.open(sLink, "_blank");
    }


    function _onRepoZAG() {
        let sLink = "https://github.com/avorio-dev/S4ZAG/tree/main";
        window.open(sLink, "_blank");
    }

    function _onRepoZAGUI5() {
        let sLink = "https://github.com/avorio-dev/UI5IceCreamMachine";
        window.open(sLink, "_blank");
    }


    // --> PUBLIC SECTION
    // --------------------------------------------------

    return Controller.extend("UI5IceCreamMachine.controller.Dashboard", {

        // --> Public Interface
        // --------------------------------------------------

        onInit: _loadComponents,
        formatMessage: formatMessage,
        onSetTheme: _onSetTheme,
        onVersionInfo: _onVersionInfo,
        getProgress: _getProgress,
        getEntityCount: _getEntitiesCount,
        formatNumber: _formatNumber,
        formatJSONDate: _formatDate,
        onFeedOpen: _onFeedOpen,
        onRepoZag: _onRepoZAG,
        onRepoZagUI5: _onRepoZAGUI5,

        // --> NavTo Events
        // --------------------------------------------------
        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },

        onNavToProcessFlow: function () {
            let sNavTo = "toProcessFlow";
            Utils.onNavTo(this, sNavTo);
        },

        onNavToInvoicesLocalList: function () {
            let sNavTo = "toInvoicesLocalList";
            Utils.onNavTo(this, sNavTo);
        },

        onNavToChartContainer: function () {
            let sNavTo = "toChartContainer";
            Utils.onNavTo(this, sNavTo);
        },

        onNavToReviews: function () {
            let sNavTo = "toReviews";
            Utils.onNavTo(this, sNavTo);
        }
    });
});