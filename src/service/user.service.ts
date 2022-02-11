import {DocumentDefinition} from 'mongoose'

import UserModel ,{UserDocument} from '../models/user.model'

export async function createUser(input:DocumentDefinition<Omit<UserDocument,'createdAt' | 'updatedAt'|"comparePassword">>){
  try {
    const user =   await UserModel.create(input)
     return user
  } catch (error) {
      return 
  }
}

export async function validatePassword({email,password}:{email:string,password:string}){
   const user = await UserModel.findOne({email})
   if(!user){
     return false
   }

   const isValid = await user.comparePassword(password)

   return user

   if(!isValid) return false


}