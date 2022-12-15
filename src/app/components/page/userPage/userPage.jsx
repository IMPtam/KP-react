import React from "react";
import PropTypes from "prop-types";
// import api from "../../../../api";
// import { useHistory, useLocation } from "react-router-dom";
import UserCard from "../../ui/UserCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useUser } from "../../../hooks/useUser";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ id }) => {
    const { getUserById } = useUser();
    const curentUser = getUserById(id);

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
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
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
