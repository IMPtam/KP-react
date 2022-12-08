import React, { useState, useEffect } from "react";
import api from "../../../../api";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import { paginate } from "../../../../utils/pagination";
import GroupList from "../../common/groupList";
import UserTable from "../../ui/userTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUser";

const UsersListPage = () => {
    const [currentPage, SetCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({
        iter: "name",
        order: "asc"
    });
    const { users } = useUser();
    const handleDelete = (userId) => {
        console.log(userId);
    };
    const handleBookMark = (id) => {
        const array = users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark;
            }
            return user;
        });
        console.log(array);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handlePageChange = (pageIndex) => {
        SetCurrentPage(pageIndex);
    };

    const pageSize = 8;
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        SetCurrentPage(1);
    }, [selectedProf, search]);

    const handleSearch = ({ target }) => {
        setSelectedProf(undefined);
        setSearch(target.value);
    };
    const handleProfessionSelect = (item) => {
        if (search !== "") {
            setSearch("");
        }
        setSelectedProf(item);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : search
            ? users.filter((user) => user.name.includes(search) === true)
            : users;
        const count = filteredUsers.length;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
                        <div>
                            <input
                                type="text"
                                placeholder="Поиск..."
                                name="search"
                                onChange={handleSearch}
                                value={search}
                            />
                        </div>
                        {/* <SearchUsers
                            users={users}
                            onChangeForm={handleChangeForm}
                        /> */}
                    </h2>
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onDelete={handleDelete}
                            onBookMark={handleBookMark}
                            onSort={handleSort}
                            selectedSort={sortBy}
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
            </div>
        );
    }
    return "Загрузка...";
};

export default UsersListPage;
