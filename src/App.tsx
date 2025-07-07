
import { useEffect, useRef, useState } from "react";
import Makzontexteditor, { deleteAll } from "./lib/index";
import useGetLocalFiles from "./hooks/useGetLocalFiles";
import { getValue } from "./lib/makzonrichtexteditor/type";
import useAIGenerateContent from "./hooks/useAIGenerateContent";
import AIcontentgenerator from "./ui/AIcontentgenerator";

const App = () => {
  const editorRef = useRef(null);
  const [getContext, setGetContext] = useState<getValue>({ _html: "", text: "" });
  const [setContext, setSetContext] = useState<{ new: boolean, context: string }>({ new: true, context: "" });
  const [openGenAIModal, setOpenGenAIModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topicToGenerate, setTopicToGenerate] = useState("");
  const { getLocalFiles } = useGetLocalFiles();
  const aiGenerateContent = useAIGenerateContent();

  const deleteAllContent = () => {
    deleteAll(editorRef);
  };

  const handleSumbitContent = (data: getValue) => {
    console.log(data);
  };

  const handleGenerate = async (topic: string) => {
    setLoading(true);
    try {
      const { context } = await aiGenerateContent(topic);
      setSetContext({ new: false, context });
      setTopicToGenerate("");
      setOpenGenAIModal(false);
    } catch (err) {
      console.log("Something went wrong.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // setSetContext({
    //   new: false,
    //   context: `<div class="chch">this is a div</div>
    //     <span class="">some to edit from <span>chicking</span> </span>
    //     <span class="child-span block">and this div to span</span>
    //     <span class="child-span block">how are you doing</span>
    //     <ul>
    //     <li>List one</li>
    //     </ul>
    //   <span class="child-span block">ho you god</span>`
    // });
  }, []);

  return <>
    <header className="container">
      <div className="p-2 border-b">
        <nav>
          <ul>
            <li>
              {/* <button
              onClick={deleteAllContent}
              className="font-text font-medium text-base bg-red-800 text-white px-3 py-1.5 rounded-md shadow"
            >
              Delete all
            </button> */}
            </li>
          </ul>
        </nav>
        {/* ai content generator section */}
        <section>
          <div className="relative flex justify-end items-baseline">
            <AIcontentgenerator
              topic={topicToGenerate}
              setTopic={setTopicToGenerate}
              loading={loading}
              isOpen={openGenAIModal}
              setIsOpen={setOpenGenAIModal}
              handleGenerate={handleGenerate}
            />
          </div>
        </section>
      </div>
    </header>
    <main className="container mt-4">
      {/* rich text editor section */}
      <section className="flex justify-center items-center">
        <Makzontexteditor
          inputRef={editorRef}
          wrapperClassName="h-full w-full"
          toolBarClassName="w-full border p-4 rounded-right rounded-tr rounded-tl bg-slate-50 shadow-inner"
          inputClassName="w-auto min-h-[768px] max-h-[768px] overscroll-auto overflow-y-auto p-4 border"
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
          setContext={setContext}
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
      </section>
    </main>
    <footer>
      {/* submit button section */}
      <section className="relative">
        <div className="fixed  right-0 left-0 bottom-8 flex justify-center items-center p-3">
          <button
            className="flex justify-center items-center py-3 px-6 sm:px-10 bg-green-800 border border-green-200 rounded-full transition-colors duration-100  active:bg-green-700 cursor-pointer"
            disabled={!getContext.text.trim()}
            onClick={() => handleSumbitContent(getContext)}
          >
            <span className="text-white font-bold">Submit</span>
          </button>
        </div>
      </section>
    </footer>
  </>;
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
