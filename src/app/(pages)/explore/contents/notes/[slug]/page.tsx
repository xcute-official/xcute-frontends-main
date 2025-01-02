import { readNote } from "@/app/actions/content";
import { PageParams } from "@/app/types";
import React from "react";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/html";
const page = async ({params}: PageParams) => {
  const { slug } = await params;
  if(!slug){
    return <div>not found</div>
  }
  const note = await readNote(slug as string);
  const html = generateHTML(note.data, [StarterKit]);
  console.log(html);
  return (
    <div>
      <div className="flex flex-col gap-4" dangerouslySetInnerHTML={{__html: html}}>
        
      </div>
    </div>
  )
};

export default page;
