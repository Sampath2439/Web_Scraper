
import { GoogleGenAI } from "@google/genai";

export async function scrapeWebsite(url: string, description: string, apiKey: string): Promise<string> {
  if (!apiKey) {
    throw new Error("Gemini API Key is not set. Please add it in the settings.");
  }
  
  const ai = new GoogleGenAI({ apiKey });
  const model = 'gemini-2.5-flash';
  
  const prompt = `
    You are an automated web scraper. Your ONLY job is to extract data from a given URL and format it as CSV.

    URL to scrape: ${url}
    Data to extract: "${description}"

    Instructions:
    1. Fetch the content of the provided URL.
    2. Parse the HTML and extract the data described.
    3. Format the extracted data into a CSV string. The first line must be the header row.
    4. Your response MUST ONLY be the raw CSV data. Do not include any other text, explanations, or markdown formatting.

    If you are absolutely unable to access the URL or find the specified data, your response MUST be a single line starting with "SCRAPING_FAILED:". For example: "SCRAPING_FAILED: The website is protected by a login page."
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    const text = response.text.trim();

    if (!text) {
      throw new Error("The AI returned an empty response. The website might be inaccessible or the request too complex.");
    }

    if (text.startsWith("SCRAPING_FAILED:")) {
      const reason = text.substring("SCRAPING_FAILED:".length).trim();
      throw new Error(reason || "The AI could not access the URL or find the requested data. The site might be protected or the data structure is not clear.");
    }
    
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // Provide more user-friendly messages for common API errors
        if (error.message.includes('API key not valid')) {
            throw new Error('Your Gemini API key is not valid. Please check it in the settings.');
        }
        throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while communicating with the AI.");
  }
}
