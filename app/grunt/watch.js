
module.exports = function (grunt) {

	grunt.config('watch', {
		css: {
			files: '**/*.less',
			tasks: ['less']
		},

		handlebars: {
			files: '**/*.hbs.html',
			tasks: ['handlebars']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
