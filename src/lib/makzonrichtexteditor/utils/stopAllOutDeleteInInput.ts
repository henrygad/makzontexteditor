

// Util func to stop deleting input element on last span element

const stopAllOutDeleteInInput = (e: React.KeyboardEvent,
    inputRef: React.RefObject<HTMLDivElement | null>,
    handleGlobalChangesOnInputArea: () => void) => {
    if (!inputRef.current) return;

    // Only care about backward/deletion inputs
    if (e.key !== "Backspace" && e.key !== "Delete") return;

    // If your editor main span only has one child and it’s a <span>
    const editorMainSpan = inputRef.current.firstChild;
    if (
        editorMainSpan &&
        editorMainSpan.childNodes.length === 1 &&
        editorMainSpan.firstChild &&
        editorMainSpan.firstChild.nodeName === "SPAN"
    ) {
        const lastSpan = editorMainSpan.firstChild;

        const selection = document.getSelection();
        if (!selection) return;
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const { startContainer, startOffset } = range;

        // 1) Caret is inside the  last child span...
        const isInLastSpan = startContainer === lastSpan || lastSpan.contains(startContainer);

        // 2) …and caret is at very start or end.       
        const atStart = startOffset === 0;

        if (isInLastSpan && (atStart)) {

            // 3) Replace firstchild of last child span to <br>
            if (lastSpan.firstChild &&
                lastSpan.firstChild.nodeName !== "BR") {
                lastSpan.firstChild.replaceWith(document.createElement("br"));
                // Update global change func
                handleGlobalChangesOnInputArea();
            }

            // Prevent removing last span
            e.preventDefault();
        }
    }
};


export default stopAllOutDeleteInInput;