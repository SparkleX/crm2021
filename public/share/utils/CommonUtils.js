sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
	"use strict";
	var theClass = {};
	theClass.asyncCall = function (that, callback) {
		const promise = callback.apply(that);
		promise
			.then(function (evt) {
				console.info(evt);
			})
			.catch(function (evt) {
				const text = `${evt.responseJSON.message}\r\n\n${evt.responseJSON.stack}`;
				MessageBox.error(text);
			});
	};
	return theClass;
});
