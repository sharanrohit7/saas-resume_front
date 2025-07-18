import api from "../lib/axios"

export interface User {
    email: string
    firebaseUID: string
    photoURL: string
    authProvider: string
    country: string
}

export const signInUser= async(data: User) => {
    try {
        await api.post('/auth/signin', data, {
            headers: {}
        });
    } catch (error) {
        console.error("Error signing in user:", error);
        throw error;
        
    }
}