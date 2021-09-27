const {
	getAll,
	createUser,
	getLobbyUsers,
	addUserToLobby,
    deleteUser
} = require("./controller");
const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/:lobbyId", getLobbyUsers);
usersRouter.get("/", getAll);
usersRouter.post("/", addUserToLobby);
usersRouter.delete("/:userId", deleteUser);

module.exports = usersRouter;
