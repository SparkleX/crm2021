module.exports = function (config) {
	config.set({
		basePath: "public",
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
					"sap.nsme": "base/"
				}
			},
			tests: ["sap/nsme/crm/Account/test/unit/AllTests"],
			paths: {
				webapp: "./"
			}
		},
		logLevel: config.LOG_DEBUG,
		reporters: ['progress', 'coverage'],
		preprocessors: {
			'**/*.js': ['coverage']
		},
		coverageReporter: {
			type : 'html',
			dir : 'coverage/'
		},
		browsers: ["Chrome"],
		autoWatch: false,
		singleRun: true
	});
	require("karma-ui5/helper").configureIframeCoverage(config);
};
