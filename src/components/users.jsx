import React, { useState } from "react";
import api from "../api";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import User from "./user";
import { paginate } from "../utils/pagination";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const [currentPage, SetCurrentPage] = useState(1);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleBookMark = (id) => {
        const array = users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark;
            }
            return user;
        });
        setUsers(array);
    };
    const handlePageChange = (pageIndex) => {
        SetCurrentPage(pageIndex);
    };
    const count = users.length;
    const pageSize = 4;

    const userCrop = paginate(users, currentPage, pageSize);
    return (
        <>
            <h2>
                <SearchStatus length={count} />
            </h2>

            {count > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User
                                key={user._id}
                                user={user}
                                onDelete={handleDelete}
                                onBookMark={handleBookMark}
                            />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </>
    );
};

export default Users;
