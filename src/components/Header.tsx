import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, signInWithPopup, signOut, googleProvider } from '../lib/firebase';
import { LogIn, LogOut, Settings, Info, Zap, Milestone, Menu, X, Music, Sun, Moon, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { ViewState, Theme } from '../App';

interface HeaderProps {
  user: User | null;
  isAdmin: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onOpenAbout: () => void;
  onOpenChangelog: () => void;
  onToggleMusic: () => void;
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Header({ user, isAdmin, theme, setTheme, onOpenAbout, onOpenChangelog, onToggleMusic, currentView, setCurrentView, isSidebarOpen, toggleSidebar }: HeaderProps) {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('psychedelic');
    else setTheme('dark');
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        {user && (
          <button 
            onClick={toggleSidebar}
            className="p-2 -ml-2 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/50 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-emerald-400 font-black text-xl tracking-tight">
            <Zap className="w-6 h-6 fill-emerald-500" />
            Holly Hype
          </div>
          <button 
            onClick={onOpenChangelog}
            className="text-[10px] font-mono text-zinc-500 hover:text-emerald-400 transition-colors text-right cursor-pointer"
          >
            v0.1.8
          </button>
        </div>
        
        {user && (
          <nav className="hidden md:flex items-center gap-2 mr-8">
            <button
              onClick={() => setCurrentView('library')}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                (currentView === 'library' || currentView === 'experience') ? "bg-zinc-800 text-emerald-400" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              )}
            >
              ספריית חוויות
            </button>
            <button
              onClick={() => setCurrentView('roadmap')}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5",
                currentView === 'roadmap' ? "bg-zinc-800 text-emerald-400" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              )}
            >
              <Milestone className="w-4 h-4" />
              מפת דרכים
            </button>
            <button
              onClick={() => setCurrentView('chat')}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                currentView === 'chat' ? "bg-zinc-800 text-emerald-400" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              )}
            >
              מנוע חכם
            </button>
            <button
              onClick={() => setCurrentView('room')}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                currentView === 'room' ? "bg-zinc-800 text-emerald-400" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              )}
            >
              שולחן ישיבות
            </button>
            {isAdmin && (
              <button
                onClick={() => setCurrentView('admin')}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                  currentView === 'admin' ? "bg-zinc-800 text-emerald-400" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                )}
              >
                פאנל ניהול
              </button>
            )}
          </nav>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme}
          className="p-2 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 rounded-full transition-colors"
          title="החלף מצב תצוגה"
        >
          {theme === 'dark' ? <Moon className="w-5 h-5" /> : theme === 'light' ? <Sun className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        </button>
        <button 
          onClick={onToggleMusic}
          className="p-2 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 rounded-full transition-colors"
          title="נגן מוזיקה"
        >
          <Music className="w-5 h-5" />
        </button>
        <button 
          onClick={onOpenAbout}
          className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-full transition-colors"
          title="אודות"
        >
          <Info className="w-5 h-5" />
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentView('profile')}
              className="hidden sm:flex flex-col items-end hover:opacity-80 transition-opacity text-right"
            >
              <span className="text-sm font-medium text-zinc-200">{user.displayName}</span>
              <span className="text-xs text-zinc-500">{isAdmin ? 'מנהל מערכת' : 'חוקר תודעה'}</span>
            </button>
            <button 
              onClick={() => setCurrentView('profile')}
              className="hover:opacity-80 transition-opacity rounded-full ring-2 ring-transparent hover:ring-emerald-500/50"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-zinc-700" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                  {user.displayName?.charAt(0) || 'U'}
                </div>
              )}
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-full transition-colors"
              title="התנתק"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 px-4 py-2 rounded-full text-sm font-medium transition-all"
          >
            <LogIn className="w-4 h-4" />
            התחברות
          </button>
        )}
      </div>
    </header>
  );
}
