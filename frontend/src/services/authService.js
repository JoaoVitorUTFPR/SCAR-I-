const API_URL = "http://localhost:3000";

export const fazerLogin = async (loginInfo) => {
	let res = await fetch(`${API_URL}/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(loginInfo),
	});
	let data = res.json();
	return data;
};

export const fazerRegistro = async (registroInfo) => {
	const res = await fetch(`${API_URL}/registrar`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(registroInfo),
	});

	data = res.json();
	return data;
};

export const validarToken = async () =>{
	const token = localStorage.getItem("token");
	const res = await fetch(`${API_URL}/validar-token`, {
		headers: { "Authorization": "Bearer " + token}
	});

	return res.json();

}
