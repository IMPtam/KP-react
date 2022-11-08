import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultySelectField from "../common/form/multySelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "Муж",
        qualities: [],
        license: false
    });
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
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
        },
        profession: {
            isRequied: { message: "Обязательно заполните Вашу профессию" }
        },
        license: {
            isRequied: {
                message:
                    "Вы не можете использовать наш сервис без лицензионного соглашения"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
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
            <SelectField
                label="Выберите Вашу профессию"
                value={data.professions}
                name="professions"
                onChange={handleChange}
                defaultOption="...Выберите"
                options={professions}
                error={errors.profession}
            />
            <RadioField
                label="Выберите свой пол"
                options={[
                    { name: "Мужчина", value: "Муж" },
                    { name: "Женщина", value: "Жен" },
                    { name: "Другой", value: "Другой" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
            />
            <MultySelectField
                onChange={handleChange}
                options={qualities}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите качества "
            />
            <CheckBoxField
                name="license"
                value={data.license}
                onChange={handleChange}
                error={errors.license}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>

            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
        </form>
    );
};

export default RegisterForm;
