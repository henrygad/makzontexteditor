import addInitailSpan from "../input/config/addInitialSpan";
import displayPlaceholder from "../input/config/displayPlaceholder";
import focusOnInput from "./focusOnInput";
import { addHistory } from "./history";


const deleteAll = (inputRef: React.RefObject<HTMLDivElement | null>) => {
    if (!inputRef.current) return;
    inputRef.current.innerHTML = addInitailSpan();
    displayPlaceholder(inputRef);
    focusOnInput(inputRef, 0);
    addHistory(inputRef.current.innerHTML);
};

export default deleteAll;