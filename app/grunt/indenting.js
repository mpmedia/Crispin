/*
 * grunt-indenting
 * https://github.com/ChiperSoft/grunt-indenting
 *
 * Copyright (c) 2013 Jarvis Badgley
 * Licensed under the MIT license.
 */

function stringifyLineNumbers(lines) {
	// first run through the list of lines and reduce sequential matches to tuples
	var lastTuple;
	lines = lines.map(function (lineNum) {
		var previous = lastTuple && lastTuple[1];
		if (previous && previous+1 === lineNum) {
			lastTuple[1] = lineNum;
			return undefined;
		} else {
			lastTuple = [lineNum, lineNum];
			return lastTuple;
		}
	}).filter(function (input) {return input !== undefined;});

	//now convert the tuples to strings
	lines = lines.map(function (tuple) {
		return (tuple[0] === tuple[1]) ? tuple[0] : tuple[0]+' - '+tuple[1];
	});

	//turn into a string list
	lines = lines.join(', ');

	return lines;
}

module.exports = function(grunt) {


	grunt.config('indenting', {
		components: {
			src: ['www/assets/css/components.css'],
			options: {
				csslintrc: '.csslintrc'
			}
		}
	});

	grunt.registerMultiTask('indenting', 'Grunt process to verify indentation type for source files.', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			indent: '\t',
			showConcern: false,
			failInvalid: false
		});

		var indent = options.indent;
		var isSpaces = (indent[0] === ' ');
		var isTabs = !isSpaces;
		var totalInvalid = 0;

		// Iterate over all specified file groups.
		this.files.forEach(function(file) {
			var fileLinesInvalid = [];
			var fileLinesConcerned = [];

			//load the source for the file
			file.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).forEach(function(filepath) {
				// Read file source.
				var src = grunt.file.read(filepath);

				//find all indentation for every line
				var lines = String(src).match(/^\s*|\n$/gm);

				//filter out any newlines
				lines = lines.map(function (input) {return input.replace(/\n/g, '');});

				// grunt.log.writeln(JSON.stringify(lines, null, 2));

				lines.forEach(function (line, lineNum) {
					if (!line) {
						return; //empty line, nothing to test
					}

					var concerned = false;
					var split = line.split(indent);
					var count = split.length;
					var first = split[0];
					var last  = count > 1 && split[count - 1];
					var lastIsSpaces = last && !last.replace(/ /g, '');

					do {
						//if the first chunk ever contains anything, the line is improperly indented
						//unless it's just a single space and we're looking for tabs, then it could be a docblock :-S
						if (first) {
							if (isTabs && first === ' ') {
								split.shift();
							} else {
								break;
							}
						}

						//if the last chunk contains anything, we can remove it if we are either searching for tabs
						//or it doesn't contain anything but spaces.  If we are searching for spaces and it does contain
						//spaces, then we might want to indicate our concern that the line is incorrectly indented
						if (last) {
							if (isTabs) {
								split.pop();
							} else if (isSpaces && lastIsSpaces) {
								concerned = true;
								split.pop();
							}
						}

						//join the chunks back together again without a delimiter
						//if the result isn't empty, we have mixed indentation.
						if (split.join('')) {
							break;
						}

						if (concerned) {
							fileLinesConcerned.push(lineNum+1);
						}

						return;
					} while (false);

					fileLinesInvalid.push(lineNum+1);

				});

				if (options.showConcern && fileLinesConcerned.length) {
					grunt.log.error('Might Be Incorrect (' + (isTabs ? 'Tabs): ' : indent.length + ' Spaces): ') + filepath.blue + ' Line: ' + stringifyLineNumbers(fileLinesConcerned).blue );
				}
				if (fileLinesInvalid.length) {
					totalInvalid += fileLinesInvalid.length;
					grunt.log.error('Should Be Indented Using ' + (isTabs ? 'Tabs: ' : indent.length + ' Spaces: ') + filepath.red + ' Line: ' + stringifyLineNumbers(fileLinesInvalid).yellow );
				}
			});

		});

		if (options.failInvalid && totalInvalid > 0) {
			return false;
		}
	});

};

