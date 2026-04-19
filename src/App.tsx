import { useState, useEffect } from 'react';
import { auth, db, onAuthStateChanged, doc, setDoc, serverTimestamp, getDoc } from './lib/firebase';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { AdminPanel } from './components/AdminPanel';
import { CollaborativeRoom } from './components/CollaborativeRoom';
import { Library } from './components/Library';
import { ChemicalLibrary } from './components/ChemicalLibrary/ChemicalLibrary';
import { Glossary } from './components/Glossary/Glossary';
import { BodyMap } from './components/BodyMap/BodyMap';
import { ExperienceDetail } from './components/ExperienceDetail';
import { AboutModal } from './components/AboutModal';
import { ChangelogModal } from './components/ChangelogModal';
import { Roadmap } from './components/Roadmap';
import { Profile } from './components/Profile';
import { AudioPlayer } from './components/AudioPlayer';
import { SloganTicker } from './components/SloganTicker/SloganTicker';
import { User } from 'firebase/auth';
import { Experience } from './data/experiences';
import { cn } from './lib/utils';

export type ViewState = 'chat' | 'admin' | 'room' | 'library' | 'experience' | 'roadmap' | 'profile' | 'chemical-library' | 'glossary' | 'body-map';
export type Theme = 'dark' | 'light' | 'psychedelic';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('library');
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  
  const [showAbout, setShowAbout] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMusicOpen, setIsMusicOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if admin
        const adminEmail = 'quadcosmos@gmail.com';
        const isUserAdmin = currentUser.email === adminEmail;
        setIsAdmin(isUserAdmin);

        // Update user profile in Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        const userData = {
          uid: currentUser.uid,
          name: currentUser.displayName || 'משתמש אנונימי',
          email: currentUser.email || '',
          photoURL: currentUser.photoURL || '',
          role: isUserAdmin ? 'admin' : (userSnap.exists() ? userSnap.data().role : 'user'),
          lastSeen: serverTimestamp(),
          isOnline: true
        };
        
        await setDoc(userRef, userData, { merge: true });
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  // Handle offline status (simple version)
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user) {
        setDoc(doc(db, 'users', user.uid), { isOnline: false, lastSeen: serverTimestamp() }, { merge: true });
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [user]);

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-emerald-400 font-mono" dir="rtl">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p>מתחבר לרשת התודעה...</p>
        </div>
      </div>
    );
  }

  const handleSelectExperience = (exp: Experience) => {
    setSelectedExperience(exp);
    setCurrentView('experience');
  };

  return (
    <div className={cn(
      "min-h-screen text-zinc-100 flex flex-col font-sans transition-colors duration-500",
      theme === 'dark' ? "bg-zinc-950" : theme === 'light' ? "bg-zinc-50 text-zinc-900" : "bg-purple-950 text-emerald-300"
    )} dir="rtl">
      <Header 
        user={user} 
        isAdmin={isAdmin}
        theme={theme}
        setTheme={setTheme}
        onOpenAbout={() => setShowAbout(true)}
        onOpenChangelog={() => setShowChangelog(true)}
        onToggleMusic={() => setIsMusicOpen(!isMusicOpen)}
        currentView={currentView}
        setCurrentView={setCurrentView}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <SloganTicker />
      
      <div className="flex-1 flex overflow-hidden">
        {user && isSidebarOpen && (
          <Sidebar 
            user={user}
            currentChatId={currentChatId}
            setCurrentChatId={setCurrentChatId}
            currentRoomId={currentRoomId}
            setCurrentRoomId={setCurrentRoomId}
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        )}
        
        <main className="flex-1 relative overflow-hidden bg-zinc-900/50">
          {!user && currentView !== 'library' && currentView !== 'experience' && currentView !== 'roadmap' ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6">
                Holly Hype
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                טרנספורמציה של "סטלות" לחוויות מודעות וטבעיות.
                <br />
                התחבר עכשיו כדי לחקור תחליפים טבעיים, להבין את המוח שלך, ולהצטרף לקהילה יוצרת.
              </p>
              <div className="text-sm text-zinc-500 font-mono">
                גרסה 0.1.8 • יש להתחבר דרך התפריט העליון
              </div>
            </div>
          ) : (
            <>
              {currentView === 'library' && <Library onSelectExperience={handleSelectExperience} />}
              {currentView === 'chemical-library' && <ChemicalLibrary />}
              {currentView === 'glossary' && <Glossary />}
              {currentView === 'body-map' && <BodyMap />}
              {currentView === 'experience' && selectedExperience && (
                <ExperienceDetail 
                  experience={selectedExperience} 
                  onBack={() => setCurrentView('library')} 
                  user={user}
                />
              )}
              {currentView === 'roadmap' && <Roadmap />}
              {currentView === 'profile' && user && <Profile user={user} onSelectExperience={handleSelectExperience} />}
              {currentView === 'chat' && user && <ChatArea user={user} chatId={currentChatId} onChatCreated={setCurrentChatId} />}
              {currentView === 'admin' && user && isAdmin && <AdminPanel />}
              {currentView === 'room' && user && <CollaborativeRoom user={user} roomId={currentRoomId} />}
            </>
          )}
        </main>
      </div>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showChangelog && <ChangelogModal onClose={() => setShowChangelog(false)} />}
      <AudioPlayer isOpen={isMusicOpen} onClose={() => setIsMusicOpen(false)} />
    </div>
  );
}
