import html2pdf from 'html2pdf.js';

export const exportAsTxt = (title: string, content: string) => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportAsMd = (title: string, content: string) => {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportAsPdf = async (element: HTMLElement | string, filename: string) => {
  let targetElement: HTMLElement | null = null;
  
  if (typeof element === 'string') {
    targetElement = document.getElementById(element);
  } else {
    targetElement = element;
  }
  
  if (!targetElement) return;
  
  const opt = {
    margin:       10,
    filename:     `${filename}.pdf`,
    image:        { type: 'jpeg' as const, quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: 'mm' as const, format: 'a4', orientation: 'portrait' as const }
  };
  
  await html2pdf().set(opt).from(targetElement).save();
};

export const shareFile = async (title: string, content: string, filename: string, mimeType: string) => {
  const file = new File([content], filename, { type: mimeType });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: title,
        text: 'הנה התחליפים ששמרתי',
      });
      return true;
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    }
  }
  return false;
};
