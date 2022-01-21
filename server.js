// Require the framework and instantiate it

// CommonJs
const fastify = require('fastify')({
  logger: true,
  trustProxy: true // needed to get ips...
});


const fs = require('fs');

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
});

fastify.post('/post', function( request, reply ) {
  
  const logItem = JSON.stringify({
    time: new Date(),
    ip: request.ips[request.ips.length - 1],
    userAgent: request.headers["user-agent"],
    body: request.body
  }, null, 2 ) + '\n\n';
  
  fs.appendFile('posts.txt', logItem, function (err) {
    if (err) throw err;
  });
  
  reply.send( logItem );
  
});

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
});