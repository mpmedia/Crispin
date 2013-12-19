
module.exports = function (grunt) {

	grunt.config('watch', {
		css: {
			files: '**/*.less',
			tasks: ['less']
		},

		handlebars: {
			files: '**/*.hbs.html',
			tasks: ['handlebars']
		},

		express: {
			files:  [ 'Local/**/*.js' ],
			tasks:  [ 'express:server' ],
			options: {
				spawn: false // Without this option specified express won't be reloaded
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
