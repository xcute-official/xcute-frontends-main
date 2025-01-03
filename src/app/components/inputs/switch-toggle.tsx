"use client";

import clsx from "clsx";
import { SetStateAction, useState } from "react";

interface SwitchToggleIntrfc {
    verb: string;
    setIsToggled: React.Dispatch<SetStateAction<boolean>>;
    isToggled?: boolean;
}
const SwitchToggle: React.FC<SwitchToggleIntrfc> = ({
    verb, setIsToggled, isToggled
}) => {
  return (
    <div className="flex items-center gap-2">
        <span className="text-sm">{verb}</span>
        <button onClick={()=>setIsToggled(!isToggled)} className="relative w-12 rounded-full border border-background-100 h-8 px-2">
            <span className={clsx(
                "absolute block w-4 h-4 rounded-full bg-background-100 left-2 top-1/2 transform -translate-y-1/2 transition-all ease-out",
                isToggled && 'bg-secondary left-5'
            )}></span>
        </button>
    </div>
  );
};

export default SwitchToggle;
