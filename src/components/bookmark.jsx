import React from "react";

const BookMark = ({ onBookMark, classBookMark }) => {
  return <button className={classBookMark} onClick={onBookMark}></button>;
};
export default BookMark;
