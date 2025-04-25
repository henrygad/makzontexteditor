
import { useRef, useState } from "react";
import Makzontexteditor from  "./lib/index";
import { getValue } from "./lib/makzonrichtexteditor/type";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const editorRef = useRef(null);
  const [getContext, setGetContext] = useState<getValue>();

  return <Routes>
    <Route path="/" element={
      <div className="container">
        <Makzontexteditor
          editorRef={editorRef}
          wrapperClassName="h-full w-full"
          toolBarClassName="w-full border p-4"
          inputClassName="w-full min-h-[480px] max-h-[480px] p-4 border"
          placeholderValue="Start writing..."
          useToolBar={{
            useInline: {
              heading: true,
              font: true,
              size: true,
              bold: true,
              italic: true,
              underline: true,
              textTransform: true,
              anchorlink: true,
              textColor: true,
              backGroundColor: true,
              alignment: true,
              listing: true,
              emoji: true,
            },
            useBlock: true,
            useDelete: true,
            useHistor: true,
          }}
          autoFocus={true}
          addValue={{
            createNew: true,
            data: "",
          }}
          setGetValue={(value) => {
            console.log(value);
          }}
        /*  handleLocalFile={handleLocalFile}
         handleGalaryFile={handleGalaryFile}
         onFileAdd={uploadFile} */
        />
      </div>
    } />
  </Routes>; 
};

export default App;
