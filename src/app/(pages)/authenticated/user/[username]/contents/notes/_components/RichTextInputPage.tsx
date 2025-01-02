"use client";

import { readNote, updateNoteContent } from "@/app/actions/content";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { TbBold, TbCode, TbCodeAsterisk, TbH1, TbH2, TbH3, TbH4, TbH5, TbH6, TbItalic, TbList, TbMagnet, TbMenuOrder, TbQuote, TbStrikethrough, TbUnderline } from "react-icons/tb";

const RichTextInputPage = () => {
    const router = useRouter();
    const { slug, id } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [content, setContent] = useState<JSONContent | null>(null);
    const handleSave = ()=>{
        setIsLoading(true);
        updateNoteContent(id as string, content).then((response)=>{
            console.log(response);
            if(response.status===200 && response.redirected){
                router.push(response.redirected);
            }
        })
    }
    useEffect(()=>{
      if(id!=='new' && slug){
        setIsLoading(true);
        readNote(slug as string).then((response)=>{
          if(response.status===200 && response.data){
            setContent(response.data);
          }
        }).catch((error)=>console.log('failed for data fetch', error)).finally(()=>setIsLoading(false));
      }
    }, [id, slug]);
    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content: content,
        editable: !isLoading,
        onUpdate: ({editor})=>{
            setContent(editor.getJSON());
        },
        editorProps: {
            attributes: {
                class: ''
            }
        },
        immediatelyRender: false
    });
    if(!editor){
        return null;
    }
  return (
    <div>
        <div>
        <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <TbBold className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <TbItalic className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <TbStrikethrough className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <TbCode className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        <TbH1 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <TbH2 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        <TbH3 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        <TbH4 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        <TbH5 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        <TbH6 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <TbList className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <TbMenuOrder className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        <TbCodeAsterisk className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <TbQuote className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <TbUnderline className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <TbMagnet className="w-6 h-6" />
      </button>
      <button onClick={()=>handleSave()}>save</button>
    </div>
        <div>
            <EditorContent editor={editor} />
        </div>
    </div>
  )
};

export default RichTextInputPage;
