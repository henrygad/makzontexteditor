import { RiDeleteBin5Line } from "react-icons/ri";

type Props = {
    deleteAll: () => void
};

const Deleteall = ({deleteAll}: Props) => {
    
  return <>
    <button className="block cursor-pointer" onClick={deleteAll} >
      <RiDeleteBin5Line size={19} />
    </button>
  </>;
};

export default Deleteall;
