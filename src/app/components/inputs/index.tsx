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
        <div>
            {
                label && <label htmlFor={id}>{label}</label>
            }
            <div>
                <input type={type} {...register(id, { required })} disabled={disabled} id={id} className={clsx(

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
        <div>
            {
                label && <label htmlFor={id}>{label}</label>
            }
            <div>
                <input type={type} {...register(id, { required })} disabled={disabled} id={id} className={clsx(
                    
                )} autoComplete={id} />
                <button disabled={disabled} onClick={()=>setType(type==='password'?'text':'password')} className="">
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
        <div>
            {
                label && <label htmlFor={id}>{label}</label>
            }
            <div>
                <textarea {...register(id, { required })} disabled={disabled} id={id} className={clsx(
                    
                )} autoComplete={id}></textarea>
            </div>
        </div>
    )
}