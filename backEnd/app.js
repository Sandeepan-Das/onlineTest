const app = require("./index");
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

//Declaring the port for connection
const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("socket Connected");
  socket.on("join-room", (roomID,userId) => {
    console.log(roomID,userId)
    socket.join(roomID);
    socket.broadcast.emit("user-connected",userId)
  });
});

//STARTING A SERVER
server.listen(port, () => {
  console.log("Server started" + port);
});

