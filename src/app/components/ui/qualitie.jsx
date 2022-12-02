import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../hooks/useQualities";

const Qualitie = ({ id }) => {
    const { isLoading, getQualities } = useQualities();
    const quality = getQualities(id);
    if (!isLoading) {
        return quality.map((item) => (
            <span className={"badge m-1 bg-" + item.color} key={item._id}>
                {item.name}
            </span>
        ));
    } else {
        return "Загружаем профессии";
    }
};
Qualitie.propTypes = {
    id: PropTypes.array
};
export default Qualitie;
