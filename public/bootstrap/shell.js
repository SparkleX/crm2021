this.sap = this.sap || {};
sap.ushell = sap.ushell || {};

function bootstrap(fnCallback) {
	jQuery.sap.require("sap.ushell.services.Container");
	const newConfig = jQuery.getJSON({
		url: "bootstrap/config.json",
		dataType: "json",
		async: false
	}).responseJSON;
	window["sap-ushell-config"] = newConfig;
	oRendererConfig = jQuery.sap.getObject("renderers.fiori2.componentData.config", 0, window["sap-ushell-config"]);
	if (!oRendererConfig.rootIntent) {
		oRendererConfig.rootIntent = "Shell-home";
	}
	sap.ushell.bootstrap("local").done(fnCallback);
}

window["sap-ushell-config"] = {
	defaultRenderer: "fiori2",
	renderers: {
		fiori2: {
			componentData: {
				config: {
					search: "hidden"
				}
			}
		}
	},
	applications: []
};

window["sap-ui-config"] = {
	"xx-bootTask": bootstrap
};
