const { getOne } = require("./controller");
const express = require("express");
const lobbiesRouter = express.Router();

lobbiesRouter.get("lobby/:id", getOne);

module.exports = lobbiesRouter;
