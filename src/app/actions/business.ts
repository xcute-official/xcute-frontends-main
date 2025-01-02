"use server";

import { FieldValues } from "react-hook-form";
import { SrvrActionRspnsIntrfc } from "../types";
import { ContactSchema } from "../schemas";
import { prismadb } from "../libs/prismadb";

export const createContact = async (data: FieldValues): Promise<SrvrActionRspnsIntrfc>=>{
    const isValidated = ContactSchema.safeParse(data);
    if(!isValidated.success){
        return {
            message: 'invalid details',
            status: 201
        }
    }
    try{
        const { email, name, phone, message, subject } = isValidated.data;
        const messageExists = await prismadb.contact.findUnique({
            where: {
                email
            }
        });
        if(messageExists){
            return {
                status: 201,
                message: 'you have already a message'
            }
        }
        const doMessage = await prismadb.contact.create({
            data: {
                email,
                name,
                phone,
                message,
                subject
            }
        });
        if(!doMessage){
            return {
                message: 'failed while sending messages',
                status: 500
            }
        }
        return {
            message: 'message sent',
            status: 200
        }
    }catch{
        return {
            message: 'server mistake',
            status: 200
        }
    }
}