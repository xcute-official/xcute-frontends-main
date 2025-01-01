"use client";

import { useState } from "react";
import { TbMoon, TbSun } from "react-icons/tb";

const ThemeToggle = () => {
    const [theme, setTheme] = useState<'light'|'dark'>('dark');
    const onChange = ()=>{
        setTheme(theme==='dark'?'light':'dark');
        document.querySelector('html')?.setAttribute('data-theme', theme);
    }
  return (
    <button onClick={onChange} className="flex items-center gap-2">
      {
        theme==='dark' ? (
          <TbMoon size={18} />
        ) : (
          <TbSun size={18} />
        )
      }
      <span>{theme}</span>
    </button>
  )
};

export default ThemeToggle;
