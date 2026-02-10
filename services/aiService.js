const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: "./config.env" });

// Initialize the API client
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

exports.askAI = async (question) => {
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set.');
    return 'API_KEY_MISSING';
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    const prompt = `Answer the following question in a SINGLE word only. No punctuation, just the word. Question: ${question}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up response to ensure single word
    return text.trim().split(/\s+/)[0] || 'Unknown';
  } catch (error) {
    console.error('Error fetching AI response:', error.message || error);
    return 'Error';
  }
};