import { Request, Response } from "express";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const mergeLyrics = async (req: Request, res: Response): Promise<void> => {
  const { lyrics1, lyrics2 } = req.body;

  if (!lyrics1 || !lyrics2) {
    res.status(400).json({ error: "Both lyrics1 and lyrics2 are required." });
    return;
  }

  try {
    const prompt = `You are a songwriting assistant. Merge the following two sets of lyrics into a cohesive and creative new song. Ensure the song has:
- A meaningful narrative that combines elements of both sets of lyrics.
- Clear verses, a chorus, and a bridge.
- Grammatically correct and meaningful lines.
- A tone that matches the mood of the lyrics.
 
First Lyrics: ${lyrics1}
Second Lyrics: ${lyrics2}

Merged Song:`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a songwriting assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 250,
      temperature: 0.7,
    });

    const mergedLyrics = response.choices[0]?.message?.content?.trim() || "Failed to generate lyrics.";
    res.status(200).json({ mergedLyrics });
  } catch (error) {
    console.error("Error merging lyrics:", error instanceof Error ? error.message : error);
    res.status(500).json({ error: "Failed to merge lyrics. Please try again later." });
  }
};


export const generateAlternativeLyrics = async (req: Request, res: Response): Promise<void> => {
  const { lyrics } = req.body;

  if (!lyrics) {
    res.status(400).json({ error: "Lyrics are required." });
    return;
  }

  try {
    const prompt = `You are a songwriting assistant. Enhance and rewrite the following lyrics creatively. 
    Ensure the new lyrics:
    - Maintain the original theme and tone.
    - Improve rhyme, flow, and language.
    - Add creative flair where appropriate.

    Original Lyrics: 
    ${lyrics}

    Enhanced Lyrics:`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a songwriting assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const alternativeLyrics = response.choices[0]?.message?.content?.trim() || "Failed to generate lyrics.";
    res.status(200).json({ alternativeLyrics });
  } catch (error) {
    console.error("Error generating alternative lyrics:", error instanceof Error ? error.message : error);
    res.status(500).json({ error: "Failed to generate alternative lyrics. Please try again later." });
  }
};