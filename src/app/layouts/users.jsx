import React from "react";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";
import EditPage from "../components/ui/editPage";
import { useSelector } from "react-redux";
import { getOnlineUserId } from "../store/users";
import UsersLoader from "../components/ui/HOC/usersLoader";

const Users = () => {
    const params = useParams();
    const { postId, edit } = params;
    const onlineUserId = useSelector(getOnlineUserId());

    return (
        <UsersLoader>
            {postId ? (
                edit === "edit" ? (
                    onlineUserId === postId ? (
                        <EditPage />
                    ) : (
                        <Redirect to={`/users/${onlineUserId}/edit`} />
                    )
                ) : (
                    <UserPage id={postId} />
                )
            ) : (
                <UsersListPage />
            )}
        </UsersLoader>
    );
};

export default Users;
