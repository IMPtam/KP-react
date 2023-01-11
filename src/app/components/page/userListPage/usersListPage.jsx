import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import { paginate } from "../../../../utils/pagination";
import GroupList from "../../common/groupList";
import UserTable from "../../ui/userTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUser";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
    getProfessionLoadingStatus,
    getProffesions
} from "../../../store/proffesions";

const UsersListPage = () => {
    const [currentPage, SetCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const professionLoading = useSelector(getProfessionLoadingStatus());
    const professions = useSelector(getProffesions());
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({
        iter: "name",
        order: "asc"
    });
    const { users } = useUser();
    const { onlineUser } = useAuth();
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
    function filterUsers(data) {
        const filteredUsers = selectedProf
            ? data.filter(
                  (user) =>
                      JSON.stringify(user.professions) ===
                      JSON.stringify(selectedProf)
              )
            : search
            ? data.filter((user) => user.name.includes(search) === true)
            : data;
        return filteredUsers.filter((u) => u._id !== onlineUser._id);
    }
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {professions && !professionLoading && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
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
};

export default UsersListPage;
