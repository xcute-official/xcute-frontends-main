"use server";

import { FieldValues } from "react-hook-form";
import { SrvrActionRspnsIntrfc } from "../types";
import { NoteConfigSchema } from "../schemas";
import { prismadb } from "../libs/prismadb";
import { JSONContent } from "@tiptap/react";
import { getUserSession } from "./authenticating";
export const deleteNote = async (id: string): Promise<SrvrActionRspnsIntrfc>=>{
    try{
        const deleting = await prismadb.note.delete({
            where: {
                id
            }
        });
        if(!deleting){
            return {
                message: 'failed',
                status: 590
            }
        }
        return {
            message: 'success',
            status: 200
        }
    }catch{
        return {
            message: '',
            status: 200
        }
    }
}
export const readNotes = async (): Promise<SrvrActionRspnsIntrfc>=>{
    try{
        const notes = await prismadb.note.findMany();
        return {
            status: 200,
            message: '',
            data: notes
        }
    }catch{
        return {
            message: '',
            status: 200
        }
    }
}
export const readNote = async (slug: string): Promise<SrvrActionRspnsIntrfc>=>{
    try{
        const note = await prismadb.note.findUnique({
            where: {
                slug
            }
        });
        if(!note){
            return {
                message: "failed",
                status: 201,
            }
        }
        if(!note.richTextContent){
            return {
                message: "success",
                status: 200,
            }
        }
        return {
            message: "success",
            status: 200,
            data: note?.richTextContent
        }
    }catch(error){
        console.log(error);
        return {
            message: '',
            status: 200
        }
    }
}
export const updateNoteConfig = async (id: string, data: FieldValues): Promise<SrvrActionRspnsIntrfc>=>{
    const isValidated = NoteConfigSchema.safeParse(data);
    if(!isValidated.success){
        return {
            message: "invalid details",
            status: 200
        }
    }
    try{
        const { title, description, tags, category } = isValidated.data;
        console.log(tags, category);
        const updateNote = await prismadb.note.update({
            data: {
                title,
                description,
                slug: title.toLowerCase().replace(/\s+/g, '-'.slice(0, 200))
            },
            where: {
                id
            }
        });
        if(!updateNote){
            return {
                message: "failed for updated",
                status: 201
            }
        }
        const user = await getUserSession();
        if(!user){
            return {
                message: "no user is logged In",
                status: 202
            }
        }
        return {
            message: "success",
            status: 200,
            redirected: `/authenticated/user/${user.data.username}/contents/notes/${updateNote.id}/${updateNote.slug}`
        }
    }catch(error){
        console.log(error);
        return {
            message: 'failed',
            status: 201
        }
    }
}
export const updateNoteContent = async (id: string, content: string): Promise<SrvrActionRspnsIntrfc>=>{
    if(!content){
        return {
            message: 'invalid details',
            status: 501
        };
    }
    const jsonContent = JSON.parse(content);
    try{
        const updatedContent = await prismadb.note.update({
            data: {
                richTextContent: jsonContent || {},
            },
            where: {
                id
            }
        });
        return {
            message: 'success',
            data: updatedContent,
            status: 200,
        }
    }catch(error){
        console.log(error, "error");
        console.log({content}, 'updating');
        return {
            message: 'failed',
            status: 201
        }
    }
}
export const createNoteConfig = async (data: FieldValues): Promise<SrvrActionRspnsIntrfc>=>{
    const isValidated = NoteConfigSchema.safeParse(data);
    if(!isValidated.success){
        return {
            message: 'fake details',
            status: 201
        }
    }
    try{
        const { title, description, category } = isValidated.data;
        const noteConfig = await prismadb.note.create({
            data: {
                title,
                description,
                category,
                slug: title.toLowerCase().replace(/\s+/g, '-'.slice(0, 200))
            }
        });
        if(!noteConfig){
            return {
                message: "failed creation",
                status: 201
            }
        }
        return {
            message: "success",
            status: 200,
            redirected: `/authenticated/user/payal/contents/notes/${noteConfig.id}/${noteConfig.slug}`
        }
    }catch{
        return {
            message: "server invalid working",
            status: 201
        }
    }
}
export const readNoteConfig = async (id: string): Promise<SrvrActionRspnsIntrfc>=>{
    try{
        const noteconfig = await prismadb.note.findUnique({
            where: {
                id
            }
        });
        if(!noteconfig){
            return {
                status: 201,
                message: 'done'
            }
        }
        return {
            data: noteconfig,
            status: 200,
            message: 'done'
        }
    }catch{
        return {
            status: 501,
            message: 'note found'
        }
    }
}

