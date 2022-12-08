import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import userServices from "../services/userServices";
import { setToken } from "../services/localStorageService";

const httpAuth = axios.create({});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [onlineUser, setUser] = useState({});
    const [error, setError] = useState(null);

    async function signUp({ email, password, ...rest }) {
        // const key = "AIzaSyCn_7GFOsPEvzusYuJY2WdabkaEoMWIHNI";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setToken(data);
            await createUser({ _id: data.localId, email, password, ...rest });
        } catch (error) {
            errorCather(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Такой пользователь существует"
                    };
                    throw errorObject;
                }
            }
        }
    }
    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setToken(data);
            console.log(data);
            getUser({ _id: data.localId });
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Неправильная почта"
                    };
                    throw errorObject;
                }
                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        password: "Неправильный пароль"
                    };
                    throw errorObject;
                }
            }
        }
    }
    async function getUser(data) {
        try {
            const { content } = userServices.get(data);
            console.log(content);
        } catch (error) {
            errorCather(error);
        }
    }
    async function createUser(data) {
        try {
            const { content } = userServices.create(data);
            setUser(content);
        } catch (error) {
            errorCather(error);
        }
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }
    return (
        <AuthContext.Provider value={{ signUp, signIn, onlineUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AuthProvider;
