const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const fs = require('fs');
const Event = require('./classes/event')(io);

app.listen(process.env.npm_package_config_port || 9001);

function handler (req, res) {

  // Client connection
  if (req.method === 'GET') {
    fs.readFile(__dirname + '/index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });
  }

  // POST new events to server
  else if (req.method === 'POST' && req.url === '/event') {
    
    let body = [];

    req.on('data', chunk => {
      body.push(chunk);
    }).on('end', () => {
      try {
        body = Buffer.concat(body).toString();
        body = JSON.parse(body);

        const e = Event(body.to, body.payload);
        e.send();

        res.writeHead(201);
        res.end();
      } catch (e) {
        res.writeHead(500),
        res.end(e.message || e);
      }
    });
  }

  else {
    res.writeHead(404);
    res.end();
  }
}

io.on('connection', socket => {

  socket.on('join_room', room => {
    socket.join(room);
  });

});