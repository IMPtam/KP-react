import React from "react";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import { Route } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";

const App = () => {
    return (
        <div>
            <NavBar />
            {/* <Users /> */}
            <Route exact path="/" component={Main} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:postId?/:edit?" component={Users} />
        </div>
    );
};

export default App;
