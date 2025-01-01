"use client";

import clsx from "clsx";
import React from "react";
import { TbLoader } from "react-icons/tb";

interface ButtonProps {
    id: string;
    onClick?: ()=>void;
    children?: React.ReactNode;
    disabled?: boolean;
    variation?: 'primary'|'secondary'|'danger'|'success'|'classic';
    type?: 'submit'|'reset'|'button'|undefined;
}
export const Button: React.FC<ButtonProps> = ({
    id, onClick, children, disabled, variation, type
})=>{
    return (
        <button type={type} onClick={onClick} className={clsx(

        )}>
            {children}
        </button>
    )
}





interface LoadingButtonProps {
    onClick?: ()=>void;
    disabled?: boolean;
    variation?: 'primary'|'secondary'|'danger'|'success'|'classic';
    type?: 'submit'|'reset'|'button'|undefined;
    fullWidth?: boolean;
    verbs: string[];
    loading?: boolean;
}
export const LoadingButton: React.FC<LoadingButtonProps> = ({
    onClick, disabled, variation, type, fullWidth, verbs, loading
})=>{
    return (
        <button type={type} onClick={onClick} className={clsx(
            'flex items-center gap-2'
        )}>
            {
                loading && (
                    <TbLoader className="animate-spin" size={18} />
                )
            }
            <span>{
                loading ? verbs[0] : verbs[1]    
            }</span>
        </button>
    )
}