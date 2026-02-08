import { auth } from "../../lib/auth";

interface IRegisterPatientPayload {
    name : string,
    email : string,
    password : string
}

const registerUser = async (payload : IRegisterPatientPayload) => {
    const {name, email, password} = payload;

    const data = await auth.api.signUpEmail({
        body : {
            name,
            email,
            password,
          
        }
    })

    if(!data.user){
        throw new Error("Failed to register user")
    }

    //TODO : Create patient after sign up as an user


    // const patient = await prisma.$transaction(async (tx) => {

    //     await tx.
    // })

    return data
}

export const authService = {
    registerUser
}