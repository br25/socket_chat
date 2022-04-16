const express = require("express");
const app = express();

const http = require("http");
const expressServer = http.createServer(app);

const cors = require("cors");
app.use(cors());

const {Server} = require("socket.io");
const io = new Server(expressServer, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET","POST"],
	},
});


io.on("connection", (socket) => {
	console.log("User Connect",socket.id);

  socket.on("join_room", (data)=>{
    socket.join(data);
    console.log(`user id ${socket.id}, and Room No. ${data}`);
    let roomSize=io.sockets.adapter.rooms.get(data).size;
    io.sockets.in(data).emit("room_send", roomSize+"size on the room");
  });


  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });


	socket.on("disconnect", () => {
		console.log("User disconnect", socket.id);
	});
});



expressServer.listen(3001, () => {
		console.log(`listening 3001`);
});


