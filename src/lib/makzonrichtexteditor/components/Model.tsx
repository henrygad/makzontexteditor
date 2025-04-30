import { ReactElement, useEffect, useRef, useState } from "react";
import useLocation from "../hooks/useLocation";
type Props = {
  id: string;
  children: ReactElement;
};

const Model = ({ id, children }: Props) => {  
  const location = useLocation();
  const currentModelIdRef = useRef("");
  const lastHashIdRef = useRef("");
  const [displayModel, setDisplayModel] = useState(false);

  const handleDisplayModel = (hash: string, id: string) => {
    const hashId = hash.trim().slice(1);      

    if (hashId &&
      hashId.trim() === id.trim()
    ) {      
      currentModelIdRef.current = id;      
      lastHashIdRef.current = hashId;
      setDisplayModel(true); 
      document.body.classList.add("overflow-hidden");     
    } else {      
      if (lastHashIdRef.current === currentModelIdRef.current) {        
        setDisplayModel(false);
        if(displayModel)document.body.classList.remove("overflow-hidden");
      }
    }

    return () => document.body.classList.remove("overflow-hidden");
  };
 
  const handlePopState = () => {
    handleDisplayModel(location.hash, id);
  };

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    displayModel ?
      <div
        id={id}
        className="block fixed top-0 bottom-0 right-0 left-0 w-full h-full bg-gray-600/55 z-50"
      >
        <div className="container relative w-screen h-screen max-w-full max-h-screen flex justify-center items-center overflow-hidden">
          {children}
        </div>
      </div > :
      null
  );
};

export default Model;
