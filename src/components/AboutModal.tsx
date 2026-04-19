import { X, Github, Linkedin, Facebook, Code2, Mail } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl shadow-emerald-500/10">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-emerald-400">אודות המערכת</h2>
          <button onClick={onClose} className="p-1 text-zinc-500 hover:text-zinc-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 mb-4">
              <Code2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-black text-zinc-100">Holly Hype</h3>
            <p className="text-zinc-400 text-sm">מערכת חקר תודעה וקהילה יוצרת</p>
          </div>

          <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800 space-y-4">
            <h4 className="text-sm font-mono text-zinc-500 uppercase tracking-wider text-center">פותח על ידי</h4>
            <div className="text-center">
              <p className="text-lg font-bold text-zinc-200">לאון יעקובוב</p>
              <p className="text-sm text-emerald-400 font-mono">@AnLoMinus</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a href="https://www.linkedin.com/in/anlominus/" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com/Anlominus" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/AnlominusX" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://codepen.io/Anlominus" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full transition-colors flex items-center justify-center">
                <span className="font-bold text-xs">CP</span>
              </a>
              <a href="mailto:GlobalElite8200@gmail.com" className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="text-center text-xs text-zinc-600 font-mono">
            גרסה 0.1.8 • כל הזכויות שמורות © 2026
          </div>
        </div>
      </div>
    </div>
  );
}
