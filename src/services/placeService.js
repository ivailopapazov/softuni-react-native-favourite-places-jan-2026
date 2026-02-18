import { collection, addDoc } from 'firebase/firestore'
import { api } from "./api.js";
import { db } from '../firebaseConfig.js';

export async function getAll() {
    const result = await api.get('/places');

    return result.data;
}

export async function create(placeData) {
    const ref = await addDoc(collection(db, 'places'), placeData);

    console.log('Document written with ID: ', ref.id);
    
    return ref;
}

export async function getById(placeId) {
    const result = await api.get(`/places/${placeId}`);

    return result.data;
}

export async function deletePlace(placeId) {
    const result = await api.delete(`/places/${placeId}`);

    return result.data;
}
