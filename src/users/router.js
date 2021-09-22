const {
	getAll,
	createUser,
	getLobbyUsers,
	addUserToLobby,
} = require("./controller");
const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/:lobbyId", getLobbyUsers);
usersRouter.get("/", getAll);
usersRouter.post("/", addUserToLobby);

module.exports = usersRouter;
