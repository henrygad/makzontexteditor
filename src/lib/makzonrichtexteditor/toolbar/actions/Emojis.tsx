import { useState } from "react";
import { emojiProps } from "../../type";
import inlineCmd from "../../commands/inline.cmd";
import Dropdown from "../../components/Dropdown";


const Emojis = ({
    arrOfEmojis,
    getNodesWithinTextEditor,
    handleGlobalChangesOnInputArea,
}: emojiProps) => {
    const [currentEmoji, setCurrentEmoji] = useState(arrOfEmojis?.[0]);

    const handleInserEmojis = (emoji: string) => {
        inlineCmd("insert", getNodesWithinTextEditor(), { value: emoji, style: [] });
        setCurrentEmoji(emoji);
        handleGlobalChangesOnInputArea();
    };

    return <Dropdown
        id="emji"
        fieldName={currentEmoji}        
        children={
            <>
                {
                    arrOfEmojis &&
                        arrOfEmojis.length ?
                        arrOfEmojis.map((emoji) =>
                            <button
                                key={emoji}
                                className="w-[30px] h-[30px] text-base shadow-md"
                                onClick={() => handleInserEmojis(emoji)}
                            >
                                {emoji}
                            </button>
                        ) :
                        null
                }
            </>
        }
    />;
};

export default Emojis;
