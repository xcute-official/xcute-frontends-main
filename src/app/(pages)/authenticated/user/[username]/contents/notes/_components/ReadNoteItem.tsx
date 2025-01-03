"use client";
import { deleteNote } from "@/app/actions/content";
import { LoadingButton } from "@/app/components/buttons";
import { useUserSession } from "@/app/contexts/user-session";
import Link from "next/link";
import { useState } from "react";
interface ReadNoteItemProps {
    title: string;
    description: string;
    id: string;
    slug: string;
}
const ReadNoteItem: React.FC<ReadNoteItemProps> = ({
    title, description, id, slug
}) => {
  const { user } = useUserSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const handleDelete = ()=>{
    setIsLoading(true);
    deleteNote(id).then((response)=>{
      if(response.status===200){
        setIsLoading(false);
        setIsDeleted(true);
      }
    })
  }
  if(isDeleted || !user){
    console.log(isDeleted, user);
    return null;
  }
  return (
    <li key={id} className="rounded-md p-4 border-background-100 border">
        <div className="flex flex-col gap-2">
            <Link href={`/explore/contents/notes/${slug}`} className="text-xl font-bold text-secondary">{title}</Link>
            <span className="text-sm">{description}</span>
            <div className="flex items-center gap-4 justify-end">
              <Link href={`/authenticated/user/${user.username}/contents/notes/${id}/`} className="px-2 text-sm py-1.5 rounded-md border border-background-100"> 
                <div>
                  <span>update</span>
                </div>
              </Link>
              <LoadingButton danger type="button" onClick={handleDelete} disabled={isLoading} verbs={['delete', 'deleting']} />
            </div>
        </div>
    </li>
  )
};

export default ReadNoteItem;
