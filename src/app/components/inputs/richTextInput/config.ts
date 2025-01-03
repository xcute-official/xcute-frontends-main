import StarterKit from "@tiptap/starter-kit";

export const Extensions = [
    StarterKit.configure({
        bulletList: {
            HTMLAttributes: {
                class: 'list-disc pl-6'
            }
        },
        orderedList: {
            HTMLAttributes: {
                class: 'list-decimal pl-4'
            }
        },
        code: {
            HTMLAttributes: {
                class: 'font-mono text-sm px-1 rounded-md bg-background-100 text-secondary'
            }
        },
        codeBlock: {
            HTMLAttributes: {
                class: 'p-2 rounded-md ml-2 bg-background-100 text-secondary texst-xs font-mono'
            }
        },
        blockquote: {
            HTMLAttributes: {
                class: 'p-2 border-l-primary border-l-4 rounded-r-md italic font-bold text-sm text-secondary bg-background-100'
            }
        }
    })           
]