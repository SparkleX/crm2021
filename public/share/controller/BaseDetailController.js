sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"sap/nsme/share/utils/ViewUtils",
		"sap/nsme/share/utils/TableUtils"
	],
	function (Controller, MessageToast, Fragment, JSONModel, History, ViewUtils, TableUtils) {
		"use strict";

		const ViewMode = "ViewMode";
		const AddMode = "AddMode";
		const EditMode = "EditMode";

		const idObjectPageLayout = "objectPageLayout";
		const idFooterBar = "footBar";

		const idEditButton = "sysEditButton";
		const idSaveButton = "sysSaveButton";
		const idCancelButton = "sysCancelButton";
		const idNewButton = "sysNewButton";
		const idDeleteButton = "sysDeleteButton";

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
					oDeleteButton.setVisible(false);
					oEditButton.setVisible(false);
					oNewButton.setVisible(false);
					oNextButton.setVisible(false);
					oPrevButton.setVisible(false);
					oFirstButton.setVisible(false);
					oLastButton.setVisible(false);
					break;
				case ViewMode:
					oObjectPage.setShowFooter(false);
					this.setEditable(false);
					oDeleteButton.setVisible(true);
					oEditButton.setVisible(true);
					oNewButton.setVisible(true);
					oNextButton.setVisible(true);
					oPrevButton.setVisible(true);
					oFirstButton.setVisible(true);
					oLastButton.setVisible(true);
					break;
			}
		};
		theClass.prototype.onInitData = function () {
			var oModel = new JSONModel();
			this.getView().setModel(oModel);
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
		};
		theClass.prototype.onSave = function () {
			var model = this.getView().getModel();
			var data = model.getData();
			var json = JSON.stringify(data);
			const name = this.getTableName();
			const method = this.formMode == AddMode ? "post" : "put";
			const url = this.formMode == AddMode ? `/api/${name}` : `/api/${name}/${this.dataId}`;
			const that = this;
			jQuery.ajax({
				url: url,
				method: method,
				contentType: "application/json",
				data: json,
				success: function (data) {
					MessageToast.show("Successful");
					var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
					oRouter.navTo("detail", {
						id: data
					});
				}
			});
			//this.setFormMode(ViewMode);
		};

		theClass.prototype.onEdit = function () {
			this.setFormMode(EditMode);
		};

		theClass.prototype.onDelete = function () {
			const name = this.getTableName();
			const that = this;
			jQuery.ajax({
				url: `/api/${name}/${this.dataId}`,
				method: "delete",
				success: function (data) {
					MessageToast.show("Deleted");
					that.onCancel();
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
		theClass.prototype.onRowAdd = function (readonly) {
			const items = ViewUtils.scan(this.getView());
			console.debug(items.length);
			ViewUtils.setEditable(items, readonly);
		};
		theClass.prototype.onRowAdd = function (evt) {
			const oButton = evt.getSource();
			const oTable = oButton.getParent().getParent();
			const oModel = oTable.getModel();
			const path = oTable.getBinding().getPath();
			let data = oModel.getProperty(path);
			if (!data) {
				data = [{}];
				oModel.setProperty(path, data);
			} else {
				data.push({});
			}
			oModel.refresh(true);
		};
		theClass.prototype.onRowDelete = function (evt) {
			const oButton = evt.getSource();
			const oTable = oButton.getParent().getParent(); //.getSelectedIndex()
			const index = oTable.getSelectedIndex();
			const oModel = oTable.getModel();
			const pathTable = oTable.getBinding().getPath();
			const array = oModel.getProperty(pathTable);
			const bindContext = oTable.getRows()[index].getBindingContext();
			var object = bindContext.getObject();
			var idx = array.indexOf(object);
			if (idx >= 0) {
				array.splice(idx, 1);
			}
			oModel.refresh();
		};

		return theClass;
	}
);
