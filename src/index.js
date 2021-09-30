require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const morgan = require("morgan");
const reactAppURL = process.env.REACT_APP_API_URL;

const { protect } = require("./resources/auth/controller");

//MIDDLEWARE
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


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

app.listen(PORT, () => {
	console.log(`\n🚀 Server is running on http://localhost:${PORT}/\n`);
});
