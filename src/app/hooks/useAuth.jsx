import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import userServices from "../services/userServices";
import localStorageSevice, { setToken } from "../services/localStorageService";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: { key: process.env.REACT_APP_FIREBASE_KEY }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [onlineUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();

    function logOut() {
        localStorageSevice.removeAuthData();
        setUser(null);
        history.push("/");
    }
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true
            });
            setToken(data);
            await createUser({
                _id: data.localId,
                email,
                password,
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                rate: randomInt(1, 5),
                comletedMeetings: randomInt(0, 200),
                ...rest
            });
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
        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setToken(data);
            await getUserData();
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                switch (message) {
                    case "EMAIL_NOT_FOUND":
                        throw new Error("Пароль или почта введены неккоректно");
                    case "INVALID_PASSWORD":
                        throw new Error("Пароль или почта введены неккоректно");
                    default:
                        throw new Error(
                            "Слишком много попыток входа. Попробуйте позже"
                        );
                }
            }
        }
    }
    async function modifyUser(data) {
        try {
            const { content } = await userServices.patch(data);
            console.log(content);
        } catch (error) {
            errorCather(error);
        }
    }
    async function createUser(data) {
        try {
            const { content } = await userServices.create(data);
            console.log(content);
            setUser(content);
        } catch (error) {
            errorCather(error);
        }
    }
    async function getUserData() {
        try {
            const { content } = await userServices.getOnlineUser();
            setUser(content);
        } catch (error) {
            errorCather(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (localStorageSevice.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);
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
        <AuthContext.Provider
            value={{ signUp, signIn, onlineUser, logOut, modifyUser }}
        >
            {!isLoading ? children : "Загрузка..."}
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
