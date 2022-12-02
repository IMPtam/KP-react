import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import userServices from "../services/userServices";

import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};
const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
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
    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }
    return (
        <UserContext.Provider value={{ users }}>
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
