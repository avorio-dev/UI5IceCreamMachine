sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/base/util/UriParameters"

], function (MockServer, UriParameters) {
    "use strict";

    return {
        onInit: function () {
			var oMockServer = new MockServer({
				rootUri: "/services.odata.org/northwind/northwind.svc"
			});
			
			var oUriParameters = new UriParameters(window.location.href);
			
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUriParameters.get("serverDelay") || 500
			});
			
			var sPath = sap.ui.require.toUrl("UI5IceCreamMachine/localService");
			oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");
			
			oMockServer.start();
        }

    };
});