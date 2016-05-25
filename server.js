// Run this server with: node server.js

var //filename = "../example.json",
    port     = 8080,
    wsserv   = require('ws').Server,
    wss      = new wsserv({port: port}),
    fs       = require('fs')//,
//    ee       = require('event-emitter'),
//    emitter  = ee({}), listener;

var sys = require('util')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout) }

/*
// Watch the file, emit 'file-changed' event on change.
// Contents might not have changed. Could just be time.
// TODO Check for content difference
var watcher = fs.watch(filename, function (event, filename) {
  if (event == 'change') {
    emitter.emit('file-changed', filename);
  }
});
*/

console.log('Starting photobooth server');

// Event handler for when the server recieves a connection
wss.on('connection', function connection(ws) {
  // Log all incoming messages to the console.
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    if (message == "Take Photo")
        take_photo();
  });

  // When a client connects, log to console
  ws.on('open', function () {
    console.log("New client");
  });

  // When a client leaves, log to console.
  ws.on('close', function () {
    console.log("Client left.");
  });

  var take_photo = function() {
    exec('imagesnap -d "Logitech Camera #2" ut_recp_' + Date.now().toString() + ".jpg", puts);
  }

/*
  // Read the file and send its contents to all clients
  var rf = function() {
    fs.readFile(filename, 'utf8', function(err, data) {
      if (err) throw err;
      ws.send(data, function ack(error) {
        if (error) console.log(error);
      });
    });
  }

  // Send the current contents on a new connection
  rf();

  // Listens for the 'file-changed' event. Reads file and sends to clients.
  emitter.on('file-changed', function(filename) {
    rf();
  })
*/
  
});
