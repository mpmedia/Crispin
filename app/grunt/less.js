
module.exports = function (grunt) {

	grunt.config('less', {
		all: {
			files: [{
				expand: true,
				cwd: 'www/less/',
				src: [
					'main.less',
					'all-components.less',
					'pages/**/*.less'
				],
				ext: '.css',
				dest: 'www/assets/css'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
};
