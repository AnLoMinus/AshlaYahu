import { useState, useEffect, useRef } from 'react';
import { User } from 'firebase/auth';
import { db, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, getDoc, updateDoc, arrayUnion } from '../lib/firebase';
import { Send, Users, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface CollaborativeRoomProps {
  user: User;
  roomId: string | null;
}

export function CollaborativeRoom({ user, roomId }: CollaborativeRoomProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [roomDetails, setRoomDetails] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roomId) return;

    // Fetch room details
    const fetchRoom = async () => {
      const roomRef = doc(db, 'rooms', roomId);
      const roomSnap = await getDoc(roomRef);
      if (roomSnap.exists()) {
        setRoomDetails({ id: roomSnap.id, ...roomSnap.data() });
        // Add user to participants if not already
        if (!roomSnap.data().participants?.includes(user.uid)) {
          await updateDoc(roomRef, {
            participants: arrayUnion(user.uid)
          });
        }
      }
    };
    fetchRoom();

    // Listen to messages
    const q = query(
      collection(db, 'rooms', roomId, 'messages'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });

    return () => unsubscribe();
  }, [roomId, user.uid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !roomId) return;

    const userMessage = input.trim();
    setInput('');

    try {
      await addDoc(collection(db, 'rooms', roomId, 'messages'), {
        userId: user.uid,
        userName: user.displayName || 'משתמש אנונימי',
        userPhoto: user.photoURL || '',
        content: userMessage,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!roomId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto p-6">
        <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6 border border-cyan-500/20">
          <Users className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-4">שולחן ישיבות רוחני</h2>
        <p className="text-zinc-400 mb-8">
          מרחב משותף בו חוקרי תודעה יכולים לחלוק חוויות, לשאול שאלות ולבנות יחד את "הייפ הקדושה".
          בחר חדר מהתפריט או פתח אחד חדש.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950/50 relative">
      <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-zinc-100">{roomDetails?.name || 'טוען...'}</h2>
        </div>
        <div className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-1 rounded-md">
          {roomDetails?.participants?.length || 1} משתתפים
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <Sparkles className="w-8 h-8 text-cyan-400 mb-4" />
            <p className="text-zinc-400 text-sm">החדר ריק. תהיה הראשון לשתף תובנה.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg) => {
              const isMe = msg.userId === user.uid;
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-4",
                    isMe ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className="shrink-0">
                    {msg.userPhoto ? (
                      <img src={msg.userPhoto} alt={msg.userName} className="w-8 h-8 rounded-full border border-zinc-700" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 text-xs font-bold border border-zinc-700">
                        {msg.userName?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <div className={cn(
                    "flex flex-col max-w-[75%]",
                    isMe ? "items-end" : "items-start"
                  )}>
                    <span className="text-[10px] text-zinc-500 mb-1 px-1">{msg.userName}</span>
                    <div className={cn(
                      "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      isMe
                        ? "bg-cyan-900/30 border border-cyan-500/20 text-cyan-50 rounded-tr-sm"
                        : "bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-tl-sm"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="שתף את הקהילה..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-12 pr-6 py-4 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
            dir="rtl"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
