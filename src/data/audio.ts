export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  category: 'frequency' | 'binaural' | 'meditation' | 'user';
}

export const initialPlaylist: AudioTrack[] = [
  {
    id: 'freq-432',
    title: '432Hz - Miracle Tone',
    artist: 'Holly Hype Frequencies',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder
    category: 'frequency'
  },
  {
    id: 'freq-528',
    title: '528Hz - DNA Repair',
    artist: 'Holly Hype Frequencies',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Placeholder
    category: 'frequency'
  },
  {
    id: 'bin-theta',
    title: 'Theta Waves - Deep Meditation',
    artist: 'Holly Hype Binaural',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', // Placeholder
    category: 'binaural'
  },
  {
    id: 'med-grounding',
    title: 'מדיטציית קרקוע (Grounding)',
    artist: 'Holly Hype Guide',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', // Placeholder
    category: 'meditation'
  },
  {
    id: '1',
    title: 'לאון ≈ סוֹד הָאֱמוּנָה וְהַנִּצָּחוֹן',
    artist: 'User Upload',
    url: '/audio/לאון ≈ סוֹד הָאֱמוּנָה וְהַנִּצָּחוֹן.mp3',
    category: 'user'
  },
  {
    id: '2',
    title: 'Untitled',
    artist: 'User Upload',
    url: '/audio/Untitled.mp3',
    category: 'user'
  },
];
