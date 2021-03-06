/*
 * RequireJS config file
 */

require.config({
	baseUrl: '/assets/',
	locale: 'en-us',
	waitSeconds: 10,
	paths: {

		'jquery'                        : 'vendor/jquery/jquery',
		'select2'                       : 'vendor/select2/select2',
		'lodash'                        : 'vendor/lodash/lodash.build',
		'underscore'                    : 'vendor/lodash/lodash.build',
		'backbone'                      : 'vendor/backbone-amd/backbone',
		'modernizr'                     : 'vendor/modernizr/modernizr',
		'moment'                        : 'vendor/moment/moment',
		'bootstrap'                     : 'vendor/bootstrap/dist/js/bootstrap',
		'async'                         : 'vendor/async/lib/async',
		'when'                          : 'vendor/when/when',
		'handlebars'                    : 'vendor/handlebars/handlebars',
		'pinvault-observer'             : 'vendor/pinvault-observer/pinvault-observer',
		'pinvault'                      : 'vendor/pinvault/pinvault',

		'events'                        : 'js/events'

	},
	map: {
		'*': {
			underscore: 'lodash',
			jQuery: 'jquery',
			Handlebars: 'handlebars'
		}
	},
	deps: [],
	shim: {
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		handlebars: {
			exports: 'Handlebars'
		},
		bootstrap: {
			deps: ['jquery']
		}
	}
});

