sap.ui.define([
	"sap/ui/base/ManagedObject"
], function (ManagedObject) {
	"use strict";
	var theClass = ManagedObject.extend("sap.nsme.crm.HelpView.model.formatter", {});
	//const theClass = {};
	theClass.creditLimitUtilization = function (balance, creditLine) {
		if (!(balance && creditLine)) {
			return 0;
		}
		if (balance < 0) {
			return 0;
		}
		if (creditLine == 0) {
			return 1;
		}
		const rt = (balance / creditLine).toFixed(2);
		return rt;
	};
	theClass.creditLimitUtilizationPercentValue = function (balance, creditLine) {
		const precent = theClass.creditLimitUtilization(balance, creditLine);
		return (precent * 100).toFixed(0);
	};
	theClass.creditLimitUtilizationShowValue = function (balance, creditLine) {
		const visible = creditLine != 0;
		return visible;
	};
	theClass.creditLimitUtilizationDisplayValue = function (balance, creditLine) {
		const precent = theClass.creditLimitUtilization(balance, creditLine);
		return (precent * 100).toFixed(0) + "%";
	};
	theClass.creditLimitUtilizationState = function (balance, creditLine) {
		const precent = theClass.creditLimitUtilization(balance, creditLine);
		if (precent < 0.5) {
			return "Success";
		}
		if (precent < 0.85) {
			return "Warning";
		}
		return "Error";
	};
	//window.formatter = theClass;
	return theClass;
});
