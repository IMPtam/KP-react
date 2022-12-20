import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultySelectField from "../common/form/multySelectField";
import BackHistoryButton from "../common/backButton";
import { useAuth } from "../../hooks/useAuth";
import { useProfession } from "../../hooks/useProfession";
import { useQualities } from "../../hooks/useQualities";
import { useHistory } from "react-router-dom";

const EditPage = () => {
    const history = useHistory();
    const [data, setData] = useState({});
    const { onlineUser, modifyUser } = useAuth();
    const {
        isLoading: professionLoading,
        professions,
        getProfession
    } = useProfession();
    const prof = getProfession(onlineUser.profession);
    const professionList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));
    const { isLoading: qualityLoading, qualities, getQuality } = useQualities();
    const qualityList = qualities.map((q) => ({
        value: q._id,
        label: q.name
    }));
    const [errors, setErrors] = useState({});

    const transformData = (data) => {
        const qualitiesArray = [];
        for (const qualityId of data) {
            const quality = getQuality(qualityId);
            qualitiesArray.push(quality);
        }
        data = qualitiesArray.map((q) => ({
            label: q.name,
            value: q._id
        }));
        return data;
    };

    useEffect(() => {
        if (!professionLoading && !qualityLoading) {
            setData(() => ({
                profession: prof._id,
                qualities: transformData(onlineUser.qualities),
                name: onlineUser.name,
                email: onlineUser.email,
                sex: onlineUser.sex
            }));
        }
    }, [professionLoading, qualityLoading]);

    const getQual = (qual) => {
        console.log(qual);
        return qual.map((q) => q.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { qualities } = data;
        try {
            await modifyUser({
                ...data,
                _id: onlineUser._id,
                qualities: getQual(qualities)
            });
            history.push(`/users/${onlineUser._id}`);
        } catch (error) {
            setErrors(error);
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    if (data) {
        return (
            <div className="container mt-5">
                <BackHistoryButton />
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    options={professionList}
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    label="Выберите свой пол"
                                    options={[
                                        { name: "Мужчина", value: "male" },
                                        {
                                            name: "Женщина",
                                            value: "female"
                                        },
                                        { name: "Другой", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                />
                                <MultySelectField
                                    onChange={handleChange}
                                    options={qualityList}
                                    defaultValue={data.qualities}
                                    name="qualities"
                                    label="Выберите Ваши качества "
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return "Загрузка...";
};

export default EditPage;
