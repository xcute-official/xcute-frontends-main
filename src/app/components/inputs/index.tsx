"use client";

import clsx from "clsx";
import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { TbEye, TbEyeOff } from "react-icons/tb";

interface FormTextInputProps {
    id: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    type?: 'text'|'email';
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    required?: boolean;
}

export const FormTextInput: React.FC<FormTextInputProps> = ({
    id, register, errors, type="text", placeholder, label, disabled, required
})=>{
    return (
        <div className="flex flex-col gap-1">
            {
                label && <label htmlFor={id} className="text-sm">{label}</label>
            }
            <div>
                <input type={type} {...register(id, { required })} placeholder={placeholder} disabled={disabled} id={id} className={clsx(
                    'bg-background-100 text-foreground-100 px-4 py-1.5 rounded-md border-transparent focus:outline-none focus:border-primary focus:border w-full',
                    errors[id] && 'rohit'
                )} autoComplete={id} />
            </div>
        </div>
    )
}






interface FormPasswordInputProps {
    id: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    required?: boolean;
}

export const FormPasswordInput: React.FC<FormPasswordInputProps> = ({
    id, register, errors, placeholder, label, disabled, required
})=>{
    const [type, setType] = useState<'text'|'password'>('password');
    return (
        <div className="flex flex-col gap-1">
            {
                label && <label htmlFor={id} className="text-sm">{label}</label>
            }
            <div className="relative">
                <input type={type} {...register(id, { required })} placeholder={placeholder} disabled={disabled} id={id} className={clsx(
                    'bg-background-100 text-foreground-100 px-4 py-1.5 rounded-md border-transparent focus:outline-none focus:border-primary focus:border w-full',
                    errors[id] && 'rohit'
                )} autoComplete={id} />
                <button type="button" disabled={disabled} onClick={()=>setType(type==='password'?'text':'password')} className="absolute top-1/2 right-2 transform -translate-y-1/2">
                    {
                        type === 'password' ? (
                            <TbEye size={18} />
                        ) : (
                            <TbEyeOff size={18} />
                        )
                    }
                </button>
            </div>
        </div>
    )
}










interface FormTextareaInputProps {
    id: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    doResize?: boolean;
}

export const FormTextareaInput: React.FC<FormTextareaInputProps> = ({
    id, register, errors, placeholder, label, disabled, required, doResize
})=>{
    return (
        <div className="flex flex-col gap-1">
            {
                label && <label htmlFor={id} className="text-sm">{label}</label>
            }
            <div>
                <textarea {...register(id, { required })} placeholder={placeholder} disabled={disabled} id={id} className={clsx(
                    'bg-background-100 text-foreground-100 px-4 py-1.5 rounded-md border-transparent focus:outline-none focus:border-primary focus:border w-full',
                    errors[id] && 'rohit',
                    !doResize && 'resize-none'
                )} autoComplete={id}></textarea>
            </div>
        </div>
    )
}