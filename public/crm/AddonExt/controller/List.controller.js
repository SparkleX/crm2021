sap.ui.define(
	["sap/ui/core/mvc/ControllerExtension", "sap/ui/core/mvc/OverrideExecution"],
	function (ControllerExtension, OverrideExecution) {
		"use strict";
		var theClass = ControllerExtension.extend("sap.nsme.crm.AddonExt.controller.List", {
			metadata: {
				methods: {
					onClick: { public: true, final: false, overrideExecution: OverrideExecution.Before }
				}
			},

			override: {
				onInit: function (evt) {
					alert("onInit");
					/*const oController = evt.getSource().getController()
					oController.onTest = function () {
						alert("hello");
					};*/
				},
				onClick:  function (evt) {
					alert('a');
				}			
			} /*,
			overrideMethod: {
				onClick:  function (evt) {
					alert('a');
				}
			}*/
		});
		return theClass;
	}
);
