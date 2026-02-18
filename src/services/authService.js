import { auth } from "../firebaseConfig.js";
import { api } from "./api.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);

    return result.user;
}

export async function register(email, password, name) {
    const result = await api.post('/register', { email, password, name });

    return result.data;
}   
