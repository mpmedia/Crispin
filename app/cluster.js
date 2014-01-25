var cluster = require('cluster');

if (cluster.isMaster) {
	var c = require('os').cpus().length;
	while (c-- > 0) {
		cluster.fork();
	}

	cluster.on('exit', function (worker) {
		// Restart a failed worker.
		console.log('Worker ' + worker.id + ' died :(');
		cluster.fork();
	});
} else {
	require('./development.js');
}

