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

async function createOne(req, res) {
	const { userName, lobbyId, content } = req.body;
	try {
		const newMessage = await dbClient.message.create({
			data: {
				user: {
					connect: {
						userName: userName,
					},
				},
				lobby: {
					connect: {
						id: lobbyId,
					},
				},
				content: content,
			},
		});
		console.log(newMessage);
		res.json(newMessage);
	} catch (error) {
		console.log(error.message);
		res.json(error.message);
	}
}

async function getByLobbyId(req, res) {
	const { lobbyId } = req.body;
	try {
		const messages = await dbClient.message.findMany({
			where: {
				lobbyId: lobbyId,
			},
		});
		console.log(messages);
		res.json(messages);
	} catch (error) {
		console.log(error.message);
		res.json(error.message);
	}
}
module.exports = { getOne, createOne, getByLobbyId };
