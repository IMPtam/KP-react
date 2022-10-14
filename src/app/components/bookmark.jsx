// import React from "react";
// import PropTypes from "prop-types";

// const BookMark = ({ onBookMark, user }) => {
//     return (
//         <button
//             onClick={() => onBookMark(user._id)}
//             className={
//                 "m-1 bi bi-bookmark" +
//                 (user.bookmark !== false ? "-check-fill" : "")
//             }
//         ></button>
//     );
// };
// BookMark.propTypes = {
//     onBookMark: PropTypes.func.isRequired,
//     user: PropTypes.object.isRequired
// };
// export default BookMark;
import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool
};

export default BookMark;
