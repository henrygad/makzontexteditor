import { resetSelection } from "../commands/cmd.utils";
import getSelection from "./getSelection";

const wantedHtmlTag: string[] = ["span", "ul", "ol", "li", "a", "code", "video", "img", "br"];

const deleteUnwantedHtml = () => {    
    const selections = getSelection(); // get the selected node properties
    const { selection, range, node } = selections;
    
    if (node && node.parentElement) {        
        // Check if the node is not in the wantedHtmlTag array
        // If not, replace it with a span element
        if (!wantedHtmlTag.includes(node.nodeName.toLowerCase())) {

            // Create a new span element and replace the node with it
            // Set the innerHTML of the span element to the text content of the node
            const span_ele = document.createElement("span");  
            span_ele.innerHTML = node.textContent || "<br>";   
            //span_ele.classList.add(...["child-span", "block"]);
            node.parentElement.replaceChild(span_ele, node);

            // Set the selection to the new span element
            resetSelection(span_ele, selection, range);
        }
    }
};

export default deleteUnwantedHtml;
