
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
				cwd: 'views/',
				src: [
					'**/*.hbs.html',
				],
				dest: 'views/',
				ext: '.hbs.js'
			}]
		},

		backendComponents: {
			options: {
				namespace: false,
				commonjs: true
			},
			files: [{
				expand: true,
				cwd: 'Local/Components/',
				src: [
					'**/*.hbs.html',
				],
				dest: 'Local/Components/',
				ext: '.hbs.js'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-handlebars');
};
