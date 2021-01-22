sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
	"use strict";
	var theClass = {};
	theClass.asyncCall = function (callback) {
		const promise = callback.apply();
		promise
			.then(function (evt) {
				console.info(evt);
			})
			.catch(function (evt) {
				MessageBox.error(evt);
			});
	};
	return theClass;
});
