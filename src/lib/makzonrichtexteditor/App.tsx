import { useEffect, useRef } from "react";
import Toolbar from "./toolbar/App";
import Input from "./input/Input";
import displayPlaceholder from "./configs/dsplayPlaceholder";
import { addHistory } from "./utils/toolbar.utils";
import { editorProps } from "./type";
import { bgColors, colors, emojis, family, headings, sizes } from "./assests/defaultData";
import focusCaretOnInput from "./utils/focusCaretOnInput";

const App = ({
    editorRef,
    wrapperClassName,
    toolBarClassName,
    inputClassName,
    placeholderValue,
    addValue,
    setGetValue,
    autoFocus = true,
    onFocus = () => null,
    useToolBar,
    arrOfEmojis = emojis,
    arrOfFontColors = colors,
    arrOfBgColors = bgColors,
    arrOfHeadings = headings,
    arrOfFontSizes = sizes,
    arrOfFontFamily = family,
    handleLocalFile,
    handleGalaryFile,
    onFileAdd,
}: editorProps) => {
    const textEditorRef = useRef<HTMLDivElement>(null);
    let clearHistorTimeOut: number;

    /* add to history func */
    const handleAddToHistories = () => {
        clearTimeout(clearHistorTimeOut);
        clearHistorTimeOut = setTimeout(() => {
            const element = editorRef.current?.innerHTML || "";
            addHistory(element); // add history
        }, 400) as unknown as number;
    };

    /* func that listen for global changes */
    const handleGlobalChangesOnInputArea = () => {
        displayPlaceholder(editorRef); // evaluate initial input value condition to display placeholder    
        handleAddToHistories(); // func that add continues history in every 400 min sec
        setGetValue({
            _html: editorRef.current?.innerHTML || "",
            text: editorRef.current?.textContent || ""
        });
    };

    useEffect(() => {
        if (autoFocus) {
            const clear = setTimeout(() => {
                focusCaretOnInput(editorRef);  // focus caret on initail load                     
                displayPlaceholder(editorRef);
                handleAddToHistories(); // call func that add continues history in every 400 min sec initail load
                clearTimeout(clear);
            }, 100);
        }
    }, []);

    return <div
        id={`emekus_text_editor_${Date.now()}`}
        ref={textEditorRef}
        className={wrapperClassName}
    >
        {useToolBar ?
            <Toolbar
                inputRef={editorRef}
                toolBarClassName={toolBarClassName}
                useToolBar={useToolBar}
                arrOfEmojis={arrOfEmojis}
                arrOfFontColors={arrOfFontColors}
                arrOfBgColors={arrOfBgColors}
                arrOfHeadings={arrOfHeadings}
                arrOfFontSizes={arrOfFontSizes}
                arrOfFontFamily={arrOfFontFamily}
                textEditorRef={textEditorRef}
                handleGalaryFile={handleGalaryFile}
                onFileAdd={onFileAdd}
                handleLocalFile={handleLocalFile}
                handleGlobalChangesOnInputArea={handleGlobalChangesOnInputArea}
            /> :
            null
        }
        <Input
            addValue={addValue}
            inputClassName={inputClassName}
            placeholderValue={placeholderValue}
            inputRef={editorRef}
            handleGlobalChangesOnInputArea={handleGlobalChangesOnInputArea}
            onFocus={onFocus}
        />
    </div>;
};

export default App ;
