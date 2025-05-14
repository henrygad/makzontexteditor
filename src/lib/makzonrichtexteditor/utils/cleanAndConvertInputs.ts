

// Utills to clean up inputed ele;

const wantedHtmlTag: string[] = ["span", "ul", "ol", "li", "a", "code", "video", "img", "br"];


const clean = (childELe: HTMLElement, parentEle: HTMLElement) => {
    let span_ele: HTMLSpanElement | null = null;

    if (!wantedHtmlTag.includes(childELe.tagName.toLowerCase())) {
         span_ele = document.createElement("span");
        span_ele.innerHTML = childELe.innerHTML || "<br>";
        if (childELe.className) span_ele.className = childELe.className;
        else if (childELe.tagName.toLowerCase() === "div") span_ele.className = "block child-span";        
        parentEle.replaceChild(span_ele, childELe);        
    }

    if (span_ele) {
        const childernEle = Array.from(span_ele.children);
        for (const nestedChildEle of childernEle) {            
            clean(nestedChildEle as HTMLElement, span_ele);
        }
    } else {
        const childernEle = Array.from(childELe.children);
        for (const nestedChildEle of childernEle) {
            clean(nestedChildEle as HTMLElement, childELe);
        }
        
    } 
};


const cleanAndConvertInputs = (ele: string) => {
    const wrapper_ele = document.createElement("span");
    wrapper_ele.innerHTML = ele;
    const childernEle = Array.from(wrapper_ele.children);

    for (const childELe of childernEle) {
        clean(childELe as HTMLElement, wrapper_ele);
    }  
    return wrapper_ele.innerHTML;
};

export default cleanAndConvertInputs;
