import { useState } from 'react';
import { Download, FileText, FileCode, File, Share2 } from 'lucide-react';
import { exportAsTxt, exportAsMd, exportAsPdf, shareFile } from '../lib/exportUtils';

interface ExportMenuProps {
  substitutes?: any[];
  markdownContent?: string;
  htmlContent?: string;
  title: string;
  elementIdToPdf?: string;
}

export function ExportMenu({ substitutes, markdownContent, htmlContent, title, elementIdToPdf }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const generateContent = () => {
    if (markdownContent) return markdownContent;
    
    let content = `# ${title}\n\n`;
    if (substitutes) {
      substitutes.forEach((sub, index) => {
        if (substitutes.length > 1) {
          content += `## ${index + 1}. ${sub.name}\n`;
        } else {
          content += `## ${sub.name}\n`;
        }
        content += `**סוג:** ${sub.type}\n\n`;
        content += `${sub.description}\n\n`;
        content += `---\n\n`;
      });
    }
    return content;
  };

  const handleExportTxt = () => {
    exportAsTxt(title, generateContent());
    setIsOpen(false);
  };

  const handleExportMd = () => {
    exportAsMd(title, generateContent());
    setIsOpen(false);
  };

  const handleExportPdf = async () => {
    if (elementIdToPdf) {
      await exportAsPdf(elementIdToPdf, title);
    } else {
      // Fallback if no element ID provided - create a temporary hidden element
      const tempDiv = document.createElement('div');
      
      if (htmlContent) {
        tempDiv.innerHTML = `
          <div style="direction: rtl; font-family: sans-serif; padding: 20px; color: black; background: white;">
            <h1 style="text-align: center;">${title}</h1>
            ${htmlContent}
          </div>
        `;
      } else if (substitutes) {
        tempDiv.innerHTML = `
          <div style="direction: rtl; font-family: sans-serif; padding: 20px; color: black; background: white;">
            <h1 style="text-align: center;">${title}</h1>
            ${substitutes.map(sub => `
              <div style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
                <h2>${sub.name}</h2>
                <p><strong>סוג:</strong> ${sub.type}</p>
                <div>${sub.description.replace(/\n/g, '<br/>')}</div>
              </div>
            `).join('')}
          </div>
        `;
      } else {
         tempDiv.innerHTML = `
          <div style="direction: rtl; font-family: sans-serif; padding: 20px; color: black; background: white;">
            <h1 style="text-align: center;">${title}</h1>
            <pre style="white-space: pre-wrap; font-family: inherit;">${generateContent()}</pre>
          </div>
        `;
      }
      
      document.body.appendChild(tempDiv);
      await exportAsPdf(tempDiv, title);
      document.body.removeChild(tempDiv);
    }
    setIsOpen(false);
  };

  const handleShareDrive = async () => {
    const content = generateContent();
    const success = await shareFile(title, content, `${title}.md`, 'text/markdown');
    if (!success) {
      alert('הדפדפן שלך לא תומך בשיתוף קבצים ישיר. הקובץ יורד למחשב ותוכל להעלות אותו לגוגל דרייב.');
      handleExportMd();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl transition-colors text-sm font-medium border border-zinc-700"
      >
        <Download className="w-4 h-4" />
        ייצוא
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50">
          <div className="p-1">
            <button
              onClick={handleExportMd}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors text-right"
            >
              <FileCode className="w-4 h-4 text-emerald-400" />
              הורד כ-Markdown
            </button>
            <button
              onClick={handleExportTxt}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors text-right"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              הורד כ-TXT
            </button>
            <button
              onClick={handleExportPdf}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors text-right"
            >
              <File className="w-4 h-4 text-red-400" />
              הורד כ-PDF
            </button>
            <div className="h-px bg-zinc-800 my-1 mx-2" />
            <button
              onClick={handleShareDrive}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors text-right"
            >
              <Share2 className="w-4 h-4 text-blue-400" />
              שמור ב-Drive / שתף
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
