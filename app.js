const express = require("express")
const cors = require("cors")
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});


app.use(cors())
app.use(express.json())

io.on('connection', (socket) => {
  console.log(socket.id)

  socket.on('message', function (message) {
    console.log(message);
    socket.broadcast.emit('message',message)
  })
  
});
server.listen(3000, () => {
  console.log(`Server listening 3000`);
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

