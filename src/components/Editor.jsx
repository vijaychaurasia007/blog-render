"use client";
// All library imports
import React from "react";
import dynamic from "next/dynamic";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { filterSuggestionItems, insertOrUpdateBlock, } from "@blocknote/core";
import { getDefaultReactSlashMenuItems, SuggestionMenuController } from "@blocknote/react";
// All project imports
import CreateBlogSVG from "./createBlogSVG";
import { schema } from "./extension/extensionsSchema";
// Dynamic import for BlockNote dependencies
// dynamic function here allows us to resolve the imports first then initialize component and also
// gives us option to disable server side rendering by passing { ssr: false } as its second parameter.
const BlockNoteEditorComponent = dynamic(async () => {
    const { useCreateBlockNote } = await import("@blocknote/react");
    const { BlockNoteView } = await import("@blocknote/mantine");
    // Define the EditorComponent to accept props
    const EditorComponent = ({ options }) => {
        const initialContent = options === null || options === void 0 ? void 0 : options.initialContent;
        // Slash menu item to insert an Alert block
        const insertHR = (editor) => ({
            title: "Horizontal Rule",
            subtext: "It adds a horizontal line.",
            onItemClick: () => 
            // If the block containing the text caret is empty, `insertOrUpdateBlock`
            // changes its type to the provided block. Otherwise, it inserts the new
            // block below and moves the text caret to it. We use this function with an
            // Alert block.
            insertOrUpdateBlock(editor, {
                type: "hr",
            }),
            aliases: ["hr"],
            group: "Basic blocks",
            icon: <CreateBlogSVG />,
        });
        // Create the editor instance with options
        const editor = useCreateBlockNote({
            schema, // this is where all schema of all blocks goes 
            // if you are adding custom schema then you will have to define this
            // See https://www.blocknotejs.org/docs/editor-basics/default-schema
            // Also See https://www.blocknotejs.org/docs/custom-schemas
            initialContent: initialContent, // initialcontent option here takes editor output
            // which is of type PartialBlock[]
        });
        return <BlockNoteView editor={editor}> 
       {/* Replaces the default Slash Menu. */}
       <SuggestionMenuController triggerCharacter={"/"} getItems={async (query) => {
                // Gets all default slash menu items.
                const defaultItems = getDefaultReactSlashMenuItems(editor);
                // Finds index of last item in "Basic blocks" group.
                const lastBasicBlockIndex = defaultItems.findLastIndex((item) => item.group === "Basic blocks");
                // Inserts the Alert item as the last item in the "Basic blocks" group.
                defaultItems.splice(lastBasicBlockIndex + 1, 0, insertHR(editor));
                // Returns filtered items based on the query.
                return filterSuggestionItems(defaultItems, query);
            }}/>
      </BlockNoteView>;
    };
    return EditorComponent;
}, { ssr: false } // Disable SSR
);
// Main Editor component
export default function Editor({ options = {} }) {
    return <BlockNoteEditorComponent options={options}/>;
}
