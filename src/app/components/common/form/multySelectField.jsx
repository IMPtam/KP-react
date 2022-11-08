import React from "react";
import Select, { StylesConfig } from "react-select";
import PropTypes from "prop-types";

const MultySelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;
    const defaultValueArray =
        typeof defaultValue === "object"
            ? Object.keys(defaultValue).map((defaultValueName) => ({
                  label: defaultValue[defaultValueName].name,
                  value: defaultValue[defaultValueName]._id,
                  color: defaultValue[defaultValueName].color
              }))
            : defaultValue;
    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    const dot = (color = "transparent") => ({
        alignItems: "center",
        display: "flex",

        ":before": {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: "block",
            marginRight: 8,
            height: 10,
            width: 10
        }
    });

    const colourStyles: StylesConfig<defaultValueArray, true> = {
        control: (styles) => ({ ...styles, backgroundColor: "white" }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                    ? data.color
                    : isFocused
                    ? color.alpha(0.1).css()
                    : undefined,
                color: isDisabled
                    ? "#ccc"
                    : isSelected
                    ? chroma.contrast(color, "white") > 2
                        ? "white"
                        : "black"
                    : data.color,
                cursor: isDisabled ? "not-allowed" : "default",

                ":active": {
                    ...styles[":active"],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined
                }
            };
        },
        input: (styles) => ({ ...styles, ...dot() }),
        placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
    };
    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <Select
                isMulti
                // styles={styles}
                closeMenuOnSelect={false}
                defaultValue={defaultValueArray}
                options={optionsArray}
                // className="basic-multi-select"
                // classNamePrefix="select-"
                styles={colourStyles}
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
    defaultValue: PropTypes.array
};
export default MultySelectField;
