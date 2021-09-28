const { createToken, verifyToken } = require("../../../UTILS/authentication");
const bcrypt = require("bcrypt");
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
		const securePassword = await bcrypt.hash(password, 8);

		const user = await dbClient.user.create({
			data: {
				username: username,
				password: securePassword,
				avatarURL: avatarURL,
			},
			select: {
				id: true,
				avatarURL: true,
			},
		});
		const token = createToken(user);
		console.log(user);
		res.status(201).json({ token });
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
	const { username, password } = req.body;

	try {
		const foundUser = await dbClient.user.findUnique({
			where: {
				username: username,
			},
			select: {
				id: true,
				avatarURL: true,
				password: true,
			},
		});
		console.log("foundUser ", foundUser);
		if (!foundUser) {
			res.status(401).json({ error: "Authentication failed" });
			console.error("Authentication failed");
		}

		const match = await bcrypt.compare(password, foundUser.password);
		console.log("match ", match);

		if (match) {
			const userToTokenize = {
				...foundUser,
			};
			delete userToTokenize.password;
			console.log("user", userToTokenize);

			const token = createToken(userToTokenize);
			console.log("Found user from auth & token", foundUser, token);
			res.status(201).json(token);
		} else {
			res.status(401).json({ error: "Authentication failed" });
			console.error("Authentication failed");
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
}
async function protect(req, res, next) {
	const bearer = req.headers.authorization;
	console.log("bearer", bearer);

	if (!bearer || !bearer.startsWith("Bearer ")) {
		return res.status(401).end();
	}

	const token = bearer.split("Bearer ")[1].trim();

	let payload = null;

	try {
		payload = await verifyToken(token);
	} catch (error) {
		console.error({ error });
		return res.status(401).end();
	}

	console.log("Inside protect: ", { bearer, payload });

	const user = await dbClient.user.findUnique({
		where: {
			id: payload.id,
		},
		select: {
			id: true,
			avatarURL: true,
		},
	});

	if (!user) {
		return res.status(401).end();
	}

	req.user = user;
	next();
}

module.exports = { signup, login, protect };
