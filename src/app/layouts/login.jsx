import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <>
                            <h2 className="mb-4">Регистрация</h2>
                            <RegisterForm />
                            <p>
                                Вы зарегистрированы?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    Войти в аккаунт
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="mb-4">Авторизация</h2>
                            <LoginForm />
                            <p>
                                У Вас нет аккаунта?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    Зарегистрироваться
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
