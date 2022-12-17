import React from "react";
import { useHistory, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";
import EditPage from "../components/ui/editPage";
import UserProvider from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
    const history = useHistory();
    const params = useParams();
    const { onlineUser } = useAuth();
    const { postId, edit } = params;
    return (
        <UserProvider>
            {postId ? (
                <>
                    {edit ? (
                        onlineUser._id === postId ? (
                            <EditPage />
                        ) : (
                            history.push(`/users/${onlineUser._id}/edit`)
                        )
                    ) : (
                        <UserPage id={postId} />
                    )}
                </>
            ) : (
                <UsersListPage />
            )}
        </UserProvider>
    );
};

export default Users;
