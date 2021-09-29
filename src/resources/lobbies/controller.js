const dbClient = require("../../../UTILS/database");

async function getOne(req, res) {
	const lobbyId = req.params.id;
	console.log("lobbyId", lobbyId);
	try {
		const lobby = await dbClient.lobby.findUnique({
			where: { id: lobbyId },
			include: { messages: true },
			include: { users: true },
		});

		let users = [];

		for (const userOnLobby of lobby.users) {
			const user = await dbClient.user.findUnique({
				where: {
					id: userOnLobby.userId,
				},
			});
			users.push(user);
		}
		console.log("found lobby: ", { ...lobby, users: users });
		res.json({ ...lobby, users: users });
	} catch (error) {
		res.json({ msg: error.message });
	}
}

async function getLobbiesByUserId(req, res) {
	const user = req.user;

	console.log("user", user);
	try {
		const userOnLobbies = await dbClient.userOnLobby.findMany({
			where: {
				userId: user.id,
			},
		});

		let lobbies = [];

		for (const lobby of userOnLobbies) {
			const foundLobby = await dbClient.lobby.findUnique({
				where: {
					id: lobby.lobbyId,
				},
			});
			lobbies.push(foundLobby);
		}
		console.log("lobbies:", lobbies);
		res.json(lobbies);
	} catch (error) {
		console.error(error.message);
	}
}

async function createLobby(req, res) {
	const user = req.user;
	const lobbyName = req.body.lobbyName;
	const lobbyId = req.body.lobbyId;

	console.log("user: ", user);
	console.log("lobbyName: ", lobbyName);
	console.log("lobbyId: ", lobbyId);

	try {
		const createLobby = await dbClient.lobby.create({
			data: {
				id: lobbyId,
				name: lobbyName,
			},
		});

		const createdUserOnLobby = await dbClient.userOnLobby.create({
			data: {
				userId: user.id,
				lobbyId: lobbyId,
			},
		});

		// const newLobby = await dbClient.lobby.findUnique({
		// 	where: { id: createLobby.id },
		// 	include: { users: true },
		// });
		console.log("createdLobby: ", createLobby);

		res.json(createLobby);
	} catch (error) {
		console.log(error.message);
		res.json(error);
	}
}

module.exports = { getOne, createLobby, getLobbiesByUserId };
