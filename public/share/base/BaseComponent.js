sap.ui.define(
	["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel", "sap/ui/core/IconPool",
		"sap/nsme/share/utils/MetadataUtils"],
	function (UIComponent, JSONModel, IconPool, MetadataUtils) {
		"use strict";
		var theClass = UIComponent.extend("sap.nsme.share.base.BaseComponent");
		theClass.prototype.init = async function () {
			var t = {
				fontFamily: "SAP-icons-TNT",
				fontURI: sap.ui.require.toUrl("sap/tnt/themes/base/fonts/")
			};
			IconPool.registerFont(t);
			UIComponent.prototype.init.apply(this, arguments);
			var oMetadata = await MetadataUtils.getMetadata();
			this.getRouter().initialize();
		};
		return theClass;
	},
	true
);
