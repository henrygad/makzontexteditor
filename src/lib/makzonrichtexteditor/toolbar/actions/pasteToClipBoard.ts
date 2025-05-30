import { getSelectionProps } from "../../type";
import cleanAndConvertInputs from "../../utils/cleanAndConvertInputs";

const pasteToClipBoard = (
    e: ClipboardEvent,
    getNodesWithinTextEditor: () => getSelectionProps,
    handleGlobalChangesOnInputArea: () => void,
) => {
    e.preventDefault();

    const { selection, range } = getNodesWithinTextEditor();
    const clipBoard = e.clipboardData;

    if (clipBoard && selection && range) {
        const paste = clipBoard.getData("text/html") || clipBoard.getData("text/plain");

        // Clean and convert input into DOM nodes
        const nodes = cleanAndConvertInputs(paste, false); // returns an array of Nodes

        // Remove existing content in selection
        range.deleteContents();

        let lastNode: Node | null = null;
        for (const node of nodes) {
            range.insertNode(node);
            lastNode = node;
        }

        // Move cursor to the end of the inserted content
        if (lastNode) {
            // Create a new range after the last inserted node
            const newRange = document.createRange();
            //newRange.setStartBefore(lastNode);                        
            //newRange.collapse(true);

            selection.removeAllRanges();
            selection.addRange(newRange);
        }

        handleGlobalChangesOnInputArea();
    }
};
  

export default pasteToClipBoard;

