export function validator(data, config) {
    const errors = {};
    function validate(validateMetod, data, config) {
        let statusValidate;
        switch (validateMetod) {
            case "isRequied": {
                if (typeof data === "boolean") {
                    statusValidate = !data;
                } else {
                    statusValidate = data.trim() === "";
                }
                break;
            }
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigital": {
                const capitalRegExp = /\d+/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "minSymbol": {
                statusValidate = data.length < config.value;
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMetod in config[fieldName]) {
            const error = validate(
                validateMetod,
                data[fieldName],
                config[fieldName][validateMetod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
