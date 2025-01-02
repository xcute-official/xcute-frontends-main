"use client";
import { useUserSession } from "@/app/contexts/user-session";
import Link from "next/link";

const UserNav = () => {
    const { user } = useUserSession();
  if(!user){
    return (
        <div className="flex items-center gap-2">
            <Link href="/authenticating/signin" className="">
                <div>
                    <span>login</span>
                </div>
            </Link>
            <Link href="/authenticating/signup" className="">
                <div>
                    <span>signup</span>
                </div>
            </Link>
        </div>
    ) 
  }
  return (
    <Link href={`/authenticated/user/${user.username}`}>
        <div>
            <span>{user.username}</span>
        </div>
    </Link>
  )
};

export default UserNav;
