import { getSelectionProps } from "../../type";
import cleanAndConvertInputs from "../../utils/cleanAndConvertInputs";

const pasteToClipBoard = (
    e: ClipboardEvent,
    getNodesWithinTextEditor: () => getSelectionProps,
    handleGlobalChangesOnInputArea: () => void,

) => {
    /* filter text pasted into the text area */
    e.preventDefault();
    const { selection, range } = getNodesWithinTextEditor();

    const clipBoard = e.clipboardData;

    if (clipBoard && selection && range) {
        const paste = clipBoard.getData("text/html") || clipBoard.getData("text/plain");
        const nodes = cleanAndConvertInputs(paste, true).reverse();      

        range.deleteContents();

        for (const node of nodes) {
            // Create a new ranges for each node and instert new range it into the seelection
            // Remove the old range and add the new one to the selection
            // Remove highlight from the pasted text            
            const newRange = document.createRange();
            newRange.selectNodeContents(node);            
            range.insertNode(node);          
            selection.removeAllRanges();
            selection.addRange(newRange);
        }
        
        handleGlobalChangesOnInputArea();
    }

};

export default pasteToClipBoard;

