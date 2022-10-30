import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchUsers = ({ users, onChangeForm }) => {
    const [search, setSearch] = useState("");

    const handleSearch = ({ target }) => {
        setSearch(target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const findUsers = users.filter(
            (user) => user.name.includes(search) === true
        );
        onChangeForm(findUsers);
        console.log(findUsers);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    placeholder="Поиск..."
                    name="search"
                    onChange={handleSearch}
                    value={search}
                />
            </div>
        </form>
    );
};

SearchUsers.propTypes = {
    onChangeForm: PropTypes.func,
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    findUsers: PropTypes.object
};

export default SearchUsers;
