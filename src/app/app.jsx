import React, { useEffect } from "react";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import { Route } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/proffesions";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);
    return (
        <div>
            <AuthProvider>
                <NavBar />
                {/* <Users /> */}

                <ProtectedRoute
                    path="/users/:postId?/:edit?"
                    component={Users}
                />
                <Route path="/login/:type?" component={Login} />
                <Route path="/logout" component={LogOut} />
                <Route exact path="/" component={Main} />
            </AuthProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
