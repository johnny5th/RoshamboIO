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
  
  socket.on("throw", function(the_throw) {
    socket.set("throw", the_throw);
    
    var results = getResults(session.sockets);
    
    if(results != false) {
      for(var i = 0; i < 2; i++) {
        session.sockets[i].emit("result", results[i]);
      }
    }
    
  })
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

function getResults(sockets) {
  //rock beats scissors, scissors beats paper, paper beats rock
  if(sockets.length == 2) {
    
    var throw_one;
    var throw_two;
    
    sockets[0].get("throw", function (err, data) {
      throw_one = data;
    });
    
    sockets[1].get("throw", function (err, data) {
      throw_two = data;
    });
    
    
    if(throw_one != null && throw_two != null) {
    
      sockets[0].set("throw", null);
      sockets[1].set("throw", null);
    
      if(throw_one == throw_two)
        return new Array("tie", "tie");
    
      else if(throw_one == "rock" && throw_two == "scissors")
        return new Array("winner", "loser");
      
      else if(throw_one == "rock" && throw_two == "paper")
        return new Array("loser", "winner");
      
      else if(throw_one == "scissors" && throw_two == "rock")
        return new Array("loser", "winner");
      
      else if(throw_one == "scissors" && throw_two == "paper")
        return new Array("winner", "loser");
      
      else if(throw_one == "paper" && throw_two == "rock")
        return new Array("winner", "loser");
      
      else if(throw_one == "paper" && throw_two == "scissors")
        return new Array("loser", "winner");
        
      else
        return new Array("error", "error");
      
    } else {
      return false;
    }
  }
}