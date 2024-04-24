export const validationCheck = (email,password) => {
    let isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    let isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if (!isEmailValid) return "Invalid email address"
    if (!isPasswordValid) return "Password Should contain at least one uppercase letter,at least one lowercase letter,Contain at least one digit, Contain at least 8 characters long"
}