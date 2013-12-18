
module.exports = function (grunt) {

	grunt.config('lodash', {
		build: {
			// output location
			dest: 'www/assets/vendor/lodash/lodash.build.js',
			options: {
				// modifiers for prepared builds
				// backbone, legacy, modern, mobile, strict, underscore
				modifier: 'backbone',
				exports: ['amd'],
				plus: [
					'cloneDeep',
					'createCallback',
					'curry',
					'flatten',
					'forIn',
					'forOwn',
					'forInRight',
					'forOwnRight',
					'forEachRight',
					'findIndex',
					'findKey',
					'findLast',
					'findLastIndex',
					'findLastKey',
					'isPlainObject',
					'merge',
					'parseInt',
					'partialRight',
					'pull',
					'remove',
					'transform',
					'sortBy',
					'xor'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-lodash');
};
