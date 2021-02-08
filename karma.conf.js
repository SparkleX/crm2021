module.exports = function (config) {
	config.set({
		basePath: "",
		frameworks: ["ui5", "qunit", "sinon"],
		ui5: {
			url: "https://sapui5.hana.ondemand.com",
			type: "application",
			mode: "script",
			config: {
				bindingSyntax: "complex",
				compatVersion: "edge",
				async: true,
				resourceRoots: {
					"sap.nsme": "base/public/"
				}
			},
			tests: ["sap/nsme/crm/Account/test/unit/AllTests"],
			paths: {
				webapp: "public"
			}
		},
		logLevel: config.LOG_DEBUG,

		browsers: ["Chrome"]
	});
};
