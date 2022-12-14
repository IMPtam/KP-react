import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultySelectField from "../common/form/multySelectField";
import BackHistoryButton from "../common/backButton";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities";
import {
    getProfessionByIds,
    getProfessionLoadingStatus,
    getProffesions
} from "../../store/proffesions";

const EditPage = () => {
    const history = useHistory();
    const [data, setData] = useState();
    const { onlineUser, modifyUser } = useAuth();

    const professionLoading = useSelector(getProfessionLoadingStatus());
    const professions = useSelector(getProffesions());
    const prof = useSelector(getProfessionByIds(onlineUser.profession));

    const professionList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const qualities = useSelector(getQualities());
    const qualityLoading = useSelector(getQualitiesLoadingStatus());

    const qualityList = qualities.map((q) => ({
        value: q._id,
        label: q.name
    }));
    const [errors, setErrors] = useState({});

    // const transformData = (data) => {
    //     const qualitiesArray = [];
    //     for (const qualityId of data) {
    //         const quality = getQuality(qualityId);
    //         qualitiesArray.push(quality);
    //     }
    //     data = qualitiesArray.map((q) => ({
    //         label: q.name,
    //         value: q._id
    //     }));
    //     return data;
    // };
    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }
    const transformData = (data) => {
        const result = getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
        return result;
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

    const validatorConfig = {
        email: {
            isRequired: {
                message: "?????????????????????? ?????????? ?????????????????????? ?????? ????????????????????"
            },
            isEmail: {
                message: "Email ???????????? ??????????????????????"
            }
        },
        name: {
            isRequired: {
                message: "?????????????? ???????? ??????"
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

    if (data) {
        return (
            <div className="container mt-5">
                <BackHistoryButton />
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="??????"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="?????????????????????? ??????????"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="???????????? ???????? ??????????????????"
                                    defaultOption="Choose..."
                                    options={professionList}
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    label="???????????????? ???????? ??????"
                                    options={[
                                        { name: "??????????????", value: "male" },
                                        {
                                            name: "??????????????",
                                            value: "female"
                                        },
                                        { name: "????????????", value: "other" }
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
                                    label="???????????????? ???????? ???????????????? "
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    ????????????????
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return "????????????????...";
};

export default EditPage;
