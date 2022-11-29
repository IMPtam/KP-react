import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../../api";
// import { useHistory, useLocation } from "react-router-dom";
import UserCard from "../../ui/UserCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ id }) => {
    const [curentUser, setCurentUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setCurentUser(data));
    }, []);

    // const history = useHistory();
    // const loc = useLocation();
    // const handlePage = () => {
    //     history.push(`${loc.pathname}/edit`);
    // };

    if (curentUser) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard curentUser={curentUser} />
                        <QualitiesCard data={curentUser.qualities} />
                        <MeetingsCard value={curentUser.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    }
    return "Загрузка...";
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
