import React, { useState, useEffect } from "react";
import api from "../api";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import { paginate } from "../utils/pagination";
import GroupList from "./groupList";
import UserTable from "./userTable";
import _ from "lodash";

const Users = () => {
    const [users, setUsers] = useState();
    const [currentPage, SetCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

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
    const handleSort = (item) => {
        if (sortBy.iter === item) {
            setSortBy((prevState) => ({
                ...prevState,
                order: prevState.order === "asc" ? "desc" : "asc"
            }));
        } else {
            setSortBy({ iter: item, order: "asc" });
        }
    };
    const handlePageChange = (pageIndex) => {
        SetCurrentPage(pageIndex);
    };

    const pageSize = 6;
    useEffect(() => {
        console.log("Запрос на фейковый api");
        api.users.fetchAll().then((data) => setUsers(data));
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        SetCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const filteredUsers = selectedProf
        ? users.filter(
              (user) =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
          )
        : users;
    const count = filteredUsers ? filteredUsers.length : 4;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
    const userCrop = sortedUsers
        ? paginate(sortedUsers, currentPage, pageSize)
        : users;
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

            {users && (
                <div className="d-flex flex-column">
                    <h2>
                        <SearchStatus length={count} />
                    </h2>
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            handleDelete={handleDelete}
                            handleBookMark={handleBookMark}
                            onSort={handleSort}
                        />
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
            )}
        </div>
    );
};

export default Users;
