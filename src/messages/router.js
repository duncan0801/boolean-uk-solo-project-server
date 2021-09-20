const { getOne } = require("./controller");
const express = require("express");
const messagesRouter = express.Router();

messagesRouter.get("/:id", getOne);

module.exports =  messagesRouter;
