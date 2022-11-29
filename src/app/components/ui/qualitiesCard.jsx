import React from "react";
import PropTypes from "prop-types";
const QualitiesCard = ({ data }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">Качества</h5>
                <p className="card-text">
                    {" "}
                    {data.map((item) => (
                        <span
                            className={"badge m-1 bg-" + item.color}
                            key={item._id || item.value}
                        >
                            {item.name || item.label}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
};
QualitiesCard.propTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default QualitiesCard;
