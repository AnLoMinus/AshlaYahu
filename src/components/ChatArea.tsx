import { useState, useEffect, useRef } from 'react';
import { User } from 'firebase/auth';
import { db, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, setDoc } from '../lib/firebase';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { ExportMenu } from './ExportMenu';

interface ChatAreaProps {
  user: User;
  chatId: string | null;
  onChatCreated: (id: string) => void;
}

export function ChatArea({ user, chatId, onChatCreated }: ChatAreaProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }

    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, (error) => {
      console.error('Error fetching messages:', error);
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    let currentChatId = chatId;

    try {
      // Create chat if it doesn't exist
      if (!currentChatId) {
        const chatRef = await addDoc(collection(db, 'chats'), {
          userId: user.uid,
          title: userMessage.substring(0, 30) + (userMessage.length > 30 ? '...' : ''),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        currentChatId = chatRef.id;
        onChatCreated(currentChatId);
      } else {
        // Update chat timestamp
        await setDoc(doc(db, 'chats', currentChatId), {
          updatedAt: serverTimestamp()
        }, { merge: true });
      }

      // Add user message to Firestore
      await addDoc(collection(db, 'chats', currentChatId, 'messages'), {
        role: 'user',
        userId: user.uid,
        content: userMessage,
        createdAt: serverTimestamp()
      });

      // Call Gemini API
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `
        אתה "המנוע החכם" של Holly Hype.
        המטרה שלך היא לעזור לאנשים להמיר חוויות של "סטלות" (סמים, אלכוהול, חומרים משני תודעה) לחוויות מודעות, טבעיות ובריאות.
        
        כשמשתמש מבקש חוויה מסוימת (למשל "אני רוצה להרגיש אופוריה" או "אני רוצה להירגע כמו אחרי ג'וינט"):
        1. הסבר בקצרה מה קורה במוח (איזה הורמונים/נוירוטרנסמיטורים מעורבים).
        2. הצע "תחליפים קדושים" טבעיים: צמחים, תרגילי נשימה, מדיטציות, מוזיקה, תנועה.
        3. תן תוכנית פעולה קצרה.
        
        הטון שלך צריך להיות: מכיל, לא שיפוטי, רוחני אך מבוסס מדע (Cyber/Spiritual), מעצים ומקצועי.
        ענה תמיד בעברית. השתמש באימוג'יז מתאימים.
      `;

      // Format previous messages for context
      const history = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      const prompt = `${systemInstruction}\n\nהיסטוריית שיחה:\n${history}\n\nUser: ${userMessage}\nAssistant:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
      });

      const aiResponse = response.text || 'מצטער, לא הצלחתי לעבד את הבקשה כרגע.';

      // Add AI message to Firestore
      await addDoc(collection(db, 'chats', currentChatId, 'messages'), {
        role: 'assistant',
        content: aiResponse,
        createdAt: serverTimestamp()
      });

    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally add an error message to the UI
    } finally {
      setIsLoading(false);
    }
  };

  const generateChatMarkdown = () => {
    let md = `# שיחה עם המנוע החכם - Holy\n\n`;
    messages.forEach(msg => {
      const role = msg.role === 'user' ? 'אני' : 'המנוע החכם';
      md += `**${role}:**\n${msg.content}\n\n---\n\n`;
    });
    return md;
  };

  const generateChatHtml = () => {
    return messages.map(msg => {
      const role = msg.role === 'user' ? 'אני' : 'המנוע החכם';
      const bgColor = msg.role === 'user' ? '#f3f4f6' : '#e5e7eb';
      return `
        <div style="margin-bottom: 20px; padding: 15px; border-radius: 10px; background-color: ${bgColor};">
          <strong>${role}:</strong>
          <div style="margin-top: 10px;">${msg.content.replace(/\n/g, '<br/>')}</div>
        </div>
      `;
    }).join('');
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950/50 relative">
      {messages.length > 0 && (
        <div className="absolute top-4 left-4 z-10">
          <ExportMenu 
            title="שיחה עם המנוע החכם - Holy" 
            markdownContent={generateChatMarkdown()}
            htmlContent={generateChatHtml()}
          />
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
              <Sparkles className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-4">ברוך הבא למנוע מסע התודעה</h2>
            <p className="text-zinc-400 mb-8">
              ספר לי איזו חוויה אתה מחפש. אופוריה? רוגע עמוק? אנרגיה מתפרצת?
              אני כאן כדי לבנות לך מסע טבעי ומדויק.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[
                "אני רוצה להרגיש אופוריה טבעית",
                "איך אפשר להירגע עמוק בלי חומרים?",
                "אני צריך בוסט של אנרגיה ופוקוס",
                "איך מגיעים למצב של ניתוק וריחוף?"
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setInput(suggestion)}
                  className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-emerald-500/30 text-zinc-300 text-sm transition-all text-right"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-4",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                  msg.role === 'user' 
                    ? "bg-zinc-800 border-zinc-700 text-zinc-300" 
                    : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                )}>
                  {msg.role === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={cn(
                  "px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed",
                  msg.role === 'user'
                    ? "bg-zinc-800 text-zinc-100 rounded-tr-sm"
                    : "bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded-tl-sm"
                )}>
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <div className="markdown-body prose prose-invert prose-emerald max-w-none prose-p:leading-relaxed prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 rounded-tl-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="תאר את החוויה שאתה מחפש..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-12 pr-6 py-4 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
            dir="rtl"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <div className="text-center mt-2 text-[10px] text-zinc-600 font-mono">
          Holly Hype AI Engine v0.1.8
        </div>
      </div>
    </div>
  );
}
