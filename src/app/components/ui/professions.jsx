import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import {
    getProfessionByIds,
    getProfessionLoadingStatus
} from "../../store/proffesions";

const Professions = ({ id }) => {
    const isLoading = useSelector(getProfessionLoadingStatus());

    const prof = useSelector(getProfessionByIds(id));
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else {
        return "Загружаем профессии";
    }
};

Professions.propTypes = {
    id: PropTypes.string
};
export default Professions;
