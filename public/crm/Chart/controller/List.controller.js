sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		'sap/viz/ui5/format/ChartFormatter',
	],
	function (Controller, MessageToast, Fragment, JSONModel, ChartFormatter) {
		"use strict";

		var theClass = Controller.extend("sap.nsme.crm.Chart.controller.List", {});
		theClass.prototype.onExit = function (evt) {
			//var oPopOver = this.getView().byId("idPopOver");
			//oPopOver.destroy();

		};
		theClass.prototype.onInit = function (evt) {
			var formatPattern = ChartFormatter.DefaultPattern;
			var oVizFrame = this.getView().byId("idVizFrame");
			/*oVizFrame.setVizProperties({
				plotArea: {
					dataLabel: {
						formatString: formatPattern.SHORTFLOAT_MFD2,
						visible: true
					}
				},
				valueAxis: {
					label: {
						formatString: formatPattern.SHORTFLOAT
					},
					title: {
						visible: false
					}
				},
				categoryAxis: {
					title: {
						visible: false
					}
				},
				title: {
					visible: false,
					text: "Revenue by City and Store Name"
				}
			});*/
			var dataModel = new JSONModel("/web/crm/Chart/data.json");
			oVizFrame.setModel(dataModel);
		};
		theClass.prototype.onChartType = function(evt, type) {
			var visFrame = this.getView().byId("idVizFrame");
			visFrame.setVizType(type);
			//visFrame.rerender();

			//console.debug(evt);
			//console.debug(type);

		};

		return theClass;
	}
);
