const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

function createToken(user) {
	return jwt.sign({ ...user }, jwtSecret, {
		expiresIn: "1h",
	});
}

function verifyToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, jwtSecret, (error, payload) => {
			if (error) reject(error);

			resolve(payload);
		});
	});
}

module.exports = {
	createToken,
	verifyToken,
};
