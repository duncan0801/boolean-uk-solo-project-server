const dbClient = require("../../../UTILS/database");

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
async function getUser(req, res) {
	const { id } = req.body;
	console.log("req.body", id);

	try {
		const foundUser = await dbClient.foundUser.findUnique({
			where: {
				id: user.id,
			},
			include: {
				messages: true,
				lobbies: true,
			},
		});
		console.log("found user in user controller", user);
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
		console.log(error.message);
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
	const userId = Number(req.body.userId);
	const lobbyId = req.body.lobbyId;
	try {
		const userOnLobby = await dbClient.userOnLobby.create({
			data: {
				userId: userId,
				lobbyId: lobbyId,
			},
		});
        res.json(userOnLobby)
	} catch (error) {
		console.log(error);
		res.json({ msg: error.message });
	}
}

async function deleteUser(req, res) {
	const userId = Number(req.params.userId);
	try {
		const deletedUser = await dbClient.user.delete({
			where: {
				id: userId,
			},
		});
		res.json(deletedUser);
	} catch (error) {
		res.json(error.message);
		console.error(error.message);
	}
}

module.exports = {
	createUser,
	getAll,
	getUser,
	addUserToLobby,
	getLobbyUsers,
	deleteUser,
};
