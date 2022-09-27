import React from "react";

const getClasses = (user) => {
  let status = "bi bi-bookmark m-1";
  if (user.bookmark !== false) {
    return (status = "bi bi-bookmark-check-fill m-1");
  }
  return status;
};
const BookMark = ({ onBookMark, user }) => {
  return (
    <button
      onClick={() => onBookMark(user._id)}
      className={getClasses(user)}
    ></button>
  );
};
export default BookMark;
