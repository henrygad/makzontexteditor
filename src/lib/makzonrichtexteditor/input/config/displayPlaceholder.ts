
// Func to display input place holder when no inner html or text is avialable
const displayPlaceholder = (
    inputRef: React.RefObject<HTMLDivElement | null>) => {
    if (!inputRef.current) return;

    const mainSpan = inputRef.current.firstElementChild;
    if (!mainSpan) return;
    
    const children = Array.from(mainSpan.children);        

    for (const child of children) {
        const isNotEmpty = child.innerHTML.replace("<br>", "").trim() !== "";
        const placeHolder_ele = inputRef.current.previousElementSibling;
        if (isNotEmpty) {
            if (placeHolder_ele && placeHolder_ele.className.includes("place-holder")) {
                placeHolder_ele.classList.remove("block");
                placeHolder_ele.classList.add("hidden");
            }
            return;
        }
        if (placeHolder_ele && placeHolder_ele.className.includes("place-holder")) {
            placeHolder_ele.classList.remove("hidden");
            placeHolder_ele.classList.add("block");
        }
    }

};

export default displayPlaceholder;
