var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(5000);

function handler (req, res) {
    res.writeHead(200);
    res.end(data);
}

io.sockets.on('connection', function (socket) {
  socket.emit("connected");
  
  var session = addToSession(socket);
  console.log("Connected client to session");
  
  if(session.status == "ready"){
    session.sockets.forEach(function(socket) {
      socket.emit("ready");
    });
  }
  
  socket.on("throw", function(throw) {
    socket.set("throw", throw);
    
    var winner = findWinner(session.sockets);
  }
});


var sessions = [];

function addToSession(socket) {
  var session;
  
  if(sessions.length == 0) {
    session = {sockets: new Array(socket), status: "waiting"};
    sessions.push(session);
    
  } else {
    sessions.forEach(function(thesession) {
      if(thesession.sockets.length == 1) {
        thesession.sockets.push(socket);
        thesession.status = "ready";
        session = thesession;
      }
    });
    
    if(session == "") {
      session = {sockets: array(socket), status: "waiting"};
      sessions.push(session);
    }
  }
  
  return session;
}

function findWinner(sockets) {
  rock beats scissors, scissors beats paper, paper beats rock
  
  sockets[0].get("throw")
}