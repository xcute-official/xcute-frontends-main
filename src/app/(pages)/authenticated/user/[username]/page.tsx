import { getUserSession } from "@/app/actions/authenticating";
import { PageParams } from "@/app/types";
import ReadNotes from "./contents/notes/_components/ReadNotes";
import Link from "next/link";
const page = async ({params}: PageParams) => {
  const { username } = await params;
  const user = await getUserSession();
  if(!user){
    return <div>not loggedIn</div>
  }
  if(user.data?.username !== username){
    return <div>malware</div>
  }
  return (
    <div className="w-full md:mx-auto md:w-1/2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-primary text-xl font-bold">{username}</span>
          <span className="text-sm">{user.data.email}</span>
        </div>
        <Link href="/authenticated/user/anjali/contents/notes/new" className="rounded-md text-sm border border-background-100 px-2 py-1.5">
          <div>
            <span>+Add new note</span>
          </div>
        </Link>
      </div>
      <div className="mt-8">
        <ReadNotes />
      </div>
    </div>
  );
};

export default page;
