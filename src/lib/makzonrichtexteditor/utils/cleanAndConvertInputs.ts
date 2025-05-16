
const wantedHtmlTag: string[] = ["span", "ul", "ol", "li", "a", "code", "video", "img", "br"];


const clean = (childELe: HTMLElement, parentEle: HTMLElement, isTopLevel: boolean) => {
    
    let span_ele: HTMLSpanElement | null = null;

    // Check if the child element is a wanted HTML tag
    if (!wantedHtmlTag.includes(childELe.tagName.toLowerCase())) {

        // Then create a new span element and set its innerHTML to the child element's innerHTML
        // and replace the child element with the new span element
        span_ele = document.createElement("span");
        span_ele.innerHTML = childELe.innerHTML || "<br>";        

        if (childELe.tagName.toLowerCase() === "div") {
            span_ele.className = "child-span block";
        } else if (childELe.className) {            
            span_ele.className = childELe.className;
        }

        parentEle.replaceChild(span_ele, childELe);
    }

    
    if (isTopLevel) { // If this is the top level, we need to add the class "child-span" and "block" to the child element

        // Check if the child element already has the class "child-span" and "block"
        if (!childELe.className.includes("child-span")) {
            // Then add the class "child-span" to the child element
            childELe.classList.add("child-span");
        }        

        if (!childELe.className.includes("block")) {
            // Then add the class "block" to the child element
            childELe.classList.add("block");
        }
    }

    // Remove the class "child-span" and "block" from the child element
    childELe.removeAttribute("style");

    if (span_ele) {// If the span element is not null, then we need to clean its children

        // Then get the children of the span element and clean them
        const childernEle = Array.from(span_ele.children);

        for (const nestedChildEle of childernEle) {
            // Check if the child element is a wanted HTML tag
            clean(nestedChildEle as HTMLElement, span_ele, false);
        }
    } else { // If the span element is null, then we need to clean the children of the child element
        const childernEle = Array.from(childELe.children);
        for (const nestedChildEle of childernEle) {
            // Check if the child element is a wanted HTML tag
            clean(nestedChildEle as HTMLElement, childELe, false);
        }

    }
};


const cleanAndConvertInputs = (ele: string, isTopLevel: boolean = true): ChildNode[] => {
    const wrapper_ele = document.createElement("span");
    wrapper_ele.innerHTML = ele;
    const childernEle = Array.from(wrapper_ele.children);

    for (const childELe of childernEle) {
        // Top level cleaning
        // Check if the child element is a wanted HTML tag
        clean(childELe as HTMLElement, wrapper_ele, isTopLevel);
    }

    // Return the child nodes of the wrapper element that are of type ELEMENT_NODE
    return Array.from(wrapper_ele.childNodes).filter((node) => node.nodeType === Node.ELEMENT_NODE) as ChildNode[];
};

export default cleanAndConvertInputs;
