const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const fs = require('fs');

if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});
} else {
	// Workers can share any TCP connection
	// In this case it is an HTTP server
	let connected = 0;

	http.createServer((req, res) => {
		connected++;

		res.writeHead(200);

		if (req.url === '/'){
			fs.createReadStream(__dirname + '/index.html').pipe(res);
		} else {
			res.end(`connected ${connected} times. process ${process.pid}`);
		}
	}).listen(8000);

	console.log(`Worker ${process.pid} started`);
}