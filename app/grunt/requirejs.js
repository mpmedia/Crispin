/**
 * REQUIRE JS CONFIGURATION, BUILT DYNAMICALLY.
 * Alter the rjsModules object map to include new platform and page modules in the build process
 */

var pages = [
	'index'
];

var rjsConfig = {};

rjsConfig.main = {
	options: {
		mainConfigFile: 'www/assets/js/require.config.js',
		baseUrl: 'www/assets/',
		optimize: 'uglify2',
		preserveLicenseComments: false,
		name: 'modules/main',
		out: 'www/assets/rjs/main.js'
	}
};


pages.forEach(function (page) {

	rjsConfig[page] = {
		options: {
			mainConfigFile: 'www/assets/js/require.config.js',
			baseUrl: 'www/assets/',
			optimize: 'none',
			preserveLicenseComments: false,
			skipModuleInsertion: true,
			name: 'modules/' + page,
			out: 'www/assets/rjs/' + page + '.js',
			exclude: ['modules/main']
		}
	};

});


module.exports = function (grunt) {
	grunt.config('requirejs', rjsConfig);

	grunt.loadNpmTasks('grunt-requirejs');
};

