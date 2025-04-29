

// Util to focus caret into input

const focusOnInput = (inputRef: React.RefObject<HTMLDivElement | null>, delay: number) => {
  const clear = setTimeout(() => {
    // Get window seletion api
    const selection = window.getSelection();

    if (!inputRef.current || !selection) return;

    // place the caret back inside contenteditable div            
    const mainSpan = inputRef.current.firstElementChild;
    if (!mainSpan) return;
    const lastChildSpan = mainSpan.firstElementChild;
    if (!lastChildSpan) return;

    const range = document.createRange();
    range.setStart(lastChildSpan, lastChildSpan.childNodes.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    selection.collapseToEnd();

    clearTimeout(clear);
  }, delay);
};

export default focusOnInput;
