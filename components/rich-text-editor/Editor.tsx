"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Starterkit from "@tiptap/starter-kit";
import { Menubar } from "./Menubar";
import TextAlign from "@tiptap/extension-text-align";

export function RichTextEditor({field}: {field: any}) {
    const editor = useEditor({
        extensions: [
            Starterkit, 
            TextAlign.configure({
                types: ["paragraph", "heading"]
            })
        ],
        editorProps: {
            attributes: {
                class: 'min-h-[300px] p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xlpn dark:prose-invert !w-full !max-w-none',
            }
        },
        immediatelyRender: false,
        onUpdate: () => {
            field.onChange(JSON.stringify(editor?.getJSON()))
        },

        content: field.value ? JSON.parse(field.value): "",
    });
    
    return (
        <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
            <Menubar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}