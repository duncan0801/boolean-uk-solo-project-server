const { getOne, createLobby, getLobbiesByUserId } = require("./controller");
const { protect } = require("../auth/controller");
const express = require("express");
const lobbiesRouter = express.Router();

lobbiesRouter.get("/:id", getOne);
lobbiesRouter.get("/", protect, getLobbiesByUserId);
lobbiesRouter.post("/", createLobby);

module.exports = lobbiesRouter;
