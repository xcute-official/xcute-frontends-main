"use client";

import clsx from "clsx";
import React from "react";
import { TbLoader } from "react-icons/tb";

interface ButtonProps {
    id?: string;
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
        <button id={id} disabled={disabled} type={type} onClick={onClick} className={clsx(
            variation && 'flex'
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
    danger?: boolean;
}
export const LoadingButton: React.FC<LoadingButtonProps> = ({
    onClick, disabled, variation, type, fullWidth, verbs, loading, danger
})=>{
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={clsx(
            'flex items-center gap-2 px-4 py-1.5 rounded-md bg-primary-200 justify-center text-sm border border-danger',
            fullWidth && 'w-full',
            variation && 'rohit',
            loading && 'loadingrohit',
            danger && 'bg-danger text-neutral-white'
        )}>
            {
                disabled && (
                    <TbLoader className="animate-spin text-foreground" size={18} />
                )
            }
            <span>{
                disabled ? verbs[1] : verbs[0]    
            }</span>
        </button>
    )
}