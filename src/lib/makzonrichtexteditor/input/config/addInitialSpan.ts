import cleanAndConvertInputs from "../../utils/cleanAndConvertInputs";

// Set up input initail span element
const insertInitailSpan = (setContext: { new: boolean, context?: string }): string => {
  if (!setContext.new && setContext.context) {
    return ` <span class='block main-span'><span span class='block child-span'>${cleanAndConvertInputs(setContext.context)}</span></span>`;
  }
  return "<span class='block main-span'><span class='block child-span'><br></span></span>";
};

export default insertInitailSpan;
