"use client";
import { Editor } from "@tiptap/react";
import clsx from "clsx";
import { TbArrowLeft, TbArrowRight, TbBlockquote, TbBold, TbCode, TbCodeCircle, TbH1, TbH2, TbH3, TbH6, TbItalic, TbList, TbMenuOrder, TbStrikethrough } from "react-icons/tb";
const ACTIVE_CLASS = "bg-primary text-neutralWhite";
const BASE_CLASS = "cursor-pointer p-1 rounded-md hover:bg-background-100";
const ICON_SIZE = 18;
const ICON_CLASS = "";
interface RichTextInputToolbarProps {
    editor: Editor;
}
const RichTextInputToolbar: React.FC<RichTextInputToolbarProps> = ({
    editor
}) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
        <button onClick={()=>editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={clsx(
            editor.isActive('bold') && ACTIVE_CLASS,
            BASE_CLASS
        )}><TbBold className={ICON_CLASS} size={ICON_SIZE}/></button>

        <button onClick={()=>editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={clsx(
            editor.isActive('italic') && ACTIVE_CLASS,
            BASE_CLASS
        )}><TbItalic className={ICON_CLASS} size={ICON_SIZE}/></button>

        <button onClick={()=>editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} className={clsx(
            editor.isActive('strike') && ACTIVE_CLASS,
            BASE_CLASS
        )}><TbStrikethrough className={ICON_CLASS} size={ICON_SIZE}/></button>

        <button onClick={()=>editor.chain().focus().toggleCode().run()} disabled={!editor.can().chain().focus().toggleCode().run()} className={clsx(
            editor.isActive('code') && ACTIVE_CLASS,
            BASE_CLASS
        )}><TbCode className={ICON_CLASS} size={ICON_SIZE}/></button>

{/* by here you can remove disabled prop in button */}
        <button onClick={()=>editor.chain().focus().toggleHeading({level: 1}).run()} disabled={!editor.can().chain().focus().toggleHeading({level: 1}).run()} className={clsx(
            editor.isActive('heading', { level: 1 }) && ACTIVE_CLASS,
            BASE_CLASS
        )}><TbH1 className={ICON_CLASS} size={ICON_SIZE}/></button>

        <button onClick={()=>editor.chain().focus().toggleHeading({level: 3}).run()} disabled={!editor.can().chain().focus().toggleHeading({level: 3}).run()} className={clsx(
            editor.isActive('heading', { level: 3 }) && ACTIVE_CLASS,
            BASE_CLASS
        )}><TbH3 className={ICON_CLASS} size={ICON_SIZE}/></button>

        <button onClick={()=>editor.chain().focus().toggleHeading({level: 6}).run()} disabled={!editor.can().chain().focus().toggleHeading({level: 6}).run()} className={clsx(
            editor.isActive('heading', { level: 6 }) && ACTIVE_CLASS,
            BASE_CLASS
        )}><TbH6 className={ICON_CLASS} size={ICON_SIZE}/></button>

        <button onClick={()=>editor.chain().focus().toggleBulletList().run()} disabled={!editor.can().chain().focus().toggleBulletList().run()} className={clsx(
            editor.isActive('bulletList') && ACTIVE_CLASS,
            BASE_CLASS
        )}><TbList className={ICON_CLASS} size={ICON_SIZE}/></button>

        <button onClick={()=>editor.chain().focus().toggleOrderedList().run()} disabled={!editor.can().chain().focus().toggleOrderedList().run()} className={clsx(
            editor.isActive('orderedList') && ACTIVE_CLASS,
            BASE_CLASS
        )}><TbMenuOrder className={ICON_CLASS} size={ICON_SIZE}/></button>

        <button onClick={()=>editor.chain().focus().toggleCodeBlock().run()} disabled={!editor.can().chain().focus().toggleCodeBlock().run()} className={clsx(
            editor.isActive('codeBlock') && ACTIVE_CLASS,
            BASE_CLASS
        )}><TbCodeCircle className={ICON_CLASS} size={ICON_SIZE}/></button>
        
        <button onClick={()=>editor.chain().focus().toggleBlockquote().run()} disabled={!editor.can().chain().focus().toggleBlockquote().run()} className={clsx(
            editor.isActive('blockquote') && ACTIVE_CLASS,
            BASE_CLASS
        )}><TbBlockquote className={ICON_CLASS} size={ICON_SIZE}/></button>

        <button onClick={()=>editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} className={clsx(
            BASE_CLASS
        )}><TbArrowLeft className={ICON_CLASS} size={ICON_SIZE}/></button>

        <button onClick={()=>editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} className={clsx(
            BASE_CLASS
        )}><TbArrowRight className={ICON_CLASS} size={ICON_SIZE}/></button>
    </div>
  )
};

export default RichTextInputToolbar;
