import { RefObject } from "react";
import { FaUndo, FaRedo } from "react-icons/fa";

type Props = {
    inputRef: RefObject<HTMLDivElement | null>
    displayHistory: (action: string, inputRef: RefObject<HTMLDivElement | null>) => void

}

const History = ({ inputRef, displayHistory }: Props) => {

    return <>
        <button className="block cursor-pointer" onClick={() =>displayHistory("undo",  inputRef)}>
            <FaUndo size={14} />
        </button>
        <button className="block cursor-pointer" onClick={() => displayHistory("redo", inputRef)}>
            <FaRedo size={14} />
        </button>
    </>;
};

export default History;
