import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = () => {
    const { onlineUser } = useAuth();
    return (
        <nav className="navbar bg-light mb-2">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link
                            to="/"
                            className="nav-link active"
                            aria-current="page"
                        >
                            Main
                        </Link>
                    </li>
                    {onlineUser && (
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">
                                Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {onlineUser ? (
                        <NavProfile />
                    ) : (
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
