import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";
import EditPage from "../components/ui/editPage";
import UserProvider from "../hooks/useUser";

const Users = () => {
    const params = useParams();
    const { postId, edit } = params;
    return (
        <UserProvider>
            {postId ? (
                <>{edit ? <EditPage /> : <UserPage id={postId} />}</>
            ) : (
                <UsersListPage />
            )}
        </UserProvider>
    );
};

export default Users;
