import { GoogleGenAI, Type } from '@google/genai';
import { Experience } from '../data/experiences';

export async function generateSubstitute(experience: Experience): Promise<{ type: string; name: string; description: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing Gemini API Key');
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an expert in holistic health, neuroscience, and alternative states of consciousness.
    A user wants to find a healthy, natural, and legal substitute for the following experience:
    
    Name: ${experience.name}
    Active Ingredients: ${experience.activeIngredients.join(', ')}
    Brain Effect: ${experience.brainEffect}
    Mechanism: ${experience.mechanism}
    Positive Effects: ${experience.positiveEffects.join(', ')}
    
    Generate a new, unique "Holy Substitute" that can mimic or provide a similar positive effect or brain state, but in a completely natural and safe way.
    It should be one of the following types: 'plants', 'breathing', 'meditation', 'music', 'movement', or 'other'.
    
    Provide the response in JSON format matching this schema:
    {
      "type": "one of: plants, breathing, meditation, music, movement, other",
      "name": "A catchy name for the substitute in Hebrew",
      "description": "A detailed explanation of what it is and how it mimics the original experience's effects, written in Hebrew. Use rich Markdown formatting: include headings, bullet points, bold text, and even tables if relevant. Make it look like a comprehensive guide."
    }
    
    Make it creative, scientifically grounded, and practical. Do not repeat the exact substitutes already listed for this experience.
    The output MUST be in Hebrew (except for the 'type' field which must be one of the English enum values). The description should be a well-structured Markdown document.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: {
              type: Type.STRING,
              description: "The category of the substitute",
              enum: ["plants", "breathing", "meditation", "music", "movement", "other"]
            },
            name: {
              type: Type.STRING,
              description: "The name of the substitute"
            },
            description: {
              type: Type.STRING,
              description: "The description of the substitute"
            }
          },
          required: ["type", "name", "description"]
        }
      }
    });

    if (!response.text) {
      throw new Error('No response from AI');
    }

    const result = JSON.parse(response.text);
    
    // Fix potential double-escaped newlines and markdown formatting issues
    if (result.description && typeof result.description === 'string') {
      result.description = result.description
        .replace(/\\n/g, '\n') // Fix literal \n strings
        .replace(/^(#{1,6})([^#\s])/gm, '$1 $2'); // Ensure space after heading hashes
    }
    
    return result;
  } catch (error) {
    console.error('Error generating substitute:', error);
    throw error;
  }
}
