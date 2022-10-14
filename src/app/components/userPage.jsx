import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
    const [curentUser, setCurentUser] = useState();
    api.users.getById(id).then((data) => setCurentUser(data));
    const history = useHistory();
    const handlePage = () => {
        history.replace("/users");
    };
    if (curentUser) {
        return (
            <div className="ms-3">
                <div className="fs-1 fw-bold">{curentUser.name}</div>
                <div className="fs-2 fst-italic">
                    {`Профессия: ${curentUser.profession.name}`}
                </div>
                <div>
                    {curentUser.qualities.map((item) => (
                        <span
                            className={"badge m-1 bg-" + item.color}
                            key={item._id}
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
                <div>{`Количество встреч: ${curentUser.completedMeetings}`}</div>
                <div className="fs-2 fst-italic">{`Рейтинг: ${curentUser.rate}`}</div>
                <button
                    className="btn btn-info ms-2 mt-4"
                    onClick={() => handlePage()}
                >
                    Все пользователи
                </button>
            </div>
        );
    }
    return "Загрузка...";
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
