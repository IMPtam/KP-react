import React from "react";
// import User from "./user";
import PropTypes from "prop-types";
// import TableHeader from "./tableHeader";
// import TableBody from "./tableBody";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import Professions from "./professions";
// import { Link } from "react-router-dom";

const UserTable = ({ users, selectedSort, onBookMark, onSort, onDelete }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя"
            // component: (user) => {
            //     <Link to={`/users/${user._id}`}>{user.name}</Link>;
            // }
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        professions: {
            name: "Профессия",
            component: (user) => <Professions id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    onClick={() => onBookMark(user._id)}
                    status={user.bookmark}
                ></BookMark>
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        >
            {/* <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} /> */}
        </Table>
    );
};
UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onBookMark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};
export default UserTable;
