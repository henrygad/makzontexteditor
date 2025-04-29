
import insertInitailSpan from "../input/config/addInitialSpan";
import focusOnInput from "./focusOnInput";

// Util to prepare initial span element

const prepareInput = (inputRef: React.RefObject<HTMLDivElement | null>,
    setContext: { new: boolean, context?: string }, autoFocus: boolean) => {
    // insert or re-insert initail span tags
    if (!inputRef.current) return;

    if (inputRef.current.innerHTML.trim() === "") {
        // re-insert a fresh empty span so the div never becomes totally empty
        inputRef.current.innerHTML = insertInitailSpan(setContext);

        // Auto focus if set to true
        if (autoFocus) {
            focusOnInput(inputRef, 100);
        }
    }
};
export default prepareInput;