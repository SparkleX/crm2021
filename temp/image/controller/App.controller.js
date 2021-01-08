sap.ui.define([
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		"sap/ui/unified/FileUploader",
		"sap/m/Button"
	], function(Controller, JSONModel, FileUploader, Button) {
	"use strict";

	return Controller.extend("sap.m.sample.ProgressIndicator.controller.App", {
		onInit : function () {
			
			this.oFileUploader = new FileUploader({
				uploadUrl: "upload/",
				fileType: "jpg,pdf"
				//style: "Emphasized",
				//uploadOnChange: true,
				//uploadComplete: this.handleUploadComplete.bind(this)
			});
			this.byId("idToolbar").addContent(this.oFileUploader);

		},
		test: function() {
			const oButton = new Button({
				text:"Aaa"
			});
			this.getView().addContent(this.oButton);
		},
		onPIChangeValueButtonPressed : function (oEvent) {
			var sSourceId = oEvent.getSource().getId(),
				sButton = 'button',
				iIndexOfButton = sSourceId.indexOf(sButton),
				oProgressIndicator = this.getView().byId(sSourceId.substring(0, iIndexOfButton - 1)),
				sValue = sSourceId.substring(iIndexOfButton + sButton.length);

			oProgressIndicator.setPercentValue(+sValue);
			oProgressIndicator.setDisplayValue(sValue + '%');
		},
		doIt : function (oEvent) {
			alert(1);
		},
		handleUploadComplete : function (oEvent) {
			alert(2);
		}
	});
});