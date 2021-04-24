sap.ui.define(["jquery.sap.global",
	"sap/ui/base/DataType",
	"sap/nsme/share/model/type/Precent",
	"sap/nsme/share/model/type/Price"], function (jQuery, DataType, Precent, Price) {
		"use strict";

		sap.ui.getCore().initLibrary({
			name: "sap.nsme.share",
			version: "1.0.0",
			types: ["any", "boolean", "float", "int", "object", "string", "void"],
			interfaces: [],
			controls: [],
			elements: [],
			extensions: {}
		});
		return sap.nsme.share;
	});
