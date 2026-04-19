import { useState, useEffect } from 'react';
import { X, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import changelogContent from '../changelog.md?raw';

interface ChangelogModalProps {
  onClose: () => void;
}

export function ChangelogModal({ onClose }: ChangelogModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2 text-emerald-400">
            <FileText className="w-5 h-5" />
            <h2 className="text-xl font-bold">יומן אירועים (Changelog)</h2>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-500 hover:text-zinc-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 bg-zinc-950">
          <div className="markdown-body prose prose-invert prose-emerald max-w-none prose-h1:text-2xl prose-h2:text-xl prose-h2:border-b prose-h2:border-zinc-800 prose-h2:pb-2 prose-h3:text-lg prose-a:text-emerald-400">
            <ReactMarkdown>{changelogContent}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
