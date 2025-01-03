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
import { Button } from "@/app/components/buttons";
import { generateHTML } from "@tiptap/html";
import { Extensions } from "@/app/components/inputs/richTextInput/config";



const RichTextInputPage = () => {

  const { slug, id } = useParams();

  const [content, setContent] = useState<JSONContent | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [doAutoSave, setDoAutoSave] = useState<boolean>(true);

  const handleSave = () => {
    setIsLoading(true);
    if(!debouncedEditorState){
      return;
    }
    const sendingContent = JSON.stringify(debouncedEditorState);
    console.log('sendingContent: ', sendingContent);
    updateNoteContent(id as string, sendingContent).then((response) => {
      if (response.status === 200 && response.data) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    }).catch(() => setIsSaved(false)).finally(() => setIsLoading(false));
  }

  const debouncedEditorState = useDebounce(content, 1000);

  useEffect(() => {
    if (!content || !debouncedEditorState) {
      return;
    }
    if (!doAutoSave) {
      setIsSaved(false);
      return;
    }
    setPreviewHtml(() => generateHTML(debouncedEditorState, Extensions));
    handleSave();
  }, [debouncedEditorState]);


  useEffect(() => {
    if (id && slug) {
      setIsLoading(true);
      readNote(slug as string).then((response) => {
        if (response.status === 200 && response.data) {
          setContent(response.data);
        }
      }).catch((error) => console.log('failed for data fetch', error)).finally(() => setIsLoading(false));
    }
  }, [id, slug]);
  const editor = useEditor({
    extensions: Extensions,
    content: debouncedEditorState as JSONContent,
    editable: !isLoading,
    onUpdate: ({ editor }) => {
      setContent(editor.getJSON());
      if(content){
        console.log('previewed htl');
        setPreviewHtml(generateHTML(content, [StarterKit]));
      }
      console.log('rendering Content: ', content);
    },
    editorProps: {
      attributes: {
        class: 'outline-none text-sm flex flex-col gap-4',
        spellcheck: 'false'
      }
    },
    immediatelyRender: false,
  });
  if (!editor) {
    return null;
  }








  return (
    <div>
      <div className="border border-background-100 rounded-md px-2 py-2 flex justify-between items-center">
        <RichTextInputToolbar editor={editor} />
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
      <div className="w-full flex items-start gap-2 mt-4">
        <div className="richTextEditor w-full p-2 rounded-md">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
};

export default RichTextInputPage;
