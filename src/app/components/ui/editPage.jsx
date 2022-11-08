import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import PropTypes from "prop-types";
import api from "../../../api";
import SelectField from "../common/form/selectField";
import MultySelectField from "../common/form/multySelectField";
// import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import RadioField from "../common/form/radioField";

const EditPage = ({ id }) => {
    const [data, setData] = useState();
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});

    useEffect(() => {
        api.users.getById(id).then((data) => setData(data));
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const history = useHistory();

    const handleSubmit = (e) => {
        console.log(e);
        api.users.update(id, data).then((data) => setData(data));
        e.preventDefault();
        history.push(`/users/${id}`);

        // const isValid = validate();
        // if (!isValid) return;
    };
    if (data) {
        return (
            <form onSubmit={handleSubmit}>
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 shadow p-4">
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                // error={errors.email}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                // error={errors.email}
                            />
                            <SelectField
                                label="Выберите Вашу профессию"
                                value={data.professions}
                                name="professions"
                                onChange={handleChange}
                                defaultOption="...Выберите"
                                options={professions}
                                // error={errors.profession}
                            />
                            <RadioField
                                label="Выберите свой пол"
                                options={[
                                    { name: "Мужчина", value: "male" },
                                    { name: "Женщина", value: "female" },
                                    { name: "Другой", value: "Other" }
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
                                label="Выберите Ваши качества "
                            />
                            <button
                                type="submit"
                                // disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
    return "Загрузка...";
};
EditPage.propTypes = {
    id: PropTypes.string
};

export default EditPage;
