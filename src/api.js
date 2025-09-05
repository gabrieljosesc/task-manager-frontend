import axios from "axios";


const api = axios.create({
baseURL: "http://127.0.0.1:8000/api",
headers: { "Content-Type": "application/json" },
});


export async function fetchTasks() {
const { data } = await api.get("/tasks/");
return data;
}


export async function createTask(payload) {
const { data } = await api.post("/tasks/", payload);
return data;
}


export async function updateTask(id, payload) {
const { data } = await api.put(`/tasks/${id}/`, payload);
return data;
}


export async function toggleCompleted(id, completed) {
const { data } = await api.patch(`/tasks/${id}/`, { completed });
return data;
}


export async function deleteTask(id) {
await api.delete(`/tasks/${id}/`);
}