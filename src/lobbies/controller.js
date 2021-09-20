const dbClient = require("../../UTILS/database");

async function getOne(req, res) {
	const lobbyId = req.params.id;
	try {
		const lobby = await dbClient.lobby.findUnique({
			where: { id: lobbyId },
		});
		res.json(lobby);
	} catch (error) {
		res.json({ msg: error.message });
	}
}

module.exports = {getOne}
