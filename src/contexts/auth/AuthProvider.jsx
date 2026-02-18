import { createContext, useState, useEffect } from "react";
import { authService } from "../../services/index.js";
import { onAuthStateChanged } from 'firebase/auth';
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

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthState({
                    user: {
                        id: user.uid,
                        email: user.email,
                    }
                });
            } else {
                setAuthState({ user: null });
            }
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
            const { user, accessToken } = await authService.register(email, password, name);
            setAuthState({ user, accessToken });
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
        logout: () => {
            setAuthState({
                user: null,
            });
        },
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
