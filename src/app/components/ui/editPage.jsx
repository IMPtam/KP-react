import React, { useState, useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
// import api from "../../../api";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultySelectField from "../common/form/multySelectField";
import BackHistoryButton from "../common/backButton";
import { useAuth } from "../../hooks/useAuth";
import { useProfession } from "../../hooks/useProfession";
import { useQualities } from "../../hooks/useQualities";

const EditPage = () => {
    // const { postId } = useParams();
    // const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    const { onlineUser } = useAuth();
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
        label: q.name,
        value: q._id
    }));
    const [errors, setErrors] = useState({});

    const transformData = (data) => {
        const qualitiesArray = [];
        for (const qualityId of data) {
            const quality = getQuality(qualityId);
            qualitiesArray.push(quality);
        }
        return qualitiesArray.map((q) => ({
            label: q.name,
            value: q._id
        }));
    };
    useEffect(() => {
        setIsLoading(true);
        setData((prevState) => ({
            ...prevState,
            ...data,
            profession: prof._id,
            qualities: transformData(onlineUser.qualities),
            name: onlineUser.name,
            email: onlineUser.email,
            sex: onlineUser.sex
        }));
    }, []);
    // const getQualities = (elements) => {
    //     const qualitiesArray = [];
    //     for (const elem of elements) {
    //         for (const quality in qualities) {
    //             if (elem.value === qualities[quality].value) {
    //                 qualitiesArray.push({
    //                     _id: qualities[quality].value,
    //                     name: qualities[quality].label,
    //                     color: qualities[quality].color
    //                 });
    //             }
    //         }
    //     }
    //     return qualitiesArray;
    // };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        // const isValid = validate();
        // if (!isValid) return;
        // const { qualities } = data;
        // api.users
        //     .update(postId, {
        //         ...data,
        //         // profession: getProfessionById(profession),
        //         qualities: getQualities(qualities)
        //     })
        //     .then((data) => history.push(`/users/${data._id}`));
    };

    // useEffect(() => {
    //     setIsLoading(true);
    //     setData((prevState) => ({
    //         ...prevState,
    //         profession: prof.name
    //     }));
    // api.users.getById(postId).then(({ profession, qualities, ...data }) =>
    //     setData((prevState) => ({
    //         ...prevState,
    //         ...data,
    //         qualities: transformData(qualities),
    //         profession: profession._id
    //     }))
    // );
    // api.professions.fetchAll().then((data) => {
    //     const professionsList = Object.keys(data).map((professionName) => ({
    //         label: data[professionName].name,
    //         value: data[professionName]._id
    //     }));
    //     setProfession(professionsList);
    // });
    // api.qualities.fetchAll().then((data) => {
    //     const qualitiesList = Object.keys(data).map((optionName) => ({
    //         value: data[optionName]._id,
    //         label: data[optionName].name,
    //         color: data[optionName].color
    //     }));
    //     setQualities(qualitiesList);
    // });
    // }, []);
    useEffect(() => {
        if (data) setIsLoading(false);
        console.log(data);
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
    useEffect(() => {
        validate();
    }, [data]);
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

    if (!professionLoading && !qualityLoading) {
        return (
            <div className="container mt-5">
                <BackHistoryButton />
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 shadow p-4">
                            {!isLoading &&
                            Object.keys(professions).length > 0 &&
                            Object.keys(qualities).length > 0 ? (
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
                            ) : (
                                "Loading..."
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return "Загрузка...";
};

export default EditPage;
