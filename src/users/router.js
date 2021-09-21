const { getOne, createUser, getAll } = require("./controller");
const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/:id", getOne);
usersRouter.get("/", getAll);
usersRouter.post("/", createUser);

module.exports = usersRouter;
