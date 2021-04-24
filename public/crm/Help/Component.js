sap.ui.define(
	["sap/ui/core/UIComponent", 
	"sap/ui/model/json/JSONModel",
	"sap/nsme/share/model/type/Currency"
],
	function (BaseClass, JSONModel, Currency1) {
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
