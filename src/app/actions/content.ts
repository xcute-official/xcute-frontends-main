"use server";

import { FieldValues } from "react-hook-form";
import { SrvrActionRspnsIntrfc } from "../types";
import { NoteConfigSchema } from "../schemas";
import { prismadb } from "../libs/prismadb";
import { JSONContent } from "@tiptap/react";
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
export const updateNoteContent = async (id: string, content: JSONContent | null): Promise<SrvrActionRspnsIntrfc>=>{
    try{
        const updatedContent = await prismadb.note.update({
            data: {
                richTextContent: content
            },
            where: {
                id
            }
        });
        return {
            message: 'success',
            data: updatedContent,
            status: 200,
            redirected: `/`
        }
    }catch{
        return {
            message: 'faile',
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

