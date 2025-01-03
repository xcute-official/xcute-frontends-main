"use server";
import { SrvrActionRspnsIntrfc, UserSessionIntrfc, UserSessionTyp } from '../types';
import { FieldValues } from 'react-hook-form';
import { SigninSchema, SignupSchema } from '../schemas';
import bcrypt from 'bcryptjs';
import { prismadb } from '../libs/prismadb';
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';
import { Auth as authConfig } from '../configs';




export const getUserSession = async (): Promise<SrvrActionRspnsIntrfc>=>{
    const token = (await cookies()).get('authToken')?.value;
    if(!token){
        return {
            status: 201,
            message: 'failed getting user session'
        }
    }
    const sessionData = jwt.verify(token, authConfig.authSecret) as UserSessionIntrfc;
    return {
        data: sessionData,
        isAuthenticated: true,
        status: 200,
        message: 'get user session'
    }
}

export const signOut = async (): Promise<SrvrActionRspnsIntrfc>=>{
    (await cookies()).delete('authToken');
    return {
        message: 'logout success',
        status: 200
    }
}



export const signUp = async (data: FieldValues): Promise<SrvrActionRspnsIntrfc>=>{
    const isValidated = SignupSchema.safeParse(data);
    if(!isValidated.success){
        return {
            message: 'invalid fields',
            status: 201
        }
    }
    try{
        const { username, password, email } = isValidated.data;
        const userExists = await prismadb.user.findUnique({
            where: {
                username
            }
        });
        if(userExists){
            return {
                message: 'user already exists',
                status: 501
            }
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prismadb.user.create({
            data: {
                username, 
                password: passwordHash,
                email
            }
        });
        if(!user){
            return {
                message: 'user creation faield',
                status: 500
            }
        }
        return {
            message: 'user created',
            status: 200,
        }
    }catch{
        return {
            message: 'server error',
            status: 500
        }
    }
}



export const signIn = async (data: FieldValues): Promise<SrvrActionRspnsIntrfc>=>{
    const isValidated = SigninSchema.safeParse(data);
    if(!isValidated.success){
        return {
            message: 'invalid fields',
            status: 201
        }
    }
    try{
        const { id, password } = isValidated.data;
        const user = await prismadb.user.findUnique({
            where: {
                username: id
            }
        });
        if(!user){
            return {
                message: 'user not found',
                status: 501
            }
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return {
                message: 'wrong password',
                status: 201
            }
        }
        const tokenPayload: UserSessionTyp = {
            username: user.username,
            id: user.id,
            email: user.email
        };
        const token = jwt.sign(tokenPayload, authConfig.authSecret, {expiresIn: '1h'});
        (await cookies()).set({
            name: 'authToken',
            value: token,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV==='production',
            maxAge: 3600,
            path: '/'
        }) 
        return {
            message: 'user loggedin',
            status: 200,
            isAuthenticated: true,
            redirected: `/authenticated/user/${user.username}`
        }
    }catch(error){
        console.log(error, 'signIn error');
        return {
            message: 'server error',
            status: 500
        }
    }
}