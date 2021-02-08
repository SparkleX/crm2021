sap.ui.define(
	["sap/nsme/share/component/BaseComponent", "sap/ui/model/json/JSONModel"],
	function (BaseClass, JSONModel) {
		"use strict";
		var theClass = BaseClass.extend("sap.nsme.crm.Account.Component", {
			metadata: {
				manifest: "json"
			}
		});
		return theClass;
	},
	/*export*/ true
);
