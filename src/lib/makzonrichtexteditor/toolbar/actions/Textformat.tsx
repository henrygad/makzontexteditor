import { textFormatProps } from "../../type";
import inlineCmd from "../../commands/inline.cmd";
import Dropdown from "../../components/Dropdown";
import { CgColorBucket, CgColorPicker } from "react-icons/cg";

const Textformat = ({
    useToolBar,
    arrOfFontColors,
    arrOfBgColors,
    arrOfHeadings,
    arrOfFontSizes,
    arrOfFontFamily,
    getNodesWithinTextEditor,
    handleGlobalChangesOnInputArea,
    targetNode,
}: textFormatProps) => {

    const handleTextFormat = (command: string, style: string[]) => {
        inlineCmd(command, getNodesWithinTextEditor(), { value: "", style });
        handleGlobalChangesOnInputArea();
    };

    return <>
        {
            typeof useToolBar === "object" &&
                useToolBar.useInline.heading ?
            <Dropdown
                id="heading"
                fieldName="Heading"
                children={
                    <>
                        {
                            arrOfHeadings &&
                                arrOfHeadings.length ?
                                arrOfHeadings.map(item =>
                                    <button                                        
                                        className="block text-sm"
                                        key={item.name}
                                        onClick={() => handleTextFormat("heading", item.style)}>
                                        {item.name}
                                    </button>
                                ) :
                                null
                        }
                    </>
                }
            /> :
            null
        }
        {typeof useToolBar === "object" &&
            useToolBar.useInline.font ?
            <Dropdown
                id="font"
                fieldName="Font"
                children={
                    <>
                        {
                            arrOfFontFamily &&
                                arrOfFontFamily.length ?
                                arrOfFontFamily.map(item =>
                                    <button
                                        className="text-sm block"
                                        key={item.name}
                                        onClick={() => handleTextFormat("font", item.style)} >
                                        {item.name}
                                    </button>
                                ) :
                                null
                        }
                    </>
                }
            /> :
            null
        }
        {typeof useToolBar === "object" &&
            useToolBar.useInline.size ?
            <Dropdown
                id="size"
                fieldName="Size"
                children={
                    <>
                        {
                            arrOfFontSizes &&
                                arrOfFontSizes.length ?
                                arrOfFontSizes.map(item =>
                                    <button
                                        className="text-sm block"
                                        key={item.name}
                                        onClick={() => handleTextFormat("size", item.style)} >
                                        {item.name}
                                    </button>
                                ) :
                                null
                        }
                    </>
                }
            /> :
            null
        }
        {typeof useToolBar === "object" &&
            useToolBar.useInline.bold ?
            <>
                {targetNode &&
                    targetNode.parentElement &&
                    targetNode.parentElement.className.includes("font-bold") &&
                    !targetNode.parentElement.className.includes("special-character") ?
                    <button
                        className="font-bold "
                        onClick={() => handleTextFormat("unbold", ["font-normal"])}>
                        B
                    </button> :
                    <button
                        className="font-normal "
                        onClick={() => handleTextFormat("bold", ["font-bold"])}>
                        B
                    </button>
                }
            </> :
            null
        }
        {typeof useToolBar === "object" &&
            useToolBar.useInline.italic ?
            <>
                {targetNode &&
                    targetNode.parentElement &&
                    targetNode.parentElement.className.split(" ").find(className => className === "italic") ?
                    <button
                        className="italic"
                        onClick={() => handleTextFormat("italic", ["not-italic"])}>
                        I
                    </button> :
                    <button
                        className="not-italic"
                        onClick={() => handleTextFormat("italic", ["italic"])}>
                        I
                    </button>
                }

            </> :
            null
        }
        {typeof useToolBar === "object" &&
            useToolBar.useInline.underline ?
            <>
                {targetNode &&
                    targetNode.parentElement &&
                    targetNode.parentElement.className.split(" ").find(className => className === "underline") ?
                    <button className="underline"
                        onClick={() => handleTextFormat("underline", ["inline-block", "no-underline"])}>
                        U
                    </button> :
                    <button className="no-underline"
                        onClick={() => handleTextFormat("underline", ["underline"])}>
                        U
                    </button>
                }
            </> :
            null
        }
        {typeof useToolBar === "object" &&
            useToolBar.useInline.textTransform ?
            <Dropdown
                id="text-transform"
                fieldName="Aa"
                children={
                    <>
                        <button className="text-sm" id="normal" onClick={() => handleTextFormat("normal-case", ["normal-case"])}>Normal</button>
                        <button className="text-sm" id="capitalize" onClick={() => handleTextFormat("capitalize", ["capitalize"])}>Capitalize</button>
                        <button className="text-sm" id="lowercase" onClick={() => handleTextFormat("lowercase", ["lowercase"])}>LowerCase</button>
                        <button className="text-sm" id="uppercase" onClick={() => handleTextFormat("uppercase", ["uppercase"])}>UpCase</button>
                    </>
                }
            /> :
            null
        }
        {typeof useToolBar === "object" &&
            useToolBar.useInline.textColor ?
            <Dropdown
                id="color"
                fieldName={<CgColorPicker size={20} />}
                children={
                    <>
                        {arrOfFontColors &&
                            arrOfFontColors.length ?
                            arrOfFontColors.map(style =>
                                <button
                                    key={style}
                                    className={`block h-[30px] w-[30px] ${style.split("-").map(part => part === "text" ? "bg" : part).join("-")} shadow-md`}
                                    onClick={() => handleTextFormat("color", [style])}>
                                </button>
                            ) :
                            null
                        }
                    </>
                }
            /> :
            null
        }
        {typeof useToolBar === "object" &&
            useToolBar.useInline.backGroundColor ?
            <Dropdown
                id="backgroundcolor"
                fieldName={<CgColorBucket size={20} />}
                children={
                    <>
                        {arrOfBgColors &&
                            arrOfBgColors.length ?
                            arrOfBgColors.map(style =>
                                <button
                                    key={style}
                                    className={`block h-[30px] w-[30px] ${style} shadow-md`}
                                    onClick={() => handleTextFormat("backgroundcolor", [style])}></button>
                            ) :
                            null
                        }
                    </>
                }
            /> :
            null
        }
    </>;
};

export default Textformat;
