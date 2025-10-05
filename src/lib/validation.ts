export const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

export const validatePassword = (password: string) => {
    return password.length >= 8
}

export const validateRequired = (value: string) => {
    return value.trim().length > 0
}
