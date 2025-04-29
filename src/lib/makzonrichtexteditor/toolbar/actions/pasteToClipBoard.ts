import { insertNodeToRange } from "../../commands/cmd.utils";
import { getSelectionProps } from "../../type";
import cleanAndConvertInputs from "../../utils/cleanAndConvertInputs";

const pasteToClipBoard = (
    e: ClipboardEvent,
    getNodesWithinTextEditor: () => getSelectionProps,
    handleGlobalChangesOnInputArea: () => void,

) => {
    /* filter text pasted into the text area */
    const {selection, range } = getNodesWithinTextEditor();
    e.preventDefault();
    
    const clipBoard = e.clipboardData;
    if (clipBoard) {
        const paste = clipBoard.getData("text/html") || clipBoard.getData("text/plain");
        const body = document.createElement("span");
        body.innerHTML =  cleanAndConvertInputs(paste);
        body.className = "bolck child-span";
        insertNodeToRange(body, selection, range);
        clipBoard.clearData();
        handleGlobalChangesOnInputArea();   
    }
    
};

export default pasteToClipBoard;

