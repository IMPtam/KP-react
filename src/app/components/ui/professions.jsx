import PropTypes from "prop-types";
import React from "react";

import { useProfession } from "../../hooks/useProfession";

const Professions = ({ id }) => {
    const { isLoading, getProfession } = useProfession();
    const prof = getProfession(id);
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
