import { collection, addDoc, getDocs, getDoc, doc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { api } from "./api.js";
import { db, storage } from '../firebaseConfig.js';
import uuid from 'react-native-uuid';

export async function getAll() {
    const result = await getDocs(collection(db, 'places'));

    const places = result.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return places;
}

export async function create(fullPlaceData) {
    const { imageUri, ...placeData } = fullPlaceData;

    // Get file from the device
    const response = await fetch(imageUri);
    const imageBlob = await response.blob();

    // Upload the image to Firebase Storage
    const imageRef = ref(storage, `places/${uuid.v4()}.jpg`);
    await uploadBytes(imageRef, imageBlob);
    const imageUrl = await getDownloadURL(imageRef);

    const result = await addDoc(collection(db, 'places'), { ...placeData, imageUri: imageUrl });

    return { id: result.id, ...placeData, imageUri: imageUrl };
}

export async function getById(placeId) {
    // const result = await api.get(`/places/${placeId}`);
    const result = await getDoc(doc(db, 'places', placeId));

    return { id: result.id, ...result.data() };
}

export async function deletePlace(placeId) {
    const result = await api.delete(`/places/${placeId}`);


    return result.data;
}
