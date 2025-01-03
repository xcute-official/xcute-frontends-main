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
import SwitchToggle from "@/app/components/inputs/switch-toggle";
const sanitizeContent = (content: JSONContent | null)=>{
  try{
    return JSON.parse(JSON.stringify(content));
  }catch{
    return null;
  }
}
import { Button } from "@/app/components/buttons";
import { generateHTML } from "@tiptap/html";
const RichTextInputPage = () => {
    const router = useRouter();
    const { slug, id } = useParams();
    const [isSaved, setIsSaved] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [previewHtml, setPreviewHtml] = useState<string>('');
    const [content, setContent] = useState<JSONContent | null>(null);
    const [doAutoSave, setDoAutoSave] = useState<boolean>(true);
    const handleSave = ()=>{
        setIsLoading(true);
        setPreviewHtml(()=>JSON.stringify(content));
        updateNoteContent(id as string, previewHtml).then((response)=>{
            if(response.status===200 && response.data){
              setIsSaved(true);
            }
        }).catch(()=>setIsSaved(false)).finally(()=>setIsLoading(false));
    }
    const debouncedEditorState = useDebounce(content, 500);
    useEffect(()=>{
      if (!debouncedEditorState){
        return;
      }
      if(!doAutoSave){
        setIsSaved(false);
        return;
      }
      setIsLoading(true);
      setPreviewHtml(()=>generateHTML(debouncedEditorState, [StarterKit]));
      updateNoteContent(id as string, previewHtml).then((response)=>{
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
            StarterKit.configure({
              bulletList: {
                HTMLAttributes: {
                  class: 'list-disc pl-8'
                }
              },
              orderedList: {
                HTMLAttributes: {
                  class: 'list-num pl-8'
                }
              },
              code: {
                HTMLAttributes: {
                  class: 'font-mono text-sm px-1 rounded-md bg-background-100 text-secondary'
                }
              },
              codeBlock: {
                HTMLAttributes: {
                  class: 'p-2 rounded-md ml-4 bg-background-100 text-secondary text-xs font-mono'
                }
              },
              blockquote: {
                HTMLAttributes: {
                  class: 'p-2 border-l-primary border-l-4 rounded-r-md italic font-bold text-sm text-secondary bg-background-100'
                }
              }
            })
        ],
        content: content,
        editable: true,
        onUpdate: ({editor})=>{
          const newContent = editor.getJSON();
          if(sanitizeContent(newContent)){
            setContent(newContent);
            if(!content){return;}
            setPreviewHtml(()=>generateHTML(content, [StarterKit]));
            console.log(`updatedContent: `, content);
          }
        },
        editorProps: {
          attributes: {
            class: 'outline-none p-2 text-sm',
            spellcheck: 'false'
          }
        },
        immediatelyRender: false,

    });
    if(!editor){
        return null;
    }
  return (
    <div>
        <div className="border border-background-100 rounded-md px-2 py-2 flex justify-between items-center">
          <RichTextInputToolbar editor={editor}/>
          <div className="flex items-center gap-8">
            <SwitchToggle verb="autoSave" setIsToggled={setDoAutoSave} isToggled={doAutoSave} />
            {
              !doAutoSave && (
                <button className="text-sm py-1 px-4 rounded-full bg-primary" onClick={handleSave}>save</button>
              ) 
            }
            <div>
              {
                isLoading ? (
                  <div className="flex items-center gap-2 text-sm">
                    <span>loading</span><TbLoader2 size={18} className="text-success animate-spin" />
                  </div>
                ) : (
                  isSaved ? (
                    <div className="flex items-center gap-2 text-sm ">
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
        <div className="w-full flex items-center gap-2">
          <div className="mt-4 richTextEditor w-[50%] border">
              <EditorContent editor={editor} />
          </div>
          <div className="flex flex-col gap-4 w-[50%] border" dangerouslySetInnerHTML={{__html: previewHtml}}></div>
        </div>
    </div>
  )
};

export default RichTextInputPage;
