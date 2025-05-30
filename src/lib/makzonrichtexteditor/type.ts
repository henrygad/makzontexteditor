import { RefObject } from "react";

type useToolBarProps = {
  useToolBar:
    | {
        useInline: {
          heading: boolean;
          font: boolean;
          size: boolean;
          bold: boolean;
          italic: boolean;
          underline: boolean;
          textTransform: boolean;
          anchorlink: boolean;
          textColor: boolean;
          backGroundColor: boolean;
          alignment: boolean;
          listing: boolean;
          emoji: boolean;
        };
        useBlock: boolean;
        useHistor: boolean;
        useDelete: boolean;
      }
    | boolean;
};

export type addValue = {
  setContext: { new: boolean, context?: string }
};

export type getValue = {
  _html: string;
  text: string;
};

export type getSelectionProps = {
  selection: Selection | null;
  range: Range | undefined;
  node: Node | ParentNode | null | undefined;
  textNode: Node | undefined;
};
export type historyProps = {
  addHistory: (action: string) => void;
  displayHistory: (
    direction: string,
    inputRef: RefObject<HTMLDivElement | null>
  ) => void;
  history: string[];
  historyIndex: number;
};
export type actionsProps = {
  handleGlobalChangesOnInputArea: () => void;
  getNodesWithinTextEditor: () => getSelectionProps;
};

export interface anchorLinkProps extends actionsProps {
  targetNode: Node | ParentNode | null | undefined;
}

export interface mediaProps extends actionsProps {
  handleLocalFile?: (file: FileList) => Promise<string | ArrayBuffer>;
  handleGalary?: () => Promise<string>;
  onAddFile?: (
    blobValue: Blob | null,
    stringValue: string | ArrayBuffer
  ) => Promise<string | ArrayBuffer>;
}

export interface emojiProps extends actionsProps {
  arrOfEmojis: string[];
}

export interface textFormatProps extends actionsProps, useToolBarProps {
  arrOfFontColors: string[];
  arrOfBgColors: string[];
  arrOfHeadings: { name: string; style: string[] }[];
  arrOfFontSizes: { name: string; style: string[] }[];
  arrOfFontFamily: { name: string; style: string[] }[];
  targetNode: Node | ParentNode | null | undefined;
}

export interface inputProps extends addValue {
  placeholder?: string;
  inputClassName?: string;
  inputRef: RefObject<HTMLDivElement | null>;
  handleGlobalChangesOnInputArea: () => void;
  autoFocus?: boolean;
}

export interface toolbarProps extends useToolBarProps {
  inputRef: RefObject<HTMLDivElement | null>;
  textEditorAreaRef: RefObject<HTMLDivElement | null>;
  arrOfEmojis: string[];
  arrOfFontColors: string[];
  arrOfBgColors: string[];
  arrOfHeadings: { name: string; style: string[] }[];
  arrOfFontSizes: { name: string; style: string[] }[];
  arrOfFontFamily: { name: string; style: string[] }[];
  toolBarClassName?: string;
  handleGetInputValues: ()=> void
  handleGlobalChangesOnInputArea: () => void;
  handleLocalFile?: (file: FileList) => Promise<string | ArrayBuffer>;
  handleGalary?: () => Promise<string>;
  onAddFile?: (
    blobValue: Blob | null,
    stringValue: string | ArrayBuffer
  ) => Promise<string | ArrayBuffer>;
}

export interface editorProps extends addValue, useToolBarProps {
  inputRef: RefObject<HTMLDivElement | null>;
  wrapperClassName?: string;
  inputClassName?: string;
  toolBarClassName?: string;
  placeholder?: string;
  autoFocus?: boolean;
  arrOfEmojis?: string[];
  arrOfFontColors?: string[];
  arrOfBgColors?: string[];
  arrOfHeadings?: { name: string; style: string[] }[];
  arrOfFontSizes?: { name: string; style: string[] }[];
  arrOfFontFamily?: { name: string; style: string[] }[];
  handleLocalFile?: (file: FileList) => Promise<string | ArrayBuffer>;
  handleGalary?: () => Promise<string>;
  getValue: (getValue: getValue) => void;
  onAddFile?: (
    blobValue: Blob | null,
    stringValue: string | ArrayBuffer
  ) => Promise<string | ArrayBuffer>;
}
