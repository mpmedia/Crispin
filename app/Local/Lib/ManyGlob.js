var glob = require('glob');
var _ = require('lodash');
var async = require('async');

module.exports = function manyGlob(patterns, options, callback) {

	var result = [];
	async.eachSeries(_.flatten(patterns), function (pattern, next) {
		// If the first character is ! it should be omitted
		var exclusion = pattern.indexOf('!') === 0;
		// If the pattern is an exclusion, remove the !
		if (exclusion) { pattern = pattern.slice(1); }
		// Find all matching files for this pattern.
		glob(pattern, options || {}, function (err, matches) {
			if (exclusion) {
				// If an exclusion, remove matching files.
				result = _.difference(result, matches);
			} else {
				// Otherwise add matching files.
				result = _.union(result, matches);
			}
			next();
		});
	}, function () {
		callback(result);
	});

};
