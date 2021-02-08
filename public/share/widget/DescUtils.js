sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
	"use strict";
	var theClass = {};
	theClass.batchDescList = [];
	theClass.cache = {};
	theClass.getFromCache = function (table, id) {
		var ids = this.cache[table];
		if (ids == undefined) {
			return undefined;
		}
		var desc = ids[id];
		return desc;
	};
	theClass.putToCache = function (table, id, desc) {
		var ids = this.cache[table];
		if (ids == undefined) {
			this.cache[table] = {};
		}
		this.cache[table][id] = desc;
	};

	theClass.getDescById = function (table, key, fnCallback) {
		if (key === undefined || key === null) {
			fnCallback("");
			return;
		}
		var desc = this.getFromCache(table, key);
		if (desc) {
			fnCallback(desc);
			return;
		}
		var data = { table: table, id: key, fn: fnCallback };
		this.batchDescList.push(data);
	};
	theClass.refresh = async function () {
		if (this.batchDescList.length == 0) {
			return;
		}
		var body = {};
		for (let node of this.batchDescList) {
			if (body[node.table] === undefined) {
				body[node.table] = {};
			}
			body[node.table][node.id] = null;
		}
		var response = await jQuery.ajax({
			url: "/api/desc",
			method: "post",
			contentType: "application/json",
			processData: false,
			data: JSON.stringify(body)
		});

		for (let node of this.batchDescList) {
			var desc = response[node.table][node.id];
			node.fn(desc);
		}
		for (var table in response) {
			var values = response[table];
			for (var id in values) {
				var desc = values[id];
				this.putToCache(table, id, desc);
			}
		}
		this.batchDescList = [];
	};

	setInterval(function () {
		theClass.refresh();
	}, 2000);

	return theClass;
});
