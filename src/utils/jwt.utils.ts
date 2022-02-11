import jwt from 'jsonwebtoken'

import config  from 'config'


export const publicKey = config.get<string>("publicKey")
// const privateKey = config.get<string>("privateKey")
export function signJWT(object:Object,options?:jwt.SignOptions|undefined){
   return jwt.sign(object,publicKey)
}

export function verifyJwt(token:string){
  try{
      const decoded = jwt.verify(token,publicKey)
      return{
        valid:true,
        expired:false,
        decoded
      }
  }catch(error:any){
      return {
          valid:false,
          expired:error.message==='jwt expired',
          decoded:null
      }
  }
}