sap.ui.define([], function () {
	"use strict";
	var theClass = {};

	theClass.scan = function (view) {
		//console.debug(view.getId());
		let rt = [];
		/*if(view.getId()==="__input0"){
			console.debug(view.getId());	
		}*/
		//applyFunction(view);
		rt.push(view);
		//console.debug(view.getId());

		if (view instanceof sap.uxap.BlockBase) {
			var content = view._getSelectedViewContent();
			const list = this.scan(content);
			rt = rt.concat(list);
			return rt;
		}
		if (view instanceof sap.ui.layout.form.SimpleForm) {
			var content = view.getContent();
			for (let formContent of content) {
				const list = this.scan(formContent);
				rt = rt.concat(list);
			}
			return rt;
		}
		if(!view.getMetadata) {
			return [];
		}
		var aggrs = view.getMetadata().getAllAggregations();
		for (name in aggrs) {
			var c = view.getAggregation(name);
			if (c == null) {
				continue;
			}
			if (c.length == 0) {
				continue;
			}
			if (Array.isArray(c)) {
				for (let o of c) {
					const list = this.scan(o);
					rt = rt.concat(list);
				}
			} else {
				const list = this.scan(c);
				rt = rt.concat(list);
			}
		}
		return rt;
	};
	theClass.setEditable = function (items, value) {
		for(const item of items) {
			console.debug(item);
			if(item.setEditable) {
				item.setEditable(value);
			}
			if(item.getMetadata) {
				const itemClass = item.getMetadata().getName();
				switch(itemClass) {
					case "sap.m.Button": item.setVisible(value);
				}
			}
		}
	}
	return theClass;
});
