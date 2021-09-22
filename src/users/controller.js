const dbClient = require("../../UTILS/database");

async function getLobbyUsers(req, res) {
	const lobbyId = req.params.lobbyId;
	try {
		const user = await dbClient.lobby.findMany({
			where: { id: lobbyId },
		});
		res.json(user);
	} catch (error) {
		res.json({ msg: error.message });
	}
}
async function getAll(req, res) {
	try {
		const users = await dbClient.user.findMany();
		res.json(users);
	} catch (error) {
		res.json({ msg: error.message });
	}
}

async function createUser(req, res) {
	const { userName } = req.body;
	try {
		const newUser = await dbClient.user.create({
			data: { userName: userName },
		});
	} catch (error) {
		res.json({ msg: error.message });
	}
}

async function addUserToLobby(req, res) {
	const { userName, lobbyId } = req.body;
	if (lobbyId) {
		try {
			const newUser = await dbClient.user.create({
				data: {
					userName: userName,
					lobby: {
						connect: {
							id: lobbyId,
						},
					},
				},
			});
			res.json(newUser);
		} catch (error) {
			console.log(error.message);
			res.json({ msg: error.message });
		}
	} else {
		try {
			const newUser = await dbClient.user.create({
				data: { userName: userName },
			});
			res.json(newUser);
		} catch (error) {
			res.json({ msg: error.message });
		}
	}
}

module.exports = { createUser, getAll, addUserToLobby, getLobbyUsers };
