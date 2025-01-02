"use client";

import { deleteNote, readNotes } from "@/app/actions/content";
import { Note } from "@prisma/client";
import { useEffect, useState } from "react";

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
    const handleDelete = (id: string)=>{
        deleteNote(id);
    }
  return (
    <div>
        {
            loading ? (
                <span>loading</span>
            ) : (
                notes && notes.length>0 ? (
                    <div>
                        {notes.map((item, index)=>(
                            <div key={index}>
                                <span>{item.title}</span>
                                <span>{item.description}</span>
                                <button onClick={()=>handleDelete(item.id)}>delete</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <span>no data found.</span>
                )
            )
        }
    </div>
  )
};

export default ReadNotes;
