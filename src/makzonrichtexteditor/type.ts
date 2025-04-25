import { RefObject } from "react";

type useToolBarProps = {
    useToolBar:{
        useInline: {
            heading: boolean,
            font: boolean,
            size: boolean,
            bold: boolean,
            italic: boolean,
            underline: boolean
            textTransform: boolean
            anchorlink: boolean
            textColor: boolean
            backGroundColor: boolean,
            alignment: boolean,
            listing: boolean
            emoji: boolean,
        },
        useBlock: boolean
        useHistor: boolean,
        useDelete: boolean,
    } | boolean
}

export type addValue = {
    addValue: {
        createNew: boolean,
        data: string
    }
}
export type getValue = {
    _html: string
    text: string
};

export type getSelectionProps = {
    selection: Selection | null
    range: Range | undefined,
    node: Node | ParentNode | null | undefined
    textNode: Node | undefined
};
export type historyProps = {
    addHistory: (action: string) => void;
    displayHistory: (direction: string, inputRef: RefObject<HTMLDivElement | null>) => void
    history: string[];
    historyIndex: number;
};
export type actionsProps = {
    handleGlobalChangesOnInputArea: () => void
    getNodesWithinTextEditor: () => getSelectionProps
};

export interface anchorLinkProps extends actionsProps {
    targetNode: Node | ParentNode | null | undefined
}

export interface mediaProps extends actionsProps {        
    handleLocalFile?: (file: FileList) => Promise<string | ArrayBuffer>
    handleGalaryFile?: () => Promise<string>
    onFileAdd?: (value: Blob | string) => Promise<string>
}

export interface emojiProps extends actionsProps {
    arrOfEmojis: string[]
}

export interface textFormatProps extends actionsProps, useToolBarProps {
    arrOfFontColors: string[]
    arrOfBgColors: string[]
    arrOfHeadings: { name: string, style: string[] }[]
    arrOfFontSizes: { name: string, style: string[] }[]
    arrOfFontFamily: { name: string, style: string[] }[]
    targetNode: Node | ParentNode | null | undefined
}

export interface inputProps extends addValue {
    placeholderValue: string | null | boolean;
    inputClassName: string;
    inputRef: RefObject<HTMLDivElement | null>
    handleGlobalChangesOnInputArea: () => void;
    onFocus?: () => void
}

export interface toolbarProps extends useToolBarProps{   
    inputRef: RefObject<HTMLDivElement | null>,
    textEditorRef: RefObject<HTMLDivElement | null>,
    arrOfEmojis: string[]
    arrOfFontColors: string[]
    arrOfBgColors: string[]
    arrOfHeadings: { name: string, style: string[] }[]
    arrOfFontSizes: { name: string, style: string[] }[]
    arrOfFontFamily: { name: string, style: string[] }[]
    toolBarClassName?: string   
    handleGlobalChangesOnInputArea: () => void;
    handleLocalFile?: (file: FileList) => Promise<string | ArrayBuffer>
    handleGalaryFile?: () => Promise<string>
    onFileAdd?: (value: Blob | string) => Promise<string>
}

export interface editorProps extends addValue, useToolBarProps {
    editorRef: RefObject<HTMLDivElement | null>
    inputClassName: string
    toolBarClassName?: string
    wrapperClassName: string
    placeholderValue: string | boolean | null
    setGetValue: (getValue: getValue) => void,
    autoFocus?: boolean
    onFocus?: ()=> void   
    arrOfEmojis?: string[]
    arrOfFontColors?: string[]
    arrOfBgColors?: string[]
    arrOfHeadings?: { name: string, style: string[] }[]
    arrOfFontSizes?: { name: string, style: string[] }[]
    arrOfFontFamily?: { name: string, style: string[] }[]
    handleLocalFile?: (file: FileList) => Promise<string | ArrayBuffer>
    handleGalaryFile?: () => Promise<string>
    onFileAdd?: (value: Blob | string) => Promise<string>
}

