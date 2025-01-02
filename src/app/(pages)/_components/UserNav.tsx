"use client";
import { useUserSession } from "@/app/contexts/user-session";
import Link from "next/link";

const UserNav = () => {
    const { user } = useUserSession();
  if(!user){
    return (
        <div className="flex items-center gap-2">
            <Link href="/" className="">
                <div>
                    <span>login</span>
                </div>
            </Link>
            <Link href="/" className="">
                <div>
                    <span>signup</span>
                </div>
            </Link>
        </div>
    ) 
  }
  return (
    <span>{user.username}</span>
  )
};

export default UserNav;
