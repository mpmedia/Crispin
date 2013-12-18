
module.exports = function (grunt) {

	grunt.config('jshint', {
		options: {
			jshintrc: '.jshintrc'
		},
		all: [
			'Gruntfile.js',
			'Local/**/*.js', //all JS code inside Local

			'www/assets/components/**/*.js',

			'www/assets/js/**/*.js',
			'!www/assets/js/function.bind.js',

			'!**/*.hbs.js'  //ignore compiled handlebars templates
		]
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};
