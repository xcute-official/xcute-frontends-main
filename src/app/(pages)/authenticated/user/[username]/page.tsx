import { getUserSession } from "@/app/actions/authenticating";
import { PageParams } from "@/app/types";
const page = async ({params}: PageParams) => {
  const { username } = await params;
  const user = await getUserSession();
  if(!user){
    return <div>not loggedIn</div>
  }
  if(user.data?.username !== username){
    return <div>malware</div>
  }
  return <div>{username}</div>;
};

export default page;
