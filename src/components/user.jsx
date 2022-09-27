import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, onDelete, onBookMark }) => {
    return (
        <>
            <tr>
                <td>{user.name}</td>
                <td>
                    <Qualitie user={user.qualities} />
                    {/* {user.qualities.map((item) => (
                        <span
                            className={"badge m-1 bg-" + item.color}
                            key={item._id}
                        >
                            {item.name}
                        </span>
                    ))} */}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate} /5</td>
                <td>
                    <BookMark onBookMark={onBookMark} user={user}></BookMark>
                </td>
                <td>
                    <button
                        onClick={() => onDelete(user._id)}
                        className="btn btn-danger"
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};
User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookMark: PropTypes.func.isRequired
};
export default User;
