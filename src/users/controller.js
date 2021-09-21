const dbClient = require("../../UTILS/database");

async function getOne(req, res) {
	const userId = req.params.id;
	try {
		const user = await dbClient.lobby.findUnique({
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

module.exports = { getOne, createUser, getAll };
