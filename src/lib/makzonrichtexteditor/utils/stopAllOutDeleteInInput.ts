
const stopAllOutDeleteInInput = (e: React.KeyboardEvent,
    inputRef: React.RefObject<HTMLDivElement | null>,
    handleGlobalChangesOnInputArea: () => void) => {

    // Stop deleting last span element in input area
    // when pressing backspace or delete key
    if (!inputRef.current ||
        (e.key !== "Backspace" && e.key !== "Delete")) return;

    // Get main child span element
    const mainSpanEle = inputRef.current.firstChild;
    if (!mainSpanEle) return;

    // Get child nodes of main span element
    const childNodes = Array.from(mainSpanEle.childNodes);        

    if (childNodes.length === 1 &&
        childNodes[0].nodeName === "SPAN"
    ) {

        // Get first child span element
        const firstChildSpanEle = childNodes[0];

        const selection = document.getSelection();
        if (!selection ||
            !selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const { startContainer, startOffset } = range;

        // 1) Caret is inside the first child span element...
        const isInfirstChildSpanEle = startContainer ===
            firstChildSpanEle || firstChildSpanEle.contains(startContainer);

        // 2) …and caret is at very start or end.       
        const atStart = startOffset === 0;

        if (isInfirstChildSpanEle && (atStart)) {

            // However, If caret is at start of first child span element
            // and first child span element has only one child node            
            if (firstChildSpanEle.firstChild &&
                firstChildSpanEle.firstChild.nodeName !== "BR") {

                // Replace firstchild of first child span element to <br>
                firstChildSpanEle.firstChild.replaceWith(document.createElement("br"));

                // Update global change func
                handleGlobalChangesOnInputArea();
            }

            // 3) then, Prevent removing last span
            e.preventDefault();
        }
    }
};


export default stopAllOutDeleteInInput;