import React from "react";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import { Route } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

const App = () => {
    return (
        <div>
            <AuthProvider>
                <NavBar />
                {/* <Users /> */}
                <QualityProvider>
                    <ProfessionProvider>
                        <ProtectedRoute
                            path="/users/:postId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/logout" component={LogOut} />
                        <Route exact path="/" component={Main} />
                    </ProfessionProvider>
                </QualityProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
