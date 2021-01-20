sap.ui.define(
	["sap/ui/core/mvc/ControllerExtension", "sap/ui/core/mvc/OverrideExecution"],
	function (ControllerExtension, OverrideExecution) {
		"use strict";
		var theClass = ControllerExtension.extend("sap.nsme.crm.AddonExt.controller.List1", {
			metadata: {
				methods: {}
			},
			override: {
				onInit: function (evt) {
					alert("Addon:onInit");
					/*const oController = evt.getSource().getController()
					oController.onTest = function () {
						alert("hello");
					};*/
				},
				onClick: function (evt) {
					alert("Addon:onClick1");
				}
			}
		});
		return theClass;
	}
);
