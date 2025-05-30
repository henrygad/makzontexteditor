import { FaUndo, FaRedo } from "react-icons/fa";

type Props = {
    displayHistory: (action: string) => void
}

const History = ({ displayHistory }: Props) => {

    return <>
        <button className="block cursor-pointer" onClick={() =>displayHistory("undo")}>
            <FaUndo size={14} />
        </button>
        <button className="block cursor-pointer" onClick={() => displayHistory("redo")}>
            <FaRedo size={14} />
        </button>
    </>;
};

export default History;
