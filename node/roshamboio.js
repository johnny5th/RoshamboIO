var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(5000);

function handler (req, res) {
    res.writeHead(200);
    res.end(data);
}

io.sockets.on('connection', function (socket) {
  socket.send("Connected, waiting for game.");
  var session = addToSession(socket);
  console.log(session);
});


var sessions = [];

function addToSession(socket) {
  if(sessions.length == 0) {
    var session = {socket: socket, status: "waiting"};
    sessions.push(session);
  }
  
  return session;
}