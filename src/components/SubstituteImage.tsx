import { useState } from 'react';
import { Loader2, Download, Sparkles, ImagePlus } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

// In-memory cache to persist images during the session
const imageCache = new Map<string, string[]>();

interface SubstituteImageProps {
  substitute: any;
}

export function SubstituteImage({ substitute }: SubstituteImageProps) {
  const cacheKey = substitute.id || substitute.name;
  
  const [images, setImages] = useState<string[]>(() => {
    return imageCache.get(cacheKey) || [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Construct an English prompt for better image generation results
      const prompt = `Create a beautiful, aesthetic, minimalist infographic illustration for a natural wellness practice. 
      Name: ${substitute.name}. 
      Category: ${substitute.type}. 
      Context: ${substitute.description}. 
      Style: Cyber-spiritual, dark background with glowing emerald and cyan accents, clean layout, highly detailed, botanical or ethereal elements depending on the category. No text or minimal abstract text.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        }
      });

      let base64 = '';
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            base64 = part.inlineData.data;
            break;
          }
        }
      }

      if (base64) {
        const newImageUrl = `data:image/png;base64,${base64}`;
        const updatedImages = [...images, newImageUrl];
        setImages(updatedImages);
        imageCache.set(cacheKey, updatedImages);
      } else {
        throw new Error('No image data returned');
      }
    } catch (err) {
      console.error('Error generating image:', err);
      setError('אירעה שגיאה ביצירת התמונה. נסה שוב מאוחר יותר.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${substitute.name}-illustration-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 border-t border-zinc-800/60 pt-8">
      {images.length > 0 && (
        <div className="space-y-4 mb-6 animate-in fade-in duration-500">
          <h3 className="text-lg font-bold text-zinc-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            גלריית המחשות ויזואליות
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((url, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden border border-zinc-800 group shadow-2xl">
                <img src={url} alt={`${substitute.name} ${index + 1}`} className="w-full h-auto object-cover aspect-video" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <button
                    onClick={() => handleDownload(url, index)}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2 rounded-full font-bold transition-transform hover:scale-105 shadow-xl text-sm"
                  >
                    <Download className="w-4 h-4" />
                    הורד תמונה
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && (
        <button
          onClick={generateImage}
          className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/50 text-emerald-400 rounded-2xl transition-all group shadow-lg"
        >
          {images.length > 0 ? (
            <ImagePlus className="w-5 h-5 group-hover:animate-pulse" />
          ) : (
            <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
          )}
          <span className="font-bold">
            {images.length > 0 ? 'חולל תמונה נוספת (AI)' : 'חולל תמונת המחשה (AI)'}
          </span>
        </button>
      )}

      {isLoading && (
        <div className="w-full h-64 bg-zinc-900/30 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-4 animate-pulse mt-4">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          <span className="text-sm text-zinc-400 font-mono">מצייר את החזון...</span>
        </div>
      )}

      {error && (
        <div className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center flex flex-col items-center gap-2 mt-4">
          <span>{error}</span>
          <button onClick={generateImage} className="text-red-300 underline hover:text-red-200 font-medium">נסה שוב</button>
        </div>
      )}
    </div>
  );
}
