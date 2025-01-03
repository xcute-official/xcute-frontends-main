"use client";

import { readNotes } from "@/app/actions/content";
import { Note } from "@prisma/client";
import { useEffect, useState } from "react";
import ReadNoteItem from "./ReadNoteItem";

const ReadNotes = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [notes, setNotes] = useState<Note[]>([]);
    useEffect(()=>{
        readNotes().then((response)=>{
            console.log(response);
            if(response.status===200 && response.data){
                setLoading(false);
                setNotes(response.data as Note[]);
            }
        })
    }, []);
  return (
    <div>
        {
            loading ? (
                <span>loading</span>
            ) : (
                notes && notes.length>0 ? (
                    <ul className="flex flex-col gap-8">
                        {notes.map((item, index)=>(
                            <ReadNoteItem slug={item.slug} id={item.id} key={index} title={item.title} description={item.description} />
                        ))}
                    </ul>
                ) : (
                    <span>no data found.</span>
                )
            )
        }
    </div>
  )
};

export default ReadNotes;
