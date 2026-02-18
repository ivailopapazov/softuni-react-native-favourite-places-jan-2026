import { createContext, useState, useEffect } from "react";
import { authService } from "../../services/index.js";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../../firebaseConfig.js";

export const AuthContext = createContext({
    isLoading: false,
    isAuthenticated: false,
    error: null,
    user: null,
    auth: null,
    login: async (email, password) => { },
    register: async (email, password, name) => { },
    clearError: () => { },
    logout: () => { },
});

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        user: null,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthState({
                    user: {
                        id: user.uid,
                        email: user.email,
                        name: user.displayName,
                    }
                });
            } else {
                setAuthState({ user: null });
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const user = await authService.login(email, password);

            setAuthState({
                user: {
                    id: user.uid,
                    email: user.email,
                    name: user.displayName,
                }
            });
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    }
    const register = async (email, password, name) => {
        try {
            setIsLoading(true);

            const user = await authService.register(email, password, name);

            setAuthState({
                user: {
                    id: user.uid,
                    email: user.email,
                    name: user.displayName,
                }
            });
        } catch (err) {
            setError(err.message || 'An error occurred during registration');
        }
        finally {
            setIsLoading(false);
        }
    }

    const contextValue = {
        isAuthenticated: !!authState.user,
        isLoading,
        error,
        user: authState.user,
        auth: authState,
        clearError: () => setError(null),
        login,
        register,
        logout: async () => {
            try {
                await signOut(auth);

                setAuthState({
                    user: null,
                });
            } catch (err) {
                setError(err.message || 'An error occurred during logout');
            }
        },
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
