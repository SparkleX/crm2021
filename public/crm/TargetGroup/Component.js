sap.ui.define(
	["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel","sap/ui/core/IconPool"],
	function (UIComponent, JSONModel, IconPool) {
		"use strict";
		return UIComponent.extend("sap.nsme.crm.TargetGroup.Component", {
			metadata: {
				manifest: "json"
			},
			init: function () {
				var b = [];
				var c = {};
				//Fiori Theme font family and URI
				var t = {
					fontFamily: "SAP-icons-TNT",
					fontURI: sap.ui.require.toUrl("sap/tnt/themes/base/fonts/")
				};
				//Registering to the icon pool
				IconPool.registerFont(t);
				/*b.push(IconPool.fontLoaded("SAP-icons-TNT"));
				c["SAP-icons-TNT"] = t;
				//SAP Business Suite Theme font family and URI
				var B = {
					fontFamily: "BusinessSuiteInAppSymbols",
					fontURI: sap.ui.require.toUrl("sap/ushell/themes/base/fonts/")
				};
				//Registering to the icon pool
				IconPool.registerFont(B);
				b.push(IconPool.fontLoaded("BusinessSuiteInAppSymbols"));
				c["BusinessSuiteInAppSymbols"] = B;*/

				UIComponent.prototype.init.apply(this, arguments);
				this.getRouter().initialize();
			}
		});
	},
	/*export*/ true
);
