import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import qualityServices from "../services/qualityService";
import { toast } from "react-toastify";

const QualityContex = React.createContext();
export const useQualities = () => {
    return useContext(QualityContex);
};

export const QualityProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getQualityList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    const getQuality = (id) => {
        return qualities.find((q) => q._id === id);
    };

    async function getQualityList() {
        try {
            const { content } = await qualityServices.get();
            setQualities(content);
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
        <QualityContex.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualityContex.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
