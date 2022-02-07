import {object, string, TypeOf} from 'zod'

export const createUserSchema = object({
    body:object({
        name:string({
            required_error:'Name is required'
        }),
        password:string({
            required_error:'Name is Required'
        }).min(6,'Password too short - should be 6 chars minimum'),
        passwordConfirmation:string({
            required_error:'passwordConfirmation is Required'
        }),
        email:string({
            required_error:'email is Required'
        }).email("Not a valid email")
    }).refine((data)=>data.password===data.passwordConfirmation,{
        message:"passwords do not match",
        path:["passwordConfirmation"]
    })
  
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirmation">