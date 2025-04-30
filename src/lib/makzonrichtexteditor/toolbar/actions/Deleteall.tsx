import { RiDeleteBin5Line } from "react-icons/ri";
import deleteAll from "../../utils/deleteAll";

type Props = {
  inputRef: React.RefObject<HTMLDivElement | null>
};

const Deleteall = ({ inputRef }: Props) => {
  
  const handleDeleteAll = () => { 
    deleteAll(inputRef);
  };
  return <>
    <button className="block cursor-pointer" onClick={handleDeleteAll} >
      <RiDeleteBin5Line size={19} />
    </button>
  </>;
};

export default Deleteall;
