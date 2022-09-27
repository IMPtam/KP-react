import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({ user, onDelete, onBookMark }) => {
  return (
    <>
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((item) => (
            <span className={"badge m-1 bg-" + item.color} key={item._id}>
              {item.name}
            </span>
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate} /5</td>
        <td>
          <BookMark onBookMark={onBookMark} user={user}></BookMark>
        </td>
        <td>
          <button onClick={() => onDelete(user._id)} className="btn btn-danger">
            delete
          </button>
        </td>
      </tr>
    </>
  );
};
export default User;
