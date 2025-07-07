import axios from "axios";

const useAIGenerateContent = () => {

    const aiGenerateContent = async (topic: string): Promise<{ context: string }> => {
        // Step 1: Generate blog post with image prompt    
        const res = await axios.post("https://localhost:3000/api/generateaicontent", { topic });

        // Get blog content from response
        const context = res.data.content;

        return { context };
    };

    return aiGenerateContent;
};


export default useAIGenerateContent;
