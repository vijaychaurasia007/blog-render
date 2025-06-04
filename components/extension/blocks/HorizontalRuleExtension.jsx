import { createReactBlockSpec } from "@blocknote/react";
// The Alert block.
export const HR = createReactBlockSpec({
    type: "hr",
    propSchema: {},
    content: "none",
}, {
    render: () => {
        return <hr className="h-[1px] border-b-[1px] w-full"/>;
    }
});
