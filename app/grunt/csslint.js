
module.exports = function (grunt) {

	grunt.config('csslint', {
		components: {
			src: [
				'www/assets/css/all-components.css',
				'www/assets/css/pages/**/*.css'
			],
			options: {
				csslintrc: '.csslintrc'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-csslint');
};
