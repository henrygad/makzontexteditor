import { inputProps } from "../type";
import inputSpecialCharacters from "./config/specialCharacters";
import deleteUnwantedHtml from "../utils/deleteUnwantedEle";
import { useEffect } from "react";
import prepareInput from "./config/prepareInput";
import stopAllOutDeleteInInput from "../utils/stopAllOutDeleteInInput";

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
        handleGlobalChangesOnInputArea();
        deleteUnwantedHtml();
    };

    const handleOnkeyDown = (e: React.KeyboardEvent) => {
        // handle on key down events
        inputSpecialCharacters(e, handleGlobalChangesOnInputArea);
        stopAllOutDeleteInInput(e, inputRef, handleGlobalChangesOnInputArea);
    };

    useEffect(() => {
        // Prepare initail spans going into contenteditable input on load
        console.log(setContext, "outside");
        prepareInput(inputRef, setContext, autoFocus);
    }, [inputRef, setContext]);

    return (
        <div className={inputClassName}>
            <span className="place-holder text-base first-letter:capitalize opacity-45 absolute">
                {placeholder}
            </span>
            <div
                contentEditable
                ref={inputRef}
                onInput={handleOnInput}
                onKeyDown={handleOnkeyDown}
                className="h-full w-full min-w-full min-h-full max-w-full max-h-full outline-0"
            ></div>
        </div>
    );
};

export default Input;
