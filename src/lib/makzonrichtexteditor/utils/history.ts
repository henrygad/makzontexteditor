import { RefObject } from "react";
import displayPlaceholder from "../input/config/displayPlaceholder";
import { historyProps } from "../type";
import focusOnInput from "./focusOnInput";

class History implements historyProps {
    constructor() {
        this.history = [];
        this.historyIndex = 0;
    }
    history: string[];
    historyIndex: number;
    addHistory = (action: string) => {
        this.history.push(action);
        this.historyIndex = this.history.length - 1;
    };
    displayHistory = (direction: string, inputRef: RefObject<HTMLDivElement | null>) => {
        if (!inputRef || !inputRef.current) return;

        if (direction === "undo") {
            if (this.historyIndex <= 0) return;
            this.historyIndex = this.historyIndex - 1;
            inputRef.current.innerHTML = this.history[this.historyIndex];
        } else {
            if (this.historyIndex >= this.history.length - 1) return;
            this.historyIndex = this.historyIndex + 1;
            inputRef.current.innerHTML = this.history[this.historyIndex];
        }
        displayPlaceholder(inputRef);
        focusOnInput(inputRef, 0);
    };
}

export const { displayHistory, addHistory } = new History();
