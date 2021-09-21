export const backEndPort = 8000;

export const baseURL = "http://localhost:8000";
function handleErrors(res) {
	if (!res.ok) {
		throw Error(res.statusText);
	}
	return res.json();
}
function genericFetch(endpoint) {
	fetch(`http://localhost:8000/lobbies`)
		.then((res) => console.log(res.json()))
		.catch((error) => console.error(error));
}
function genericFetchById(endpoint, id) {
	genericFetch(`${endpoint}${id}`)
		.then(handleErrors)
		.catch((error) => console.error(error));
}
export function genericPost(endpoint, body) {
	console.log(`${baseURL}${endpoint}`);
// 	fetch(`${baseURL}${endpoint}`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(body),
// 	})
// 		.then((res) => console.log(res.json()))
// 		.then((data) => console.log("POSTED:", data))
// 		.catch((error) => {
// 			console.error(error);
// 		});
}

// module.exports = {
// 	genericFetch,
// 	genericFetchById,
// 	genericPost,
// 	backEndPort,
// };
