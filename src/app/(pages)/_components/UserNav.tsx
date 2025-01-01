"use client";
import Link from "next/link";

const UserNav = () => {
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
};

export default UserNav;
