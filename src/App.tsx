
import { useEffect, useRef, useState } from "react";
import Makzontexteditor, { deleteAll } from "./lib/index";
import useGetLocalFiles from "./hooks/useGetLocalFiles";

const App = () => {
  const editorRef = useRef(null);
  const [getContext, setGetContext] = useState({});
  const [setContext, setSetContext] = useState("");

  const { loading, getLocalFiles } = useGetLocalFiles();

  const deleteAllContent = () => {
    deleteAll(editorRef);
  };


  useEffect(() => {
    setSetContext(`
      <div class="chch">this is a div</div>
      <span class="">some to edit from <span>chicking</span> </span>
      <span class="child-span block">and this div to span</span>
      <span class="child-span block">how are you doing</span>
      <ul>
       <li>List one</li>
      </ul>
      <span class="child-span block">ho you god</span>
    `);
  }, []);

  //console.log(getContext);

  return <div className="container flex justify-center items-center min-h-screen w-full">
    <Makzontexteditor
      inputRef={editorRef}
      wrapperClassName="h-full w-full"
      toolBarClassName="w-full border p-4"
      inputClassName="w-full min-h-[480px]  p-4 border"
      placeholder="Start writing..."
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
      setContext={{
        new: true,
        context: setContext,
      }}
      getValue={setGetContext}
      handleLocalFile={async (FileList) => {
        const files = await getLocalFiles(FileList);
        if (files) {
          return files[0].url;
        }

        return "";
      }}
      handleGalary={async () => {
        return "";
      }}
      onAddFile={async (blobValue, stringValue) => {
        return stringValue;
      }}
    />
    <button onClick={deleteAllContent}>delete all</button>
  </div>;
};

export default App;


/* 
Bump the version:
npm version patch (or minor / major)

Rebuild:
yarn build

Publish again:
npm publish --access public
*/
