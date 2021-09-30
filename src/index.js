require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const morgan = require("morgan");
// const { v4: uuidv4 } = require("uuid");
const reactAppURL = process.env.REACT_APP_API_URL;
// const io = require("socket.io")(http, {
// 	cors: {
// 		origin: reactAppURL,
// 		methods: ["GET", "OPTIONS", "POST"],
// 	},
// });
// const STATIC_CHANNELS = ["global_notifications", "global_chat"];
const { protect } = require("./resources/auth/controller");

//MIDDLEWARE
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// io.on("connection", (socket) => {
// 	console.log("SOCKET_ID:", socket.id);
// 	socket.on("join-room", (lobbyId, userId) => {
// 		console.log(roomId, userId);
// 	});
// 	// socket.on("test", (string, number, functions) => {
// 	// 	console.log(string, number, functions);
// 	// 	io.emit("received-test", "TEST WORKS"); //SENDS TO ALL CLIENTS
// 	//     socket.broadcast.emit("received-test", "BRoadcast WOrks") //SEND TO EVERYONE EXCEPT THE CLIENT THAT EMIT THE MESSAGE
// 	// });
// 	console.log("new client connected");
// 	socket.on("join-lobby", (lobbyId) => {
// 		console.log(lobbyId);
// 	});
// });

// app.get("/lobby", (req, res) => {
// 	res.redirect(`lobby/${uuidv4()}`);
// });

// app.get("lobby/:lobbyId", (req, res) => {
// 	res.render("room", { roomId: req.params.room });
// });

const usersRouter = require("./resources/users/router");
const lobbiesRouter = require("./resources/lobbies/router");
const messagesRouter = require("./resources/messages/router");
const authRouter = require("./resources/auth/router");

app.use("/users", usersRouter);
app.use("/lobbies", lobbiesRouter);
app.use("/messages", messagesRouter);
app.use("/", authRouter);

http.listen(PORT, () => {
	console.log(`\n🚀 Server is running on http://localhost:${PORT}/\n`);
});
