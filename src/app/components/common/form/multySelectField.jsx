import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultySelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id,
                  color: options[optionName].color
              }))
            : options;

    const defaultValueArray =
        typeof defaultValue === "object"
            ? Object.keys(defaultValue).map((defaultValueName) => ({
                  label:
                      defaultValue[defaultValueName].name ||
                      defaultValue[defaultValueName].label,
                  value:
                      defaultValue[defaultValueName]._id ||
                      defaultValue[defaultValueName].value,
                  color: defaultValue[defaultValueName].color
              }))
            : defaultValue;
    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                defaultValue={defaultValueArray}
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
