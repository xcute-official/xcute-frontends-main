"use client";
import { readNote, updateNoteContent } from "@/app/actions/content";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbBold, TbCircleCheck, TbCode, TbCodeAsterisk, TbH1, TbH2, TbH3, TbH4, TbH5, TbH6, TbItalic, TbList, TbLoadBalancer, TbLoader, TbLoader2, TbMagnet, TbMenuOrder, TbQuote, TbStrikethrough, TbUnderline } from "react-icons/tb";
import RichTextInputToolbar from "./RichTextInputToolbar";
import { useDebounce } from "@/app/hooks/useDebounce";
import { RxCrossCircled } from "react-icons/rx";

const RichTextInputPage = () => {
    const router = useRouter();
    const { slug, id } = useParams();
    const [isSaved, setIsSaved] = useState<boolean>(true);
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
    const debouncedEditorState = useDebounce(content, 500);
    useEffect(()=>{
      if (!debouncedEditorState){
        return;
      }
      setIsLoading(true);
      updateNoteContent(id as string, content).then((response)=>{
        if(response.status===200 && response.data){ 
          setIsSaved(true);
        }else{
          setIsSaved(false);
        }
      }).finally(()=>setIsLoading(false));
    }, [debouncedEditorState]);
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
        editable: true,
        onUpdate: ({editor})=>{
            setContent(editor.getJSON());
        },
        editorProps: {
          attributes: {
            class: 'outline-none p-2 text-sm'
          }
        },
        immediatelyRender: false
    });
    if(!editor){
        return null;
    }
  return (
    <div>
        <div className="border border-background-100 rounded-md px-2 py-2 flex justify-between items-center">
          <RichTextInputToolbar editor={editor}/>
          <div>
            <div>
              {
                isLoading ? (
                  <div className="flex items-center gap-2 text-sm">
                    <span>loading</span><TbLoader2 size={18} className="text-success animate-spin" />
                  </div>
                ) : (
                  isSaved ? (
                    <div className="flex items-center gap-2 text-sm">
                      <span>saved</span><TbCircleCheck size={18} className="text-success" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <span>not saved</span>
                      <RxCrossCircled size={18} className="text-danger" />
                    </div>
                  )
                )
              }
            </div>
          </div>
        </div>
        <div className="mt-4">
            <EditorContent editor={editor} />
        </div>
    </div>
  )
};

export default RichTextInputPage;
