import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
// import { signIn } from "./loginIn";

const LoginForm = () => {
    const { signIn } = useAuth();
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const validatorConfig = {
        email: {
            isRequied: {
                message: "Электронная почта обязательно для заполнения"
            },
            isEmail: { message: "Почтовый адрес введен некорректно" }
        },
        password: {
            isRequied: { message: " Пароль обязателен для заполнения" },
            isCapitalSymbol: {
                message: "Пароль должен содержать хоть одну заглавную букву"
            },
            isContainDigital: {
                message: "Пароль должен содержать хоть одну цифру"
            },
            minSymbol: {
                message: "Пароль должен иметь не менее 8 символов",
                value: 8
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        // for (const fieldName in data) {
        //     if (data[fieldName].trim() === "") {
        //         errors[
        //             fieldName
        //         ] = `${data[fieldName]} обязательно для заполнения`;
        //     }
        // }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await signIn(data);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Введите почту"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Введите пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                name="stayOn"
                value={data.stayOn}
                onChange={handleChange}
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
            {/* <div>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="passwor">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                />
            </div> */}
        </form>
    );
};
export default LoginForm;
