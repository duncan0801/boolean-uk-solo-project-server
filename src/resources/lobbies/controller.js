const dbClient = require("../../../UTILS/database");

async function getOne(req, res) {
	const lobbyId = req.params.id;
	try {
		const lobby = await dbClient.lobby.findUnique({
			where: { id: lobbyId },
			include: { messages: true },
			include: { users: true },
		});
		res.json(lobby);
	} catch (error) {
		res.json({ msg: error.message });
	}
}

async function getLobbiesByUserId(req, res) {
	const user = req.user;
	try {
		const userLobbies = await dbClient.lobby.findMany({
			where: {
				users: {
					some: {
						id: user.id,
					},
				},
			},
		});
		console.log(userLobbies);
		res.json(userLobbies);
	} catch (error) {
		console.error(error.message);
	}
}

async function createLobby(req, res) {
	const { lobbyId, userName, avatarURL } = req.body;

	try {
		const createLobby = await dbClient.lobby.create({
			data: {
				id: lobbyId,
				users: {
					create: {
						userName: userName,
						avatarURL: avatarURL,
					},
				},
			},
		});

		const newLobby = await dbClient.lobby.findUnique({
			where: { id: createLobby.id },
			include: { users: true },
		});

		res.json({ newLobby: newLobby });
	} catch (error) {
		res.json(error.message);
	}
}

module.exports = { getOne, createLobby, getLobbiesByUserId };
