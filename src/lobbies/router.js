const { getOne,createLobby } = require("./controller");
const express = require("express");
const lobbiesRouter = express.Router();

lobbiesRouter.get("/:id", getOne);
lobbiesRouter.post("/", createLobby)

module.exports = lobbiesRouter;
