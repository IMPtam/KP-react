import React, { useState, useEffect } from "react";
import api from "../api";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import User from "./user";
import { paginate } from "../utils/pagination";
import GroupList from "./groupList";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const [currentPage, SetCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
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

    const pageSize = 2;
    useEffect(() => {
        console.log("Запрос на фейковый api");
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        SetCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession === selectedProf)
        : users;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {profession && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={profession}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-danger mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}

            <div className="d-flex flex-column">
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
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemCount={count}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Users;
