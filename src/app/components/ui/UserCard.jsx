import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const UserCard = ({ curentUser }) => {
    const history = useHistory();
    const handlePage = () => {
        history.push(history.location.pathname + "/edit");
    };
    return (
        <div className="card mb-3">
            <div className="card-body">
                <button
                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                    onClick={() => handlePage()}
                >
                    <i className="bi bi-gear"></i>
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={`https://avatars.dicebear.com/api/avataaars/qweqwdas/${(
                            Math.random() + 1
                        )
                            .toString(36)
                            .substring(7)}.svg`}
                        className="rounded-circle"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{curentUser.name}</h4>
                        <p className="text-secondary mb-1">
                            {curentUser.profession.name}
                        </p>
                        <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            ></i>
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                            ></i>
                            <span className="ms-2">{curentUser.rate}</span>
                        </div>
                    </div>
                </div>

                <div>{`Количество встреч: ${curentUser.completedMeetings}`}</div>

                {/* <button
                    className="btn btn-info ms-2 mt-4"
                    onClick={() => handlePage()}
                >
                    Изменить
                </button>{" "} */}
            </div>
        </div>
    );
};
UserCard.propTypes = {
    curentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default UserCard;
