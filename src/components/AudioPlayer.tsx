import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';

interface AudioPlayerProps {
  textToRead: string;
  title: string;
  language?: 'en' | 'ha' | 'fr';
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ textToRead, title, language = 'en' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false);
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (!supported) return;

    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      
      // Try to select appropriate voice
      const voices = window.speechSynthesis.getVoices();
      if (language === 'fr') {
        const frVoice = voices.find(v => v.lang.startsWith('fr'));
        if (frVoice) utterance.voice = frVoice;
      } else if (language === 'ha') {
        // Fallback to English/African accented voice if Hausa isn't native in browser
        const enVoice = voices.find(v => v.lang.includes('NG') || v.lang.includes('GB') || v.lang.includes('US'));
        if (enVoice) utterance.voice = enVoice;
      }

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!supported) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white text-xs font-mono">
      <button
        type="button"
        onClick={handleTogglePlay}
        className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium cursor-pointer"
        title={isPlaying ? (isPaused ? 'Resume narration' : 'Pause narration') : 'Listen to audio narration'}
      >
        {isPlaying && !isPaused ? (
          <>
            <Pause className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-white">Pause</span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white">{isPaused ? 'Resume' : 'Listen'}</span>
          </>
        )}
      </button>

      {isPlaying && (
        <button
          type="button"
          onClick={handleStop}
          className="hover:text-red-400 transition-colors p-1 cursor-pointer text-white/50"
          title="Stop narration"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      )}

      <span className="text-[10px] text-white/40 border-l border-white/10 pl-2">
        {language === 'ha' ? 'Hausa Narration' : language === 'fr' ? 'Français' : 'AI Audio'}
      </span>
    </div>
  );
};
