import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import professionServices from "../services/professionService";
import { toast } from "react-toastify";

const ProfessionContex = React.createContext();

export const useProfession = () => {
    return useContext(ProfessionContex);
};

export const ProfessionProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getProfessionList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function getProfession(id) {
        return professions.find((prof) => prof._id === id);
    }

    async function getProfessionList() {
        try {
            const { content } = await professionServices.get();
            setProfessions(content);
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
        <ProfessionContex.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </ProfessionContex.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
