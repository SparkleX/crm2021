sap.ui.define(
	["sap/ui/core/mvc/ControllerExtension", "sap/ui/core/mvc/OverrideExecution"],
	function (ControllerExtension, OverrideExecution) {
		"use strict";
		var theClass = ControllerExtension.extend("sap.nsme.crm.AddonExt.controller.List", {
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
					var oController = evt.getSource().getParent().getParent().getController();
					oController.constructor.prototype.onClick();					
					alert("Addon:onClick");
				}
			}
		});
		return theClass;
	}
);
