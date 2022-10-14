import React from "react";
import NavBar from "./components/navBar";
import UserList from "./components/userList";
import { Route } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";

const App = () => {
    return (
        <div>
            <NavBar />
            {/* <Users /> */}
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/users/:postId?" component={UserList} />
        </div>
    );
};

export default App;
