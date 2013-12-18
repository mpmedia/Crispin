
var qunitPort = Math.floor(Math.random()*(25000-20000+1)+20000);

module.exports = function (grunt) {

	grunt.config('qunit', {
		all: {
			options: {
				timeout: 10000,
				urls: [
					'http://localhost:' + qunitPort + '/qunit'
				]
			}
		}
	});

	grunt.config('express', {
		server: {
			options: {
				port: 8000,
				host: 'localhost',
				server: './development'
			}
		},
		qunit: {
			options: {
				port: qunitPort,
				host: 'localhost',
				server: './qunit-tester'
			}
		}
	});

	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-contrib-qunit');
};
