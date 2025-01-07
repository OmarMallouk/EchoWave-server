import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

/**

 * @param {string} lyrics1 
 * @param {string} lyrics2 
 * @returns {Promise<string>} 
 */
export const mergeLyrics = async (lyrics1: string, lyrics2: string): Promise<string> => {
  try {
    const prompt = `You are a songwriting assistant. Merge the following two sets of lyrics into a cohesive and creative new song. 

  } catch (error) {
    console.error("Error merging lyrics with AI:", error instanceof Error ? error.message : "Unknown error");
    throw new Error("Failed to merge lyrics.");
  }
};
