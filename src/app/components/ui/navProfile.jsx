import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOnlineUserData } from "../../store/users";
const NavProfile = () => {
    const onlineUser = useSelector(getOnlineUserData());
    const [isOpen, setOpen] = useState();
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    if (!onlineUser) return "Загрузка Профиля...";
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{onlineUser.name}</div>
                <img
                    src={onlineUser.image}
                    alt=""
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link to={`/users/${onlineUser._id}`} className="dropdown-item">
                    Profile
                </Link>
                <Link to="/logout" className="dropdown-item">
                    Выйти
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
