import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../store/users";

const LogOut = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logOutUser());
    }, []);
    return <h2>Загрузка...</h2>;
};

export default LogOut;
