"use client";

import { RxCrossCircled } from "react-icons/rx";
import { TbCircleCheck } from "react-icons/tb";

interface SuccessMessageProps {
    message?: string;
}
export const SuccessMessage: React.FC<SuccessMessageProps> = ({
    message
})=>{
    if(!message){
        return null;
    }
    return (
        <div className="flex items-center gap-2 text-success">
            <TbCircleCheck size={18} />
            <span>{message}</span>
        </div>
    )
}


interface ErrorMessageProps {
    message?: string;
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
    message
})=>{
    if(!message){
        return null;
    }
    return (
        <div className="flex items-center gap-2 text-danger">
            <RxCrossCircled size={18}/>
            <span>{message}</span>
        </div>
    )
}