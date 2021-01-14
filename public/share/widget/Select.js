sap.ui.define(["sap/m/Select"], function (Controller) {
	"use strict";
	var theClass = Controller.extend("sap.nsme.share.widget.Select", {
		metadata : {
			properties : {
				dataBind:  {type: "string", group: "Behavior"}
			}
		}
	});

	return theClass;
});
