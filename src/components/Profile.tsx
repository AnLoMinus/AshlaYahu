import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { db, collection, query, where, getDocs, orderBy, doc, getDoc } from '../lib/firebase';
import { experiences } from '../data/experiences';
import { Bookmark, Sparkles, Activity, Brain, Zap, Heart, Leaf, Clock, ArrowRight, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExportMenu } from './ExportMenu';
import { SubstituteImage } from './SubstituteImage';

interface ProfileProps {
  user: User;
  onSelectExperience: (exp: any) => void;
}

export function Profile({ user, onSelectExperience }: ProfileProps) {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [mySubstitutes, setMySubstitutes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubstitute, setSelectedSubstitute] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Fetch favorites
        const favsRef = collection(db, 'users', user.uid, 'favorites');
        const favsSnap = await getDocs(favsRef);
        const favIds = favsSnap.docs.map(doc => doc.id);
        
        const favExperiences = experiences.filter(exp => favIds.includes(exp.id));
        setFavorites(favExperiences);

        // Fetch my substitutes
        const subsRef = collection(db, 'substitutes');
        const qSubs = query(subsRef, where('createdBy', '==', user.uid));
        const subsSnap = await getDocs(qSubs);
        
        const subs = subsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a: any, b: any) => {
          const dateA = a.createdAt?.toDate?.() || new Date(0);
          const dateB = b.createdAt?.toDate?.() || new Date(0);
          return dateB.getTime() - dateA.getTime();
        });
        
        setMySubstitutes(subs);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-950">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-zinc-950 text-zinc-100" dir="rtl">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12 bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
          <div className="flex items-center gap-6">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || ''} className="w-24 h-24 rounded-full border-4 border-zinc-800 shadow-xl" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center text-3xl font-bold text-zinc-400 border-4 border-zinc-700 shadow-xl">
                {user.displayName?.charAt(0) || 'U'}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-black text-zinc-100 mb-2">{user.displayName}</h1>
              <p className="text-zinc-400 font-mono">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none flex flex-col items-center justify-center bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800">
              <Bookmark className="w-6 h-6 text-emerald-400 mb-2" />
              <span className="text-2xl font-black text-zinc-100">{favorites.length}</span>
              <span className="text-xs text-zinc-500 font-mono mt-1">חוויות שמורות</span>
            </div>
            <div className="flex-1 md:flex-none flex flex-col items-center justify-center bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800">
              <Sparkles className="w-6 h-6 text-cyan-400 mb-2" />
              <span className="text-2xl font-black text-zinc-100">{mySubstitutes.length}</span>
              <span className="text-xs text-zinc-500 font-mono mt-1">תחליפים שנוצרו</span>
            </div>
            <div className="flex-1 md:flex-none flex flex-col items-center justify-center bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800">
              <Activity className="w-6 h-6 text-purple-400 mb-2" />
              <span className="text-2xl font-black text-zinc-100">{favorites.length + mySubstitutes.length}</span>
              <span className="text-xs text-zinc-500 font-mono mt-1">נקודות התפתחות</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Favorites Section */}
          <section>
            <h2 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-3">
              <Bookmark className="w-6 h-6 text-emerald-400" />
              החוויות המועדפות שלי
            </h2>
            
            {favorites.length === 0 ? (
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 text-center">
                <Bookmark className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-300 mb-2">אין חוויות שמורות</h3>
                <p className="text-zinc-500 text-sm">סייר בספריית החוויות ושמור את אלו שמעניינות אותך.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {favorites.map(exp => (
                  <div 
                    key={exp.id}
                    onClick={() => onSelectExperience(exp)}
                    className="bg-zinc-900/40 border border-zinc-800 hover:border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">{exp.name}</h3>
                      <p className="text-sm text-zinc-500 line-clamp-1">{exp.shortDescription}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-400 transition-colors transform group-hover:-translate-x-1" />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* My Substitutes Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-cyan-400" />
                התחליפים שיצרתי
              </h2>
              {mySubstitutes.length > 0 && (
                <ExportMenu substitutes={mySubstitutes} title="התחליפים שלי - Holy" />
              )}
            </div>
            
            {mySubstitutes.length === 0 ? (
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 text-center">
                <Sparkles className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-300 mb-2">לא יצרת תחליפים עדיין</h3>
                <p className="text-zinc-500 text-sm">היכנס לחוויה והשתמש ב-AI כדי לייצר תחליפים טבעיים.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mySubstitutes.map(sub => (
                  <div 
                    key={sub.id}
                    onClick={() => setSelectedSubstitute(sub)}
                    className="bg-zinc-900/40 border border-zinc-800 hover:border-cyan-500/30 rounded-2xl p-4 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-zinc-950/50 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
                        {sub.type === 'plants' && <Leaf className="w-4 h-4" />}
                        {sub.type === 'breathing' && <Zap className="w-4 h-4" />}
                        {sub.type === 'meditation' && <Brain className="w-4 h-4" />}
                        {sub.type === 'movement' && <Activity className="w-4 h-4" />}
                        {sub.type === 'music' && <Heart className="w-4 h-4" />}
                        {sub.type === 'other' && <Sparkles className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-cyan-500/80 uppercase tracking-widest">{sub.type}</div>
                        <h3 className="font-bold text-zinc-200 group-hover:text-cyan-400 transition-colors">{sub.name}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-500 line-clamp-2 mb-3">{sub.description}</p>
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-600">
                      <span>{sub.createdAt?.toDate ? formatDistanceToNow(sub.createdAt.toDate(), { addSuffix: true, locale: he }) : ''}</span>
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {sub.upvotes || 0}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Substitute Modal */}
      {selectedSubstitute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl border flex items-center justify-center shadow-inner bg-zinc-950/50 border-cyan-500/30 text-cyan-400">
                  {selectedSubstitute.type === 'plants' && <Leaf className="w-6 h-6" />}
                  {selectedSubstitute.type === 'breathing' && <Zap className="w-6 h-6" />}
                  {selectedSubstitute.type === 'meditation' && <Brain className="w-6 h-6" />}
                  {selectedSubstitute.type === 'movement' && <Activity className="w-6 h-6" />}
                  {selectedSubstitute.type === 'music' && <Heart className="w-6 h-6" />}
                  {selectedSubstitute.type === 'other' && <Sparkles className="w-6 h-6" />}
                </div>
                <div>
                  <div className="text-[10px] font-mono mb-1 uppercase tracking-widest text-cyan-500/80">
                    {selectedSubstitute.type}
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-100">{selectedSubstitute.name}</h2>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ExportMenu 
                  substitutes={[selectedSubstitute]} 
                  title={`תחליף - ${selectedSubstitute.name}`} 
                  elementIdToPdf="substitute-modal-content"
                />
                <button 
                  onClick={() => setSelectedSubstitute(null)}
                  className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div id="substitute-modal-content" className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert prose-emerald max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedSubstitute.description}
                </ReactMarkdown>
              </div>
              
              <SubstituteImage substitute={selectedSubstitute} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
