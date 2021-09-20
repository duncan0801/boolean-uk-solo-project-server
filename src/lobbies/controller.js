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

async function createLobby(req, res) {
	const { lobbyId, userName } = req.body;

	try {
		const newLobby = await dbClient.lobby.create({
			data: {
				id: lobbyId,
				users: {
					create: {
						userName: userName,
					},
				},
			},
		});
		res.json({ newLobby: newLobby });
	} catch (error) {
		res.json(error.message);
	}
}

module.exports = { getOne, createLobby };
