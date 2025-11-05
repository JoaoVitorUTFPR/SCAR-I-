const API_URL = "http://localhost:3000";

export const fazerLogin = async (loginInfo) => {
	let data = {};
	fetch(`${API_URL}/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(loginInfo),
	}).then((res) => (data = res.json()));
	return data.token;
};

export const fazerRegistro = async (registroInfo) => {
	fetch(`${API_URL}/registrar`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(registroInfo),
	}).then((res) => res.json());
};
