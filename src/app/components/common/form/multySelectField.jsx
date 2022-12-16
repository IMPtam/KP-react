import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultySelectField = ({ options, onChange, name, label, defaultValue }) => {
    console.log(defaultValue);
    console.log(options);
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    const handleChange = (value) => {
        onChange({ name, value });
    };

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select-"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};
MultySelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
export default MultySelectField;
