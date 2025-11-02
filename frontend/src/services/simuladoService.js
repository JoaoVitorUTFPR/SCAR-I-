const API_URL = "http://localhost:3000";

export const getSimulado = () =>
  fetch(`${API_URL}/simulado`).then((res) => res.json());

export const getSimuladoId = (id) =>
  fetch(`${API_URL}/simulado/${id}`).then((res) => res.json());

export const getInfoHome = (id) =>
  fetch(`${API_URL}/home/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());

export const updateALternativa = (body) =>
  fetch(`${API_URL}/usuario_simulado/alternativa`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export const createUsuarioSimulado = (usuarioId,simuladoId) =>
  fetch(`${API_URL}/usuario_simulado/${usuarioId}/${simuladoId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());


