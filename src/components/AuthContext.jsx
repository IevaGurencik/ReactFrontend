import {createContext, useState, useEffect, useContext} from 'react';
import api from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const basicAuthHeader = `Basic ${btoa(`${username}:${password}`)}`;

        try {
            await api.post('/login', {}, {
                headers: {'Authorization': basicAuthHeader}
            });
            setUser({username: username});

            return {success: true};
        } catch (error) {
            return {
                success: false,
                message: error.response?.status === 401 ? 'Invalid credentials' : 'Server error'
            };
        }
    };

    const logout = async () => {
        try {
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);