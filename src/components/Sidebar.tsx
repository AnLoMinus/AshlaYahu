import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { db, collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from '../lib/firebase';
import { MessageSquare, Plus, Trash2, Users } from 'lucide-react';
import { cn } from '../lib/utils';
import { ViewState } from '../App';

interface SidebarProps {
  user: User;
  currentChatId: string | null;
  setCurrentChatId: (id: string | null) => void;
  currentRoomId: string | null;
  setCurrentRoomId: (id: string | null) => void;
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
}

export function Sidebar({ user, currentChatId, setCurrentChatId, currentRoomId, setCurrentRoomId, currentView, setCurrentView }: SidebarProps) {
  const [chats, setChats] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    // Fetch user chats
    const qChats = query(
      collection(db, 'chats'),
      where('userId', '==', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubChats = onSnapshot(qChats, (snapshot) => {
      const chatsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChats(chatsData);
    }, (error) => {
      console.error('Error fetching chats:', error);
    });

    // Fetch rooms
    const qRooms = query(
      collection(db, 'rooms'),
      orderBy('createdAt', 'desc')
    );

    const unsubRooms = onSnapshot(qRooms, (snapshot) => {
      const roomsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRooms(roomsData);
    }, (error) => {
      console.error('Error fetching rooms:', error);
    });

    return () => {
      unsubChats();
      unsubRooms();
    };
  }, [user]);

  const handleNewChat = async () => {
    try {
      const docRef = await addDoc(collection(db, 'chats'), {
        userId: user.uid,
        title: 'חקר תודעה חדש',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setCurrentChatId(docRef.id);
      setCurrentView('chat');
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const handleNewRoom = async () => {
    try {
      const docRef = await addDoc(collection(db, 'rooms'), {
        name: 'שולחן ישיבות חדש',
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        participants: [user.uid]
      });
      setCurrentRoomId(docRef.id);
      setCurrentView('room');
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleDeleteChat = async (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, 'chats', chatId));
      if (currentChatId === chatId) {
        setCurrentChatId(null);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  return (
    <aside className="w-64 border-l border-zinc-800 bg-zinc-950/50 flex flex-col overflow-hidden">
      <div className="p-4 flex flex-col gap-2">
        <button
          onClick={handleNewChat}
          className="flex items-center gap-2 w-full px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          מסע חדש
        </button>
        <button
          onClick={handleNewRoom}
          className="flex items-center gap-2 w-full px-4 py-2 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-lg text-sm font-medium transition-all"
        >
          <Users className="w-4 h-4" />
          חדר ישיבות חדש
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        <div>
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2 px-2">משאבים</h3>
          <div className="flex flex-col gap-1">
            <div
              onClick={() => setCurrentView('body-map')}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all",
                currentView === 'body-map'
                  ? "bg-zinc-800 text-emerald-400"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              )}
            >
              <span className="text-sm">מפת גוף אינטראקטיבית</span>
            </div>
            <div
              onClick={() => setCurrentView('chemical-library')}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all",
                currentView === 'chemical-library'
                  ? "bg-zinc-800 text-emerald-400"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              )}
            >
              <span className="text-sm">ספריית חומרים</span>
            </div>
            <div
              onClick={() => setCurrentView('glossary')}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all",
                currentView === 'glossary'
                  ? "bg-zinc-800 text-emerald-400"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              )}
            >
              <span className="text-sm">אוצר מילים ומונחים</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2 px-2">מסעות אישיים</h3>
          <div className="flex flex-col gap-1">
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => {
                  setCurrentChatId(chat.id);
                  setCurrentView('chat');
                }}
                className={cn(
                  "group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all",
                  currentChatId === chat.id && currentView === 'chat'
                    ? "bg-zinc-800 text-emerald-400"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span className="text-sm truncate">{chat.title}</span>
                </div>
                <button
                  onClick={(e) => handleDeleteChat(e, chat.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            {chats.length === 0 && (
              <div className="text-xs text-zinc-600 px-2 italic">אין מסעות קודמים</div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2 px-2">שולחנות ישיבה</h3>
          <div className="flex flex-col gap-1">
            {rooms.map(room => (
              <div
                key={room.id}
                onClick={() => {
                  setCurrentRoomId(room.id);
                  setCurrentView('room');
                }}
                className={cn(
                  "group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all",
                  currentRoomId === room.id && currentView === 'room'
                    ? "bg-zinc-800 text-cyan-400"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <Users className="w-4 h-4 shrink-0" />
                  <span className="text-sm truncate">{room.name}</span>
                </div>
              </div>
            ))}
            {rooms.length === 0 && (
              <div className="text-xs text-zinc-600 px-2 italic">אין חדרים פתוחים</div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
