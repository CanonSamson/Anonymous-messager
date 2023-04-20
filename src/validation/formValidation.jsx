import * as yup from "yup"


export const SignupSchema = yup.object().shape({
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
})

export const LoginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
})


export const MessageSchema = yup.object().shape({
    text: yup.string().min(3).required(),
})