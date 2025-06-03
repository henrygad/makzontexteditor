
const stopAllOutDeleteInInput = (e: React.KeyboardEvent,
    inputRef: React.RefObject<HTMLDivElement | null>,
    handleGlobalChangesOnInputArea: () => void) => {

    // Stop deleting last span element in input area
    // when pressing backspace or delete key
    if (!inputRef.current || (e.key !== "Backspace" && e.key !== "Delete")) return;

    // Get main child span element
    const mainSpanEle = inputRef.current.firstChild;
    if (!mainSpanEle) return;

    // Get child nodes of main span element
    const childNodes = Array.from(mainSpanEle.childNodes);
       // .filter(node => node.TEXT_NODE);

    // Get first child span element
    const childSpanEle = childNodes[0];

    // Get selected nde or nodeText
    const selection = document.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const { startContainer, startOffset } = range;

    // 1) Caret is inside the first child span element...
    const isInchildSpanEle = startContainer === childSpanEle || childSpanEle.contains(startContainer);

    // 2) …and caret is at very start or end.       
    const atStart = startOffset === 0;  
    
    if (isInchildSpanEle && atStart) {

        // However, If caret is at start of first child span element
        // and first child span element has only one child node            
        if (childSpanEle.firstChild &&
            childSpanEle.firstChild.nodeName !== "BR") {

            // Replace firstchild of first child span element to <br>
            childSpanEle.firstChild.replaceWith(document.createElement("br"));

            // Update global change func
            handleGlobalChangesOnInputArea();
        }

        // 3) then, Prevent removing last span
        e.preventDefault();
    }

};


export default stopAllOutDeleteInInput;