import inlineCmd from "../../commands/inline.cmd";
import { getSelectionProps } from "../../type";
import { displayHistory } from "../../utils/history";

const specialKeyCmd = (
    e: KeyboardEvent,
    inputRef: React.RefObject<HTMLDivElement | null>,
    getNodesWithinTextEditor: () => getSelectionProps,
    handleGetInputValues: () => void,
    handleGlobalChangesOnInputArea: () => void
) => {
    if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        displayHistory("undo", inputRef);
        handleGetInputValues();
    } else if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        displayHistory("redo", inputRef);
        handleGetInputValues();
    } else if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        inlineCmd("bold", getNodesWithinTextEditor(), { value: "", style: ["font-bold"] });
        handleGlobalChangesOnInputArea();
    } else if (e.ctrlKey && e.key === "i") {
        e.preventDefault();
        inlineCmd("italic", getNodesWithinTextEditor(), { value: "", style: ["italic"] });
        handleGlobalChangesOnInputArea();
    } else if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        inlineCmd("underline", getNodesWithinTextEditor(), { value: "", style: ["underline"] });
        handleGlobalChangesOnInputArea();
    }
};

export default specialKeyCmd;