const { getOne, createLobby, getLobbiesByUserId, deleteLobbyOnUser } = require("./controller");
const { protect } = require("../auth/controller");
const express = require("express");
const lobbiesRouter = express.Router();

lobbiesRouter.get("/:id", getOne);
lobbiesRouter.get("/", protect, getLobbiesByUserId);
lobbiesRouter.post("/", protect, createLobby);
lobbiesRouter.delete("/:lobbyId", deleteLobbyOnUser);

module.exports = lobbiesRouter;
