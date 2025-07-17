import { useRef} from "react";
import useClickOutSide from "../lib/makzonrichtexteditor/hooks/useClickOutSide";

type Props = {
    topic: string,
    setTopic: (topic: string) => void, loading: boolean,
    handleGenerate: (data: string) => void
    isOpen: boolean,
    setIsOpen: (value: boolean) => void


}

const AIcontentgenerator = ({ topic, setTopic, loading, isOpen, setIsOpen, handleGenerate }: Props) => {
    const ref = useRef(null);
    useClickOutSide(ref, () => setIsOpen(false));

    return <div className="relative" ref={ref}>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-100 active:bg-blue-500 cursor-pointer"
        >
            <span className="text-white font-bold">
                ✨ Generate Blog Post
            </span>
        </button>

        {isOpen && (
            <div
                className="fixed top-1/3 left-1/2 -translate-x-1/3 -translate-y-1/2 flex flex-col gap-2 p-4 bg-black/50 shadow-md rounded z-50"
                onClick={(e) => e.preventDefault()}
            >
                <textarea
                    className="flex flex-1 min-w-[240px] sm:min-w-[320px] h-auto w-auto border border-slate-300 p-3 rounded-md outline-none resize-none"
                    rows={3}
                    placeholder="What blog topic do you want?"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    autoFocus={true}
                />
                <button
                    onClick={() => handleGenerate(topic)}
                    disabled={loading}
                    className="flex justify-center items-center py-3 px-6 sm:px-10 bg-green-800 border border-green-200 rounded-xl transition-colors duration-100 active:bg-green-700 cursor-pointer"
                >
                    <span className="text-white font-bold">
                        {loading ? "Generating..." : "Generate"}
                    </span>
                </button>
            </div>
        )}

    </div>;
};

export default AIcontentgenerator;
