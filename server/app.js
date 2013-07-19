var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

console.log(process.env.PORT)
app.listen(process.env.PORT)
//app.listen(1337);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var items = {}
items.playlist = [];

io.sockets.on('connection', function (socket) {
  socket.emit('full playlist', items);
  socket.on('add to playlist', function (data) {
    console.log(data);
    items.playlist.push(data);

    io.sockets.emit('full playlist', items);
  });
  socket.on('finished playing', function (data) {
    var firstItem = items.playlist.shift();
    io.sockets.emit('full playlist', items);
  });
});