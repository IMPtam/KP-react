import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UserTable = ({ users, handleDelete, handleBookMark, onSort }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => onSort("name")} scope="col">
                        Имя
                    </th>
                    <th scope="col">Качества</th>
                    <th onClick={() => onSort("profession.name")} scope="col">
                        Профессия
                    </th>
                    <th onClick={() => onSort("completedMeetings")} scope="col">
                        Встретился, раз
                    </th>
                    <th onClick={() => onSort("rate")} scope="col">
                        Оценка
                    </th>
                    <th onClick={() => onSort("bookmark")} scope="col">
                        Избранное
                    </th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <User
                        key={user._id}
                        user={user}
                        onDelete={handleDelete}
                        onBookMark={handleBookMark}
                    />
                ))}
            </tbody>
        </table>
    );
};
UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleBookMark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
};
export default UserTable;
