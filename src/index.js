require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = 8000;
const cors = require("cors");
const morgan = require("morgan");
const io = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "OPTIONS", "POST"],
	},
});

//MIDDLEWARE
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

io.on("connection", (socket) => {
	console.log("new client connected");
	socket.emit("connection", null);
});

http.listen(PORT, () => {
	console.log(`\n🚀 Server is running on http://localhost:${PORT}/\n`);
});
