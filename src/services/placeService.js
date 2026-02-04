import { api } from "./api.js";

export async function getAll() {
    const result = await api.get('/places');

    return result.data;
}

export async function create(placeData) {
    const result = await api.post('/places', placeData);

    return result.data;
}

export async function getById(placeId) {
    const result = await api.get(`/places/${placeId}`);

    return result.data;
}
