sap.ui.define(
	["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"],
	function (BaseClass, JSONModel) {
		"use strict";
		var theClass = BaseClass.extend("sap.nsme.crm.Help.Component", {
			metadata: {
				manifest: "json"
			}
		});
		return theClass;
	},
	/*export*/ true
);
