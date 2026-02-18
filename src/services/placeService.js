import { collection, addDoc, getDocs, getDoc, doc } from 'firebase/firestore'
import { api } from "./api.js";
import { db } from '../firebaseConfig.js';
import { log } from 'firebase/firestore/pipelines';

export async function getAll() {
    const result = await getDocs(collection(db, 'places'));

    const places = result.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return places;
}

export async function create(placeData) {
    const result = await addDoc(collection(db, 'places'), placeData);

    return { id: result.id, ...placeData };
}

export async function getById(placeId) {
    // const result = await api.get(`/places/${placeId}`);
    const result = await getDoc(doc(db, 'places', placeId));

    log('getById result', result);

    return { id: result.id, ...result.data() };
}

export async function deletePlace(placeId) {
    const result = await api.delete(`/places/${placeId}`);
    

    return result.data;
}
