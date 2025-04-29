import { useEffect, useRef } from "react";
import Toolbar from "./toolbar/App";
import Input from "./input/Input";
import displayPlaceholder from "./input/config/displayPlaceholder";
import { addHistory } from "./utils/history";
import { editorProps } from "./type";
import { bgColors, colors, emojis, family, headings, sizes } from "./assests/defaultData";

const App = ({
    inputRef,
    wrapperClassName,
    toolBarClassName,
    inputClassName,
    placeholder,
    setContext,
    setGetValue,
    autoFocus,
    useToolBar,
    arrOfEmojis = emojis,
    arrOfFontColors = colors,
    arrOfBgColors = bgColors,
    arrOfHeadings = headings,
    arrOfFontSizes = sizes,
    arrOfFontFamily = family,
    handleLocalFile,
    handleGalary,
    onAddFile,
}: editorProps) => {
    const textEditorAreaRef = useRef<HTMLDivElement>(null);
    let clearHistorTimeOut: number;

    // Add to history func
    const handleAddToHistories = () => {
        clearTimeout(clearHistorTimeOut);

        clearHistorTimeOut = setTimeout(() => {
            if (!inputRef.current) return clearTimeout(clearHistorTimeOut);
            const element = inputRef.current.innerHTML;
            addHistory(element);
        }, 400);
    };

    // Func that listen for changes on input and update other func
    const handleGlobalChangesOnInputArea = () => {
        displayPlaceholder(inputRef);
        handleAddToHistories();

        if (!inputRef.current) return;

        setGetValue({
            _html: inputRef.current.innerHTML,
            text: inputRef.current.textContent!
        });
    };

    useEffect(() => { 
        handleGlobalChangesOnInputArea();
    }, [inputRef]);

    return <div
        id={`makzon_text_editor_${Date.now() + "_" + Math.random()}`}
        ref={textEditorAreaRef}
        className={wrapperClassName}
    >
        {useToolBar ?
            <Toolbar
                inputRef={inputRef}
                toolBarClassName={toolBarClassName}
                useToolBar={useToolBar}
                arrOfEmojis={arrOfEmojis}
                arrOfFontColors={arrOfFontColors}
                arrOfBgColors={arrOfBgColors}
                arrOfHeadings={arrOfHeadings}
                arrOfFontSizes={arrOfFontSizes}
                arrOfFontFamily={arrOfFontFamily}
                textEditorAreaRef={textEditorAreaRef}
                handleGalary={handleGalary}
                onAddFile={onAddFile}
                handleLocalFile={handleLocalFile}
                handleGlobalChangesOnInputArea={handleGlobalChangesOnInputArea}
            /> :
            null
        }
        <Input
            setContext={setContext}
            inputClassName={inputClassName}
            placeholder={placeholder}
            inputRef={inputRef}
            handleGlobalChangesOnInputArea={handleGlobalChangesOnInputArea}
            autoFocus={autoFocus}
        />
    </div>;
};

export default App;
