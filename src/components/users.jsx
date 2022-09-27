import React, { useState } from "react";
import api from "../api";
import SearchStatus from "./searchStatus";
import User from "./user";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleBookMark = (id) => {
    const array = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
        return user;
      }
      return user;
    });
    setUsers(array);
  };
  return (
    <>
      <h2>
        <SearchStatus length={users.length} />
      </h2>

      {users.length > 0 && (
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
      )}
    </>
  );
};

export default Users;
