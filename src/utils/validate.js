
export const checkValidData=(email,password)=>{

    const isEmailValid= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email);
    const isPasswordValid=/^(?=.*\d).{8,}$/.test(password);

    if(!isEmailValid) return"Invalid Email-id";
    if(!isPasswordValid) return "Invalid Password";

};