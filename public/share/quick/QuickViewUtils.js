sap.ui.define(
	[
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"sap/m/ColumnListItem",
		"sap/m/Label",
		"sap/m/Token",
		"sap/nsme/share/ovs/ValueSelectController",
		"sap/ui/comp/valuehelpdialog/ValueHelpDialog"
	],
	function (Fragment, JSONModel, ColumnListItem, Label, Token, ValueSelectController, ValueHelpDialog) {
		"use strict";
		var theClass = {};
		theClass.show = function (params) {
			var oDataModel = new JSONModel(`/api/${params.object}/${params.id}`);
			if (!this._pPopover) {
				this._pPopover = Fragment.load({
					id: `quickView${params.object}`,
					name: `sap.nsme.share.quick.view.${params.object}`,
					controller: this
				}).then(function (oPopover) {
					return oPopover;
				});
			}
			this._pPopover.then(function (oPopover) {
				oPopover.setModel(oDataModel);
				oPopover.openBy(params.parent);
			});
		};
		theClass.onGo = function (params) {
			const id = params.getSource().getModel().getData().id;
			window.open(`#Account-App&/detail/${id}`, "_blank");
		};
		return theClass;
	}
);
