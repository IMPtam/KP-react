import React from "react";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import { Route } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/HOC/appLoader";

const App = () => {
    return (
        <div>
            <AppLoader>
                <NavBar />
                <ProtectedRoute
                    path="/users/:postId?/:edit?"
                    component={Users}
                />
                <Route path="/login/:type?" component={Login} />
                <Route path="/logout" component={LogOut} />
                <Route exact path="/" component={Main} />
            </AppLoader>
            <ToastContainer />
        </div>
    );
};

export default App;
