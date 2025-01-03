"use server";
import { readNote } from "@/app/actions/content";
import { PageParams } from "@/app/types";
import React from "react";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/html";
import { Extensions } from "@/app/components/inputs/richTextInput/config";
const page = async ({params}: PageParams) => {
  const { slug } = await params;
  if(!slug){
    return <div>not found</div>
  }
  const note = await readNote(slug as string);
  const html = generateHTML(note.data, Extensions);
  return (
    <div>
      <div className="flex flex-col gap-4 richTextEditor" dangerouslySetInnerHTML={{__html: html}}></div>
    </div>
  )
};

export default page;
