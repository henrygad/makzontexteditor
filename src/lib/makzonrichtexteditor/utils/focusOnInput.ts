
const focusOnInput = (inputRef: React.RefObject<HTMLDivElement | null>, delay: number) => {
  const clear = setTimeout(() => {
    // Get window seletion api
    const selection = window.getSelection();

    if (!inputRef.current || !selection) return;

    // place the caret back inside contenteditable div 
    const mainSpanEle = inputRef.current.firstElementChild;
    if (!mainSpanEle) return;            

    const range = document.createRange();
    range.setStart(mainSpanEle, mainSpanEle.childNodes.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    selection.collapseToEnd();

    clearTimeout(clear);
  }, delay);
};

export default focusOnInput;
