const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// socket.io server
const io = new Server(server);

io.on("connection", (socket) => {
	console.log("A user connected", socket.id);

	socket.on("user-msg", (msg) => {  // take message from client
		console.log("Message received:", msg);
		io.emit("message", msg); // broadcast to all clients
	});

	socket.on("disconnect", (socket) => {
		console.log("A user disconnected",socket.id);
	});
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
	res.sendFile("./public/index.html");
});

server.listen(3000, () => {
	console.log("Server is running on port 3000");
});
