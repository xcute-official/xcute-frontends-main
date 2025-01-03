"use server";

import { Cloudinary as cloudinaryConfig } from "../configs";
import { SrvrActionRspnsIntrfc } from "../types";


export const uploadImage = async (file: File): Promise<SrvrActionRspnsIntrfc>=>{
    try{
        const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", cloudinaryConfig.uploadPreset);
        const response = await fetch(cloudUrl, {
            method: 'POST', 
            body: formData
        });
        console.log(response, 'uploadImage: ');
        if(!response.ok){
            return {
                message: 'failed to uploading image',
                status: 201
            }
        }
        const result = await response.json();
        console.log(result);
        return {
            message: 'success',
            status: 200,
            data: result
        }
    }catch(error){
        console.log('uploadImage: ', error);
        return {
            message: 'failed to upload image',
            status: 500
        }
    }
}