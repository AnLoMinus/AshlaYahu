import { useState, useEffect } from 'react';
import { db, collection, query, orderBy, onSnapshot, getDocs, limit } from '../lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';
import { Users, Activity, MessageSquare, ShieldAlert, Clock } from 'lucide-react';

export function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [recentChats, setRecentChats] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, onlineUsers: 0, totalChats: 0 });

  useEffect(() => {
    const qUsers = query(collection(db, 'users'), orderBy('lastSeen', 'desc'));
    const unsubUsers = onSnapshot(qUsers, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
      setUsers(usersData);
      
      setStats(prev => ({
        ...prev,
        totalUsers: usersData.length,
        onlineUsers: usersData.filter((u: any) => u.isOnline).length
      }));
    });

    const qChats = query(collection(db, 'chats'), orderBy('createdAt', 'desc'), limit(10));
    const unsubChats = onSnapshot(qChats, (snapshot) => {
      const chatsData = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
      setRecentChats(chatsData);
    });

    const fetchTotalChats = async () => {
      const chatsSnap = await getDocs(collection(db, 'chats'));
      setStats(prev => ({ ...prev, totalChats: chatsSnap.size }));
    };
    fetchTotalChats();

    return () => {
      unsubUsers();
      unsubChats();
    };
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6 bg-zinc-950 text-zinc-100">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-6">
          <ShieldAlert className="w-8 h-8 text-emerald-500" />
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            פאנל ניהול מערכת
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-400 font-mono text-sm uppercase tracking-wider">
              <Users className="w-4 h-4" />
              סה"כ משתמשים
            </div>
            <div className="text-4xl font-light text-zinc-100">{stats.totalUsers}</div>
          </div>
          
          <div className="bg-zinc-900/50 border border-emerald-500/20 rounded-2xl p-6 flex flex-col gap-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              מחוברים כעת
            </div>
            <div className="text-4xl font-light text-emerald-400">{stats.onlineUsers}</div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              סה"כ מסעות (שיחות)
            </div>
            <div className="text-4xl font-light text-cyan-400">{stats.totalChats}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
              <h2 className="text-lg font-bold text-zinc-200">משתמשי המערכת</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead className="text-xs text-zinc-500 uppercase bg-zinc-900/50 font-mono">
                  <tr>
                    <th className="px-6 py-4 font-medium">משתמש</th>
                    <th className="px-6 py-4 font-medium">תפקיד</th>
                    <th className="px-6 py-4 font-medium">סטטוס</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-zinc-800/20 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        {u.photoURL ? (
                          <img src={u.photoURL} alt={u.name} className="w-8 h-8 rounded-full border border-zinc-700" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                            {u.name?.charAt(0) || 'U'}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-zinc-200">{u.name}</span>
                          <span className="text-xs text-zinc-500 font-mono">{u.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          u.role === 'admin' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {u.role === 'admin' ? 'מנהל' : 'משתמש'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${u.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`}></div>
                          <span className="text-xs text-zinc-500">
                            {u.lastSeen?.toDate ? formatDistanceToNow(u.lastSeen.toDate(), { addSuffix: true, locale: he }) : 'לא ידוע'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
              <h2 className="text-lg font-bold text-zinc-200">מסעות אחרונים במערכת</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {recentChats.map((chat) => (
                <div key={chat.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-zinc-200 truncate">{chat.title}</span>
                    <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {chat.createdAt?.toDate ? formatDistanceToNow(chat.createdAt.toDate(), { addSuffix: true, locale: he }) : ''}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500">
                    משתמש ID: <span className="font-mono">{chat.userId}</span>
                  </div>
                </div>
              ))}
              {recentChats.length === 0 && (
                <div className="text-center text-zinc-500 py-8">אין מסעות עדיין</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
