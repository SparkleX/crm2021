sap.ui.define(
	["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"],
	function (UIComponent, JSONModel) {
		"use strict";
		return UIComponent.extend("sap.nsme.crm.Account.Component", {
			metadata: {
				manifest: "json"
			},
			init: function () {
				UIComponent.prototype.init.apply(this, arguments);
				const oRouter = this.getRouter();
				oRouter.initialize();
				//oRouter.getRoute("list").attachPatternMatched(this._onObjectMatched, this);
			}/*,
			_onObjectMatched: function (oEvent) {
				alert(1);
				this.getView().bindElement({
					path: "/" + oEvent.getParameter("arguments").invoicePath,
					model: "invoice"
				});
			}	*/			
		})
	}, true
);
