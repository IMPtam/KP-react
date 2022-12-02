import React from "react";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import { Route } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQualities";

const App = () => {
    return (
        <div>
            <QualityProvider>
                <ProfessionProvider>
                    <NavBar />
                    {/* <Users /> */}
                    <Route exact path="/" component={Main} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/users/:postId?/:edit?" component={Users} />
                </ProfessionProvider>
            </QualityProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
