import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };
  const renderPhrase = () => {
    let x = users.length;
    console.log(x);
    if (x === 0) return "Никто с тобой не тусанет";
    if (x === 2 || x === 3 || x === 4) {
      return x + " Человекa тусанет с тобой";
    } else {
      return x + " Человек тусанет с тобой";
    }
  };
  const getBageClasses = () => {
    let classes = "fs-3 fw-bold badge ";
    classes += users.length !== 0 ? "bg-primary" : "bg-danger";
    return classes;
  };

  return (
    <>
      <span className={getBageClasses()}>{renderPhrase()}</span>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качество</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((item) => (
                    <span
                      key={item._id}
                      className={"badge m-1 bg-" + item.color}
                    >
                      {item.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
