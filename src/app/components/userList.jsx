import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "./userPage";
import Users from "./users";

const UserList = () => {
    const params = useParams();
    const { postId } = params;
    return <>{postId ? <UserPage id={postId} /> : <Users />}</>;
};

export default UserList;
