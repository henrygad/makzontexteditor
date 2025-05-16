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
    const editorIdRef = useRef(`makzon_text_editor_${Date.now() + "_" + Math.random()}`);
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
    
    const handleGlobalChangesOnInputArea = () => {        
        // Func that listen for global changes made on contentEditable input area
        if (!inputRef.current) return;
        
        displayPlaceholder(inputRef);
        handleAddToHistories();

        const mainSpanEle = inputRef.current.firstElementChild;        
        if (!mainSpanEle) return;          
        
        setGetValue({
            _html: mainSpanEle.innerHTML,
            text: mainSpanEle.textContent!
        });
    };

    useEffect(() => { 
        handleGlobalChangesOnInputArea();
    }, [inputRef]);

    return <div
        id={editorIdRef.current}
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
