
const wantedHtmlTag: string[] = ["span", "ul", "ol", "li", "a", "code", "video", "img", "br"];


const clean = (childELe: HTMLElement, parentEle: HTMLElement, checkTopLevel: boolean) => {   
    let span_ele: HTMLSpanElement | null = null;

    // Check if the child element is a wanted HTML tag
    if (!wantedHtmlTag.includes(childELe.tagName.toLowerCase())) {

        // Then create a  new span element and set its innerHTML to the child element's innerHTML
        // and replace the child element with the new span element
        span_ele = document.createElement("span");             
        span_ele.innerHTML = childELe.innerHTML || "<br>";

        if (checkTopLevel) {
            if (childELe.tagName.toLowerCase() === "div") {
                span_ele.className = "child-span block";  
            }
        }     
        parentEle.replaceChild(span_ele, childELe);
    }

    // If child span is in top most level,
    if (checkTopLevel) {
        // Then, add "child-span" to child element class if no one found
        if (!childELe.className.includes("child-span")) {        
            childELe.classList.add("child-span");
        }
    
        // And add "child-span" to child element class if no one found
        if (!childELe.className.includes("block")) {
            // Then add the class "block" to the child element
            childELe.classList.add("block");
        }             
    }


    if (childELe.tagName.toLowerCase() === "ul" ||
        childELe.tagName.toLowerCase() === "ol"
    ) { 
        if (!childELe.className.includes("list-disc ml-5")) {
            childELe.removeAttribute("style");

            if (childELe.tagName.toLowerCase() === "ul") {
                childELe.classList.add(...["list-disc", "ml-5"]);
            } else {
                childELe.classList.add(...["list-decimal", "ml-5"]);
            }
        }
        
        if (checkTopLevel) {
            span_ele = document.createElement("span");  
            span_ele.classList.add(...["block", "child-span"]);
            parentEle.replaceChild(span_ele, childELe);
            span_ele.append(childELe);
        }   
    }
    

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


const cleanAndConvertInputs = (ele: string, checkTopLevel: boolean): ChildNode[] => {   
    const wrapper_ele = document.createElement("span");
    wrapper_ele.innerHTML = ele;

    if (ele.trim() &&
        wrapper_ele.children.length === 0
    ) {
        const newChild = document.createElement("span");
        newChild.innerHTML = ele;
        wrapper_ele.appendChild(newChild);
    }
     
    const childernEle = Array.from(wrapper_ele.children);

    for (const childELe of childernEle) {
        // Top level cleaning
        // Check if the child element is a wanted HTML tag
        clean(childELe as HTMLElement, wrapper_ele, checkTopLevel);
    }

    // Return the child nodes of the wrapper element that are of type ELEMENT_NODE
    return Array.from(wrapper_ele.childNodes).filter((node) => node.nodeType === Node.ELEMENT_NODE) as ChildNode[];
};

export default cleanAndConvertInputs;
