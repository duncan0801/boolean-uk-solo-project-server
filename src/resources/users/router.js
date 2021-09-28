const {
	getAll,
	createUser,
	getUser,
	getLobbyUsers,
	addUserToLobby,
	deleteUser,
} = require("./controller");
const { protect } = require("../auth/controller");
const express = require("express");
const usersRouter = express.Router();

// usersRouter.get("/:lobbyId", getLobbyUsers);
usersRouter.get("/:id", getUser);
usersRouter.get("/", getAll);
usersRouter.post("/", addUserToLobby);
usersRouter.delete("/:userId", deleteUser);

module.exports = usersRouter;
