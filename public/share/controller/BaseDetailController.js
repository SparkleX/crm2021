sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"sap/nsme/share/utils/ViewUtils"
	],
	function (Controller, MessageToast, Fragment, JSONModel, History, ViewUtils) {
		"use strict";

		const ViewMode = "ViewMode";
		const AddMode = "AddMode";
		const EditMode = "EditMode";

		const idObjectPageLayout = "objectPageLayout";
		const idFooterBar = "footBar";

		const idEditButton = "editButton";
		const idSaveButton = "saveButton";
		const idCancelButton = "sysCancelButton";
		const idNewButton = "newButton";
		const idDeleteButton = "deleteButton";

		const idNextButton = "sysNextButton";
		const idPrevButton = "sysPrevButton";
		const idFirstButton = "sysFirstButton";
		const idLastButton = "sysLastButton";

		var theClass = Controller.extend("sap.nsme.share.controller.BaseDetailController", {
			metadata: {
				properties: {
					formMode: { type: "string", defaultValue: "ViewMode" }
				}
			}
		});
		theClass.prototype.getTableName = function () {
			const ns = this.getMetadata().getNamespace();
			const name = ns.split(".")[3];
			return name;
		};
		theClass.prototype.onInit = function () {
			var component = this.getOwnerComponent();
			var oRouter = component.getRouter();
			oRouter.getRoute("detail").attachMatched(function (oEvent) {
				this.dataId = oEvent.getParameter("arguments").id;
				if (this.dataId === "#") {
					this.setFormMode(AddMode);
					this.onInitData();
				} else {
					this.setFormMode(ViewMode);
					this.onLoadData(this.dataId);
				}
			}, this);
		};
		theClass.prototype.setFormMode = function (value) {
			this.formMode = value;
			const oObjectPage = this.byId(idObjectPageLayout);
			const oEditButton = this.byId(idEditButton);
			const oNewButton = this.byId(idNewButton);
			const oDeleteButton = this.byId(idDeleteButton);
			const oNextButton = this.byId(idNextButton);
			const oPrevButton = this.byId(idPrevButton);
			const oFirstButton = this.byId(idFirstButton);
			const oLastButton = this.byId(idLastButton);

			switch (this.formMode) {
				case AddMode:
				case EditMode:
					oObjectPage.setShowFooter(true);
					this.setEditable(true);
					/*oDeleteButton.setVisible(false);
					oEditButton.setVisible(false);
					oNewButton.setVisible(false);*/
					/*oNextButton.setVisible(false);
					oPrevButton.setVisible(false);
					oFirstButton.setVisible(false);
					oLastButton.setVisible(false);*/
					//oObjectPage.setShowAnchorBar(false);
					break;
				case ViewMode:
					oObjectPage.setShowFooter(false);
					this.setEditable(false);
					/*oDeleteButton.setVisible(true);
					oEditButton.setVisible(true);
					oNewButton.setVisible(true);*/
					/*oNextButton.setVisible(true);
					oPrevButton.setVisible(true);
					oFirstButton.setVisible(true);
					oLastButton.setVisible(true);*/
					//oObjectPage.setShowAnchorBar(true);
					break;
			}
		};
		theClass.prototype.onInitData = function () {
			// to be override
		};
		theClass.prototype.onLoadData = function (id) {
			const name = this.getTableName();
			var oModel = new JSONModel(`/api/${name}/${id}`);
			this.getView().setModel(oModel);
			oModel.refresh(true);
			//this.getView().invalidate();
		};

		theClass.prototype.onNext = function () {};
		theClass.prototype.onPrev = function () {};
		theClass.prototype.onFirst = function () {};
		theClass.prototype.onLast = function () {};

		theClass.prototype.onNew = function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				id: "#"
			});
		}
		theClass.prototype.onSave = function () {
			var model = this.getView().getModel();
			var data = model.getData();
			var json = JSON.stringify(data);
			const name = this.getTableName();
			jQuery.ajax({
				url: `/api/${name}/${this.dataId}`,
				method: this.formMode == AddMode ? "post" : "put",
				contentType: "application/json",
				data: json,
				success: function (data) {
					MessageToast.show("Successful");
				}
			});
			this.setFormMode(ViewMode);
		};

		theClass.prototype.onEdit = function () {
			this.setFormMode(EditMode);
		};

		theClass.prototype.onDelete = function () {
			jQuery.ajax({
				url: `/api/Partner/${this.dataId}`,
				method: "delete",
				success: function (data) {
					MessageToast.show("Deleted");
				}
			});
		};
		theClass.prototype.onCancel = function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview", true);
			}
		};

		theClass.prototype.setEditable = function (readonly) {
			const items = ViewUtils.scan(this.getView());
			console.debug(items.length);
			ViewUtils.setEditable(items, readonly);
		};

		return theClass;
	}
);
