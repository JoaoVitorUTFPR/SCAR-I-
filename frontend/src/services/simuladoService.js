const API_URL = "http://localhost:3000";

export const getSimulado = async () => {
	let token = localStorage.getItem("token");
	return fetch(`${API_URL}/simulado`, {
		headers: { Authorization: `Bearer ${token}` },
	}).then((res) => res.json());
};

export const getSimuladoId = async (id) => {
	let token = localStorage.getItem("token");
	return fetch(`${API_URL}/simulado/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	}).then((res) => res.json());
};
export const getInfoHome = async () => {
	let token = localStorage.getItem("token");
	return fetch(`${API_URL}/home`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => res.json());
};
export const updateALternativa = async (body) => {
	let token = localStorage.getItem("token");
	return fetch(`${API_URL}/usuario_simulado/alternativa`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	}).then((res) => res.json());
};
export const createUsuarioSimulado = async (simuladoId) => {
	let token = localStorage.getItem("token");
	return fetch(`${API_URL}/usuario_simulado/gerar/${simuladoId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => res.json());
};
export const finalizarSimulado = async (usuarioSimuladoId) => {
	let token = localStorage.getItem("token");
	return fetch(`${API_URL}/usuario_simulado/finalizar/${usuarioSimuladoId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => res.json());
};
