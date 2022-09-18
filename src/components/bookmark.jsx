import React from "react";

const BookMark = () => {
  const onBookMark = () => {};
  const toogleIcon = "bi bi-circle m-1";
  return (
    <td>
      <button className={toogleIcon} onClick={onBookMark}></button>
    </td>
  );
};
export default BookMark;
