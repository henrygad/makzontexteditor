import { useEffect, useState } from "react";
import getSelection from "../utils/getSelection";
import { getSelectionProps, toolbarProps } from "../type";
import Deleteall from "./actionbuttons/Deleteall";
import { deleteAll, displayHistory } from "../utils/toolbar.utils";
import History from "./actionbuttons/History";
import Alignment from "./actionbuttons/Alignment";
import Textformat from "./actionbuttons/Textformat";
import Emojis from "./actionbuttons/Emojis";
import Textlisting from "./actionbuttons/Textlisting";
import Anchorlink from "./actionbuttons/Anchorlink";
import Writecode from "./actionbuttons/Writecode";
import Embed from "./actionbuttons/Embed";
import Image from "./actionbuttons/Image";
import Video from "./actionbuttons/Video";
import specialKeyCmd from "./actionbuttons/specialKeyCmd";
import pasteToClipBoard from "./actionbuttons/pasteToClipBoard";

const App = ({
    toolBarClassName,
    inputRef,
    useToolBar,
    arrOfEmojis,
    arrOfFontColors,
    arrOfBgColors,
    arrOfHeadings,
    arrOfFontSizes,
    arrOfFontFamily,
    textEditorRef,
    handleGalaryFile,
    onFileAdd,
    handleLocalFile,
    handleGlobalChangesOnInputArea,
}: toolbarProps) => {
    const [targetNode, setTargetNode] = useState<Node | ParentNode | null | undefined>(undefined);

    /* prevent selecting node outside it own texteditor and contentEditbale input*/
    const getNodesWithinTextEditor = (): getSelectionProps => {
        const selections = getSelection();
        if ((textEditorRef.current && textEditorRef.current.contains(selections.node as Node)) &&
            inputRef.current && inputRef.current.contains(selections.node as Node)) {
            return { ...selections };
        } else {
            return {
                selection: null,
                range: undefined,
                node: undefined,
                textNode: undefined,
            };
        }
    };

    const handleOnSelectionChange = () => {
        //get selected node on selection changes on document
        const { textNode } = getNodesWithinTextEditor();
        setTargetNode(textNode);
    };

    useEffect(() => {
        if (inputRef &&
            inputRef.current) {
            inputRef.current.addEventListener("keydown", (e) => specialKeyCmd(e, inputRef, getNodesWithinTextEditor));
            inputRef.current.addEventListener("paste", (e) => pasteToClipBoard(e, getNodesWithinTextEditor, handleGlobalChangesOnInputArea));
        }

        document.addEventListener("selectionchange", handleOnSelectionChange);
        return () => {
            document.removeEventListener("selectionchange", handleOnSelectionChange,);
        };
    }, []);

    return <div className={`flex flex-wrap items-center gap-4 font-text ${toolBarClassName}`}>
        <Textformat
            useToolBar={useToolBar}
            arrOfFontColors={arrOfFontColors}
            arrOfBgColors={arrOfBgColors}
            arrOfHeadings={arrOfHeadings}
            arrOfFontSizes={arrOfFontSizes}
            arrOfFontFamily={arrOfFontFamily}
            handleGlobalChangesOnInputArea={handleGlobalChangesOnInputArea}
            getNodesWithinTextEditor={getNodesWithinTextEditor}
            targetNode={targetNode}
        />
        {typeof useToolBar === "object" &&
            useToolBar.useInline.emoji ?
            <Emojis
                arrOfEmojis={arrOfEmojis}
                handleGlobalChangesOnInputArea={handleGlobalChangesOnInputArea}
                getNodesWithinTextEditor={getNodesWithinTextEditor}
            /> :
            null
        }
        {typeof useToolBar === "object" &&
            useToolBar.useInline.listing ?
            <Textlisting
                handleGlobalChangesOnInputArea={handleGlobalChangesOnInputArea}
                getNodesWithinTextEditor={getNodesWithinTextEditor}
            /> :
            null
        }
        {typeof useToolBar === "object" &&
            useToolBar.useInline.alignment ?
            <Alignment
                handleGlobalChangesOnInputArea={handleGlobalChangesOnInputArea}
                getNodesWithinTextEditor={getNodesWithinTextEditor}
            /> :
            null
        }
        {typeof useToolBar === "object" &&
            useToolBar.useInline.anchorlink ?
            <Anchorlink
                handleGlobalChangesOnInputArea={handleGlobalChangesOnInputArea}
                getNodesWithinTextEditor={getNodesWithinTextEditor}
                targetNode={targetNode}
            /> :
            null
        }
        {
            typeof useToolBar === "object" &&
                useToolBar.useBlock ?
                <>
                    <Writecode
                        handleGlobalChangesOnInputArea={handleGlobalChangesOnInputArea}
                        getNodesWithinTextEditor={getNodesWithinTextEditor}
                    />
                    <Image
                        handleGalaryFile={handleGalaryFile}
                        onFileAdd={onFileAdd}
                        handleLocalFile={handleLocalFile}
                        handleGlobalChangesOnInputArea={handleGlobalChangesOnInputArea}
                        getNodesWithinTextEditor={getNodesWithinTextEditor}
                    />
                    <Video
                        handleGalaryFile={handleGalaryFile}
                        onFileAdd={onFileAdd}
                        handleLocalFile={handleLocalFile}
                        handleGlobalChangesOnInputArea={handleGlobalChangesOnInputArea}
                        getNodesWithinTextEditor={getNodesWithinTextEditor}
                    />
                    <Embed
                        handleGlobalChangesOnInputArea={handleGlobalChangesOnInputArea}
                        getNodesWithinTextEditor={getNodesWithinTextEditor}
                    />
                </> :
                null
        }
        {
            typeof useToolBar === "object" &&
                useToolBar.useHistor ?
                <History inputRef={inputRef} displayHistory={displayHistory} /> :
                null
        }
        {
            typeof useToolBar === "object" &&
                useToolBar.useDelete ?
                <Deleteall deleteAll={() => deleteAll(inputRef)} /> :
                null
        }

    </div>;

};

export default App;
