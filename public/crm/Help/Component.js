sap.ui.define(
	["sap/nsme/share/base/BaseComponent", 
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
