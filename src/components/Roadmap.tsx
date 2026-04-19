import { todoList } from '../data/todo';
import { CheckCircle2, Circle, Milestone, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export function Roadmap() {
  return (
    <div className="h-full overflow-y-auto p-6 bg-zinc-950 text-zinc-100 custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center gap-3">
            <Milestone className="w-8 h-8 text-emerald-500" />
            מפת דרכים (TODO)
          </h1>
          <p className="text-zinc-400 mt-2 text-lg">
            התכנון שלנו קדימה. כאן תוכלו לראות אילו שדרוגים כבר הוטמעו במערכת ואילו פיצ'רים מתוכננים לגרסאות הבאות.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute right-6 top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/20 to-zinc-800/50 hidden md:block" />

          <div className="space-y-6">
            {todoList.map((item, index) => (
              <div 
                key={item.id} 
                className={cn(
                  "relative flex flex-col md:flex-row gap-4 md:gap-8 p-6 rounded-2xl border transition-all duration-300",
                  item.completed 
                    ? "bg-emerald-950/10 border-emerald-500/20 shadow-[0_0_30px_-15px_rgba(16,185,129,0.1)]" 
                    : "bg-zinc-900/30 border-zinc-800/50 opacity-80 hover:opacity-100"
                )}
              >
                {/* Timeline Node */}
                <div className="hidden md:flex absolute right-6 translate-x-1/2 top-8 w-4 h-4 rounded-full bg-zinc-950 border-2 border-zinc-800 items-center justify-center z-10">
                  {item.completed && <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />}
                </div>

                {/* Status Icon & Version */}
                <div className="flex items-center md:flex-col md:items-start md:w-32 shrink-0 gap-3 md:gap-1">
                  {item.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-6 h-6 text-zinc-600 shrink-0" />
                  )}
                  <span className={cn(
                    "font-mono font-bold text-lg",
                    item.completed ? "text-emerald-400" : "text-zinc-500"
                  )}>
                    v{item.version}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={cn(
                    "text-xl font-bold mb-2 flex items-center gap-2",
                    item.completed ? "text-zinc-100" : "text-zinc-300"
                  )}>
                    {item.title}
                    {item.completed && <Sparkles className="w-4 h-4 text-emerald-500/50" />}
                  </h3>
                  <p className={cn(
                    "leading-relaxed",
                    item.completed ? "text-zinc-400" : "text-zinc-500"
                  )}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
