(function () {

	function addHelpers (Handlebars) {
		var helpers = {
			ifAll: function () {
				var args = Array.prototype.slice.call(arguments);
				var opts = args.pop();
				var i = 0, isTrue;
				while (i < args.length && (isTrue = !args[i++])) {}

				return isTrue ? opts.fn(this) : opts.inverse(this);
			},

			ifAny: function () {
				var args = Array.prototype.slice.call(arguments);
				var opts = args.pop();
				var i = 0, isTrue = args[i];
				while (++i < args.length && isTrue) {
					isTrue = isTrue && args[i];
				}
				return isTrue ? opts.fn(this) : opts.inverse(this);
			},

			ifCond: function (v1, operator, v2, opts) {
				var isTrue = false;
				switch (operator) {
				case '===':
					isTrue = v1 === v2;
					break;
				case '!==':
					isTrue = v1 !== v2;
					break;
				case '<':
					isTrue = v1 < v2;
					break;
				case '<=':
					isTrue = v1 <= v2;
					break;
				case '>':
					isTrue = v1 > v2;
					break;
				case '>=':
					isTrue = v1 >= v2;
					break;
				case '||':
					isTrue = v1 || v2;
					break;
				case '&&':
					isTrue = v1 && v2;
					break;
				}
				return isTrue ? opts.fn(this) : opts.inverse(this);
			},

			extend: function (partial, options) {
				var context = Object.create(this);
				var template = Handlebars.partials[partial];

				// Partial template required
				if (typeof template === 'undefined') {
					throw new Error('Missing layout partial: "' + partial + '"');
				}

				// Parse blocks and discard output
				options.fn(context);

				if (typeof template === 'string') {
					template = Handlebars.compile(template);
				}

				// Render final layout partial with revised blocks
				return template(context);
			},

			append: function (block, options) {
				this.blocks = this.blocks || {};

				this.blocks[block] = {
					should: 'append',
					fn: options.fn
				};
			},

			prepend: function (block, options) {
				this.blocks = this.blocks || {};

				this.blocks[block] = {
					should: 'prepend',
					fn: options.fn
				};
			},

			replace: function (block, options) {
				this.blocks = this.blocks || {};

				this.blocks[block] = {
					should: 'replace',
					fn: options.fn
				};
			},

			block: function (name, options) {
				var block = null;

				this.blocks = this.blocks || {};
				block = this.blocks[name];

				switch (block && block.fn && block.should) {
				case 'append':
					return options.fn(this) + block.fn(this);

				case 'prepend':
					return block.fn(this) + options.fn(this);

				case 'replace':
					return block.fn(this);

				default:
					return options.fn(this);
				}
			}
		};

		Handlebars.registerHelper(helpers);
		return helpers;
	}

	if ( typeof module === 'object' && module && typeof module.exports === 'object' ) {
		//Running inside node
		module.exports = addHelpers;

	} else if ( typeof define === 'function' && define.amd ) {
		//Running inside AMD
		define(['handlebars'], addHelpers);
	}

})();

