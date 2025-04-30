import insertInitailSpan from "../input/config/addInitialSpan";
import displayPlaceholder from "../input/config/displayPlaceholder";
import focusOnInput from "./focusOnInput";
import { addHistory } from "./history";


const deleteAll = (inputRef: React.RefObject<HTMLDivElement | null>) => {
    if (!inputRef.current) return;
    inputRef.current.innerHTML = insertInitailSpan({ new: true });
    displayPlaceholder(inputRef);
    focusOnInput(inputRef, 0);
    addHistory(inputRef.current.innerHTML);
};

export default deleteAll;