import { inputProps } from "../type";
//import inputSpecialCharacters from "./config/specialCharacters";
import deleteUnwantedHtml from "../utils/deleteUnwantedEle";
import { useEffect} from "react";
import stopAllOutDeleteInInput from "../utils/stopAllOutDeleteInInput";
import cleanAndConvertInputs from "../utils/cleanAndConvertInputs";
import focusOnInput from "../utils/focusOnInput";
//import displayPlaceholder from "./config/displayPlaceholder";
import addInitialSpan from "./config/addInitialSpan";

const Input = ({
    placeholder = "Start writing...",
    inputClassName,
    inputRef,
    setContext,
    handleGlobalChangesOnInputArea,
    autoFocus = true
}: inputProps) => {

    const handleOnInput = () => {
        // handle event on input into contenteditable div
        deleteUnwantedHtml();
        handleGlobalChangesOnInputArea();
    };

    const handleOnkeyDown = (e: React.KeyboardEvent) => {
        // handle on key down events function calls

        // inputSpecialCharacters(e, handleGlobalChangesOnInputArea);
        stopAllOutDeleteInInput(e, inputRef, handleGlobalChangesOnInputArea);
    };

    useEffect(() => {
        if (inputRef.current &&
            inputRef.current.innerHTML === "") {
            // Insert a fresh empty span to contenteditable input.
            inputRef.current.innerHTML = addInitialSpan();

            // Auto focus if set to true
            if (autoFocus) {
                focusOnInput(inputRef, 100);
            }
        }
    }, [inputRef.current, autoFocus]);

    useEffect(() => {       
        if (inputRef.current &&
            setContext &&
            setContext.new === false &&
            setContext.context
        ) {         
            
            const mainSpan = document.createElement("span");
            mainSpan.classList.add(...["main-span", "block"]);
            const checkTopLevel = true;       
            const nodes = cleanAndConvertInputs(setContext.context, checkTopLevel);
            for (const node of nodes) {
                mainSpan.appendChild(node);
            }
            inputRef.current.innerHTML = "";
            inputRef.current.prepend(mainSpan);

            // Auto focus if set to true
            if (autoFocus) {
                focusOnInput(inputRef, 100);
            }

            // Upadte global changes on input area
            handleGlobalChangesOnInputArea();            
        }

    }, [inputRef.current, setContext, autoFocus]);


    return (
        <div className={inputClassName}>
            <span
                className="place-holder text-base text-gray-800 first-letter:capitalize opacity-45 absolute"
            >
                {placeholder}
            </span>
            <div
                contentEditable
                ref={inputRef}
                onInput={handleOnInput}
                onKeyDown={handleOnkeyDown}
                className="h-full w-full min-w-full min-h-full max-w-full max-h-full outline-0">
            </div>
        </div>
    );
};

export default Input;
