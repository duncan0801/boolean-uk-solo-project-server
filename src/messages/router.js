const { getOne, createOne, getByLobbyId } = require("./controller");
const express = require("express");
const messagesRouter = express.Router();

messagesRouter.get("/:id", getByLobbyId);
messagesRouter.post("/", createOne)

module.exports =  messagesRouter;
