const { getOne, createUser } = require("./controller");
const express = require("express");
const usersRouter = express.Router();

usersRouter.get("lobby/:id", getOne);
usersRouter.post("/", createUser);

module.exports = usersRouter;
