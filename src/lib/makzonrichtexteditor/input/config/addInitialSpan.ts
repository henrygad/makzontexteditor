import cleanAndConvertInputs from "../../utils/cleanAndConvertInputs";

// Set up input initail span element
const addInitialSpan = (setContext: { new: boolean, context?: string }): string => { 
  if (!setContext.new && setContext.context) {
    return `<span class='block main-span'><span class='block child-span edit'>${cleanAndConvertInputs(setContext.context)}</span></span>`;
  }
  return "<span class='block main-span'><span class='block child-span'><br></span></span>";
};

export default addInitialSpan;
