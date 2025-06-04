import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { HR } from "./blocks/HorizontalRuleExtension";
export const schema = BlockNoteSchema.create({
    blockSpecs: Object.assign(Object.assign({}, defaultBlockSpecs), { 
        // Adds the Alert block.
        hr: HR }),
});
