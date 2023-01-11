import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import userServices from "../services/userServices";

import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};
const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const { onlineUser } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    async function getUser() {
        try {
            const { content } = await userServices.get();
            setUsers(content);
            setIsLoading(false);
        } catch (error) {
            errorCather(error);
        }
    }
    useEffect(() => {
        if (!isLoading) {
            const newUser = [...users];
            const userIndex = newUser.findIndex(
                (el) => el._id === onlineUser._id
            );
            console.log(userIndex);
            newUser[userIndex] = onlineUser;
            setUsers(newUser);
        }
    }, [onlineUser]);
    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function getUserById(id) {
        return users.find((user) => user._id === id);
    }
    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : "Загрузка"}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default UserProvider;
