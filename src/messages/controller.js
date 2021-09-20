const dbClient = require("../../UTILS/database");

async function getOne(req, res) {
	const id = req.params.id;
	try {
		const message = await dbClient.lobby.findUnique({ where: { id: id } });
		res.json(message);
	} catch (error) {
		res.json({ msg: error.message });
	}
}
module.exports = { getOne };
