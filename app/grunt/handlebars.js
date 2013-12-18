
module.exports = function (grunt) {

	grunt.config('handlebars', {
		frontend: {
			options: {
				namespace: false,
				amd: true
			},
			files: [{
				expand: true,
				cwd: 'www/assets/',
				src: [
					'components/**/*.hbs.html'
				],
				dest: 'www/assets/',
				ext: '.hbs.js'
			}]
		},


		backend: {
			options: {
				namespace: false,
				commonjs: true
			},
			files: [{
				expand: true,
				cwd: 'Local/View/',
				src: [
					'**/*.hbs.html',
				],
				dest: 'Local/View/',
				ext: '.hbs.js'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-handlebars');
};
