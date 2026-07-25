import { createContext, useContext, useEffect, useState } from "react";
import { getMyProfile } from "../services/userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(

        localStorage.getItem("token") || ""

    );

    const [loading, setLoading] = useState(true);

    const loadUser = async () => {

        try {

            const savedToken = localStorage.getItem("token");

            if (!savedToken) {

                setLoading(false);

                return;

            }

            const { data } = await getMyProfile();

            setUser(data.user);

        } catch (error) {

            console.error(error);

            localStorage.removeItem("token");

            setToken("");

            setUser(null);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadUser();

    }, []);

    const login = async (newToken) => {

        localStorage.setItem("token", newToken);

        setToken(newToken);

        await loadUser();

    };

    const logout = () => {

        localStorage.removeItem("token");

        setToken("");

        setUser(null);

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                token,

                loading,

                login,

                logout,

                loadUser,

                setUser

            }}

        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);