"use client";

import { uploadImage } from "@/app/actions/cloudinary";
import React, { useState } from "react";







interface InputImageProps {
    setImageUrl: (imageUrl: string)=>void;
    disabled?: boolean;
}
export const InputImage: React.FC<InputImageProps> = ({
    setImageUrl, disabled
})=>{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageInfo, setImageInfo] = useState<unknown>(null);
    const handleUpload = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setIsLoading(true);
        if(!e.target.files){
            return;
        }
        const file = e.target.files[0];
        uploadImage(file).then((response)=>{
            if(response.data && response.status===200){
                setImageUrl(response.data.secure_url);
                setImageInfo(response.data);
            }
        }).catch((error)=>console.log(error, 'handleUpload: ')).finally(()=>setIsLoading(false));
    }
    return (
        <div>
            <label htmlFor="ImageInput">upload</label>
            <input className="hidden" disabled={isLoading || disabled} type="file" accept="image/*" onChange={handleUpload} id="ImageInput" />

        </div>
    )
}