sap.ui.define(
	["sap/nsme/crm/share/BaseComponent", "sap/ui/model/json/JSONModel"],
	function (UIComponent, JSONModel) {
		"use strict";
		return UIComponent.extend("sap.nsme.crm.HelpView.Component", {
			metadata: {
				manifest: "json"
			},
			init: function () {
				UIComponent.prototype.init.apply(this, arguments);
				this.getRouter().initialize();
			}
		});
	},
	/*export*/ true
);
