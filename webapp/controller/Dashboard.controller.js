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


            var sRssLink = "https://www.ansa.it/sito/ansait_rss.xml";
            var oXmlModel = new XMLModel();

            oXmlModel.loadData(sRssLink);
            this.getView().setModel(oXmlModel, "feeds");


            var sDataPath = sap.ui.require.toUrl("sap/suite/ui/commons/demokit/tutorial/icecream/03/model/data") + "/News.json";
            var oModel = new JSONModel(sDataPath);
            this.getView().setModel(oModel, "news");

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