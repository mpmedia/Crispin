
module.exports = function (grunt) {

	grunt.config('clean', {
		built: {
			src: [
				'**/*.hbs.js',
				'www/assets/rjs',
				'www/assets/css',
				'www/assets/css.min'
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
};
