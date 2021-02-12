sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		'sap/viz/ui5/format/ChartFormatter',
		"sap/viz/ui5/controls/common/feeds/FeedItem"
	],
	function (Controller, MessageToast, Fragment, JSONModel, ChartFormatter, FeedItem) {
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
			var oVizFrame = this.getView().byId("idVizFrame");
			oVizFrame.setVizType(type);
			oVizFrame.removeAllFeeds();
			switch(type) {
			case "pie":
				this.addFeedsPie(oVizFrame);
				break;
			case "heatmap":
				this.addFeedsHeatmap(oVizFrame);
				break;
			case "treemap":
				this.addFeedsTreemap(oVizFrame);
				break;
			case "scatter":
				this.addFeedsScatter(oVizFrame);
				break;
			case "bubble":
				this.addFeedsBubble(oVizFrame);
				break;
			default:
				this.addFeeds(oVizFrame);
			}
		};
		theClass.prototype.addFeedsBubble = function(oVizFrame) {
			var oFeedDim = new FeedItem({uid:"valueAxis", type:"Measure", values:["Cost"]});
            oVizFrame.addFeed(oFeedDim);
			var oFeedMeasure = new FeedItem({uid:"valueAxis2", type:"Measure", values: ["Revenue"]});
            oVizFrame.addFeed(oFeedMeasure);
			var oFeedMeasure = new FeedItem({uid:"bubbleWidth", type:"Measure", values: ["Revenue"]});
            oVizFrame.addFeed(oFeedMeasure);
		}
		theClass.prototype.addFeedsScatter = function(oVizFrame) {
			var oFeedDim = new FeedItem({uid:"valueAxis", type:"Measure", values:["Cost"]});
            oVizFrame.addFeed(oFeedDim);
			var oFeedMeasure = new FeedItem({uid:"valueAxis2", type:"Measure", values: ["Revenue"]});
            oVizFrame.addFeed(oFeedMeasure);
		}
		theClass.prototype.addFeedsTreemap = function(oVizFrame) {
			var oFeedDim = new FeedItem({uid:"title", type:"Dimension", values:["Store Name"]});
            oVizFrame.addFeed(oFeedDim);
			var oFeedMeasure = new FeedItem({uid:"weight", type:"Measure", values: ["Revenue"]});
            oVizFrame.addFeed(oFeedMeasure);
		}
		theClass.prototype.addFeedsHeatmap = function(oVizFrame) {
			var oFeedDim = new FeedItem({uid:"categoryAxis", type:"Dimension", values:["Store Name"]});
            oVizFrame.addFeed(oFeedDim);
			var oFeedMeasure = new FeedItem({uid:"color", type:"Measure", values: ["Revenue"]});
            oVizFrame.addFeed(oFeedMeasure);
		}
		theClass.prototype.addFeedsPie = function(oVizFrame) {
			var oFeedDim = new FeedItem({uid:"color", type:"Dimension", values:["Store Name"]});
            oVizFrame.addFeed(oFeedDim);
			var oFeedMeasure = new FeedItem({uid:"size", type:"Measure", values: ["Revenue"]});
            oVizFrame.addFeed(oFeedMeasure);
		}
		theClass.prototype.addFeeds = function(oVizFrame) {
			var oFeedDim = new FeedItem({uid:"categoryAxis", type:"Dimension", values:["Store Name"]});
            oVizFrame.addFeed(oFeedDim);
			var oFeedMeasure = new FeedItem({uid:"valueAxis", type:"Measure", values: ["Revenue","Cost"]});
            oVizFrame.addFeed(oFeedMeasure);
		}
		return theClass;
	}
);
