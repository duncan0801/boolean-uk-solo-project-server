const { user } = require("../../../UTILS/database");
const dbClient = require("../../../UTILS/database");

async function signup(req, res) {
	//1. get body
	const { username, password, avatarURL } = req.body;
	console.log(req.body);
	//2. If there is no email or password then throw a response with an error 404 saying missing username or password
	if (!username || !password) {
		res.status(400).json({ error: "Missing email or password." });
	}

	//3. Have a try catch that will try to create a new user with the database, if not thrown an error
	try {
		const user = await dbClient.user.create({
			data: {
				username: username,
				password: password,
				avatarURL: avatarURL,
			},
		});
		console.log(user);
		res.status(201).json({ user });
	} catch (error) {
		console.log(error.message);
		console.error("[ERROR] /signup route: ", error.message);

		//4. If error.code === "P2002", throw an error saying that the user already exists, else throw an error with a res.status 500
		if (error.code === "P2002") {
			res.status(501).json({
				error: { ...error, message: "user already exists." },
			});
		} else {
			res.status(500).json({ error });
		}
	}
}
async function login(req, res) {
	// 1. Get body
	const { username, password } = req.body;
	// 2. Get the unique user with that username
	//      if no user, return an error saying there is no such user
	try {
		const foundUser = await dbClient.user.findUnique({
			where: {
				username: username,
			},
		});
		if (!foundUser) {
			res.status(401).json({ error: "Authentication failed" });
		}

		// 3. If the user is back, check the password from the body with user password, if not throw a invalid email or password error
		if (password === foundUser.password) {
			res.status(201).json({ user });
		} else {
			res.status(401).json({ error: "Authentication failed" });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
}

async function protect(req, res) {
	const userId = req.header.authorization;

	const user = await user.findUnique({
		where: {
			id: Number(userId),
		},
	});

	if (!user) {
		return res.status(401).end();
	}
	next();
}

module.exports = { signup, login, protect };
