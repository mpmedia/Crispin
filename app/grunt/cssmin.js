
module.exports = function (grunt) {

	grunt.config('cssmin', {
		all: {
			expand: true,
			cwd: 'www/assets/css/',
			src: ['**/*.css'],
			dest: 'www/assets/css.min/'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
};
