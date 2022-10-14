import React from "react";
import PropTypes from "prop-types";
const Qualitie = ({ user }) => {
    return user.map((item) => (
        <span className={"badge m-1 bg-" + item.color} key={item._id}>
            {item.name}
        </span>
    ));
};
Qualitie.propTypes = {
    user: PropTypes.array
};
export default Qualitie;
