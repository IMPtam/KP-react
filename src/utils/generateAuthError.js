export function generateAuthError(message) {
    switch (message) {
        case "EMAIL_NOT_FOUND":
            return "Пароль или почта введены неккоректно";
        case "INVALID_PASSWORD":
            return "Пароль или почта введены неккоректно";
        case "EMAIL_EXISTS":
            return "Такой пользователь существует";
        default:
            return "Слишком много попыток входа. Попробуйте позже";
    }
}
