import {Request,Response} from 'express'
import User from '../models/user.model'
import { createSession, findSessions } from '../service/session.service'
import { validatePassword } from '../service/user.service'
import { signJWT } from '../utils/jwt.utils'

export async function createUserSession (req:Request,res:Response){
    //  validate the users password

    const user = await validatePassword(req.body)

    if(!user){
        return res.status(401).send('Invalid email or password')
    }

    // create a session

    const session = await createSession(user._id,req.get("user-agent")||"")

    // create an access token 
    const accessToken = signJWT(
        {...user,session:session},{
            expiresIn:'15m'
        }
    )

    // create a refresh token

    const refreshToken = signJWT(
        {...user,session:session},{
            expiresIn:'1y'
        }
    )

    // return access & refresh tokens
    return res.send({accessToken,refreshToken})

}

export async function getUserSessionsHandler(req:Request,res:Response){
    const userId = res.locals.user._id

    const sessions = await findSessions({user:userId,valid:true})

    return res.send(sessions)
}