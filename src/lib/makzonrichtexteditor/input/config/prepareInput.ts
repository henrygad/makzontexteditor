
import addInitialSpan from "./addInitialSpan";
import focusOnInput from "../../utils/focusOnInput";
import displayPlaceholder from "./displayPlaceholder";

// Util to prepare initial span element
const prepareInput = (inputRef: React.RefObject<HTMLDivElement | null>,
    setContext: { new: boolean, context?: string }, autoFocus: boolean) => {
    // insert or re-insert initail span tags
    if (!inputRef.current) return;
    
    // Insert a fresh empty span so the div never becomes totally empty   
    inputRef.current.innerHTML = addInitialSpan(setContext);  

    // Auto focus if set to true
    if (autoFocus) {
        focusOnInput(inputRef, 100);
    }

    // remove display placeholder
    displayPlaceholder(inputRef);
};
export default prepareInput;