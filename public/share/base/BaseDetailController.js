sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"sap/nsme/share/utils/ViewUtils",
		"sap/nsme/share/utils/CommonUtils",
		"sap/nsme/share/utils/MetadataUtils"
	],
	function (Controller, MessageToast, Fragment, JSONModel, History, ViewUtils, CommonUtils, MetadataUtils) {
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

		var theClass = Controller.extend("sap.nsme.share.base.BaseDetailController", {
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
				var args = oEvent.getParameter("arguments");
				this.dataId = args.id;
				var oQuery = args["?query"];
				if (this.dataId === "#") {
					this.setFormMode(AddMode);
					this.onInitData(oQuery);
				} else {
					this.setFormMode(ViewMode);
					this.onLoadData(this.dataId);
				}
			}, this);

			const that = this;
			var codes = MetadataUtils.getCodeListSync();
			const oCodesModel = new JSONModel(codes);
			this.getView().setModel(oCodesModel, "codes");

		};
		theClass.prototype.setFormMode = function (value) {
			var oView = this.getView();
			var oModel = oView.getModel("form");
			var data = {
				formMode: value,
				viewMode: false,
				addMode: false,
				editMode: false
			};
			data[value] = true;
			oModel.setData(data);
			oModel.refresh();
		};
		theClass.prototype.onInitData = function (query) {
			var oView = this.getView();
			var oModel = new JSONModel();
			oView.setModel(oModel);
			var form = {
				formMode: "viewMode",
				viewMode: true,
				addMode: false,
				editMode: false
			};
			var oFormModel = new JSONModel(form);
			oView.setModel(oFormModel, "form");

			var code = {

			}
			var oCodeMode = new JSONModel(code);
			oView.setModel(oCodeMode, "code");

		};
		theClass.prototype.onLoadData = function (id) {
			const name = this.getTableName();
			var oModel = new JSONModel(`/api/${name}/${id}`);
			this.getView().setModel(oModel);
			oModel.refresh(true);
			//this.getView().invalidate();
		};

		theClass.prototype.onNext = function () {
			const oView = this.getView();
			let oModel = oView.getModel();
			const id = oModel.getData().id;
			const name = this.getTableName();
			oModel = new JSONModel(`/api/${name}/${id}/next`);
			this.getView().setModel(oModel);
			oModel.refresh(true);
		};
		theClass.prototype.onPrev = function () {
			const oView = this.getView();
			let oModel = oView.getModel();
			const id = oModel.getData().id;
			const name = this.getTableName();
			oModel = new JSONModel(`/api/${name}/${id}/prev`);
			this.getView().setModel(oModel);
			oModel.refresh(true);
		};
		theClass.prototype.onFirst = function () {
			const oView = this.getView();
			let oModel = oView.getModel();
			const id = oModel.getData().id;
			const name = this.getTableName();
			oModel = new JSONModel(`/api/${name}/first`);
			this.getView().setModel(oModel);
			oModel.refresh(true);
		};
		theClass.prototype.onLast = function () {
			const oView = this.getView();
			let oModel = oView.getModel();
			const id = oModel.getData().id;
			const name = this.getTableName();
			oModel = new JSONModel(`/api/${name}/last`);
			this.getView().setModel(oModel);
			oModel.refresh(true);
		};

		theClass.prototype.onNew = function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				id: "#"
			});
		};
		theClass.prototype.onSave = function () {
			CommonUtils.asyncCall(this, async function () {
				var model = this.getView().getModel();
				var data = model.getData();
				var json = JSON.stringify(data);
				const name = this.getTableName();
				const method = this.formMode == AddMode ? "post" : "put";
				const url = this.formMode == AddMode ? `/api/${name}` : `/api/${name}/${this.dataId}`;
				const ajaxResult = await jQuery.ajax({
					url: url,
					method: method,
					contentType: "application/json",
					data: json
				});
				const id = this.formMode == AddMode ? ajaxResult : ajaxResult.id;
				MessageToast.show("Successful");
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				if (this.formMode == EditMode) {
					this.setFormMode(ViewMode);
				} else {
					oRouter.navTo("detail", {
						id: id
					});
				}
			});
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
				oRouter.navTo("list");
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
		theClass.prototype.onDebugToJson = function (evt) {
			const oView = this.getView();
			const oModel = oView.getModel();
			const json = oModel.getData();
			console.debug(json);
			console.debug(JSON.stringify(json));
		};
		return theClass;
	}
);
