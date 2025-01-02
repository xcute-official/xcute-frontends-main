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
    <div>
      <div>
        <Link href="/authenticated/user/anjali/contents/notes/new">
          <div>
            <span>+Add new note</span>
          </div>
        </Link>
      </div>
      <div>
        <ReadNotes />
      </div>
    </div>
  );
};

export default page;
