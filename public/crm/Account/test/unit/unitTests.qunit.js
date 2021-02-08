/* global QUnit */
//QUnit.config.autostart = false;
//jQuery.sap.require("sap.ui.qunit.qunit-css");
//jQuery.sap.require("sap.ui.thirdparty.qunit");
//jQuery.sap.require("sap.ui.qunit.qunit-junit");
//jQuery.sap.require("sap.ui.qunit.qunit-coverage");

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sap/ui/qunit/qunit-coverage",
		"sap/nsme/crm/Account/test/unit/AllTests"
	], function () {
		//QUnit.start();
	});
});