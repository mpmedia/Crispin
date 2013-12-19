
/**
 * GRUNT CONFIGURATION
 */
module.exports = function(grunt) {

	grunt.loadTasks('grunt');

	grunt.registerTask('build', [
		'handlebars',
		'less',
		'requirejs'
	]);

	grunt.registerTask('dev', [
		'build',
		'express:server',
		'watch'
	]);

	grunt.registerTask('test', [
		'express:qunit',
		'qunit'
	]);

	grunt.registerTask('launch', [
		'express:server',
		'watch'
	]);

	grunt.registerTask('lint', [
		'indenting',
		'jshint',
		'less',
		'csslint'
	]);

	grunt.registerTask('default', [
		'indenting',
		'jshint',
		'less',
		'csslint',
		'cssmin',
		'handlebars',
		'lodash',
		// 'test',
		'requirejs'
	]);

};

