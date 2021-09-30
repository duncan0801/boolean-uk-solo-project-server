export const backEndPort = 8000;
const backendURL = process.env.REACT_APP_BACKEND_API_URL

function handleErrors(res) {
	if (!res.ok) {
		throw Error(res.statusText);
	}
	return res.json();
}
function genericFetch(endpoint) {
	fetch(`${backendURL}/lobbies`)
		.then((res) => res.json())
		.catch((error) => console.error(error));
}
function genericFetchById(endpoint, id) {
	genericFetch(`${endpoint}${id}`)
		.then(handleErrors)
		.catch((error) => console.error(error));
}
export function genericPost(endpoint, body) {
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
