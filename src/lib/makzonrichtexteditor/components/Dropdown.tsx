import { ReactElement, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import useClickOutSide from "../hooks/useClickOutSide";

type Props = {
    id: string
    fieldName: string | ReactElement,
    children: ReactElement
    className?: string
}

const Dropdown = ({ id,
    fieldName,
    className = "",
    children
}: Props) => {
    const [drop, setDrop] = useState(false);
    const dropRef = useRef(null);
    
    useClickOutSide(dropRef, () => {
        setDrop(false);
        if (drop) {
            document.body.classList.remove("overflow-hidden");            
        }
    });

    const handleDrop = () => {
        if (!drop) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        setDrop(!drop);
    };

    return <div
        id={id}
        ref={dropRef}        
    >
        <button
            className={`${className} flex gap-1 items-center`}
            onClick={handleDrop}
        >
            {fieldName}
            <IoIosArrowDown
                className={`${drop ? "rotate-180" : ""}`}
                scale={10}
            />
        </button>
        {drop ?
            <div className="absolute top-1/2 right-1 left-1 -translate-y-1/2 bg-white z-10 shadow-md ">
                <div className="w-full flex gap-3 items-center flex-wrap p-4 border">
                    {children}
               </div>
            </div> :
            null
        }
    </div>;
};

export default Dropdown;
