"use client";

import Link from "next/link";
import { TbBriefcase, TbCode, TbGlass, TbHome } from "react-icons/tb";
import ThemeToggle from "./ThemeToggle";

interface PageIntrfc {
  text: string;
  href: string;
  icon?: React.ReactNode;
}

const pages: PageIntrfc[] = [
  {
    text: 'home',
    href: '/',
    icon: <TbHome size={18} />
  },{
    text: 'business',
    href: '/business',
    icon: <TbBriefcase size={18} />
  },{
    text: 'students',
    href: '/students',
    icon: <TbGlass size={18} />
  }
]

const PrimeNav = () => {
  return (
    <nav className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <TbCode size={18} />
        <span>xcute</span>
      </div>
      <div className="flex items-center gap-16">
        <ThemeToggle />
        <ul className="flex items-center gap-16">
          {
            pages.map(({text, href, icon}: PageIntrfc, index: number)=>(
              <li key={index}>
                <Link href={href}>
                  <div className="flex items-center gap-2">
                    <span>{text}</span>
                    {icon}
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </nav>
  );
};

export default PrimeNav;
