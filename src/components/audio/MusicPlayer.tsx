'use client';

import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fadeInAudio = (audio: HTMLAudioElement) => {
    audio.volume = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          let vol = 0;
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = setInterval(() => {
            if (vol < 0.65) {
              vol = Math.min(0.65, vol + 0.05);
              audio.volume = vol;
            } else {
              if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            }
          }, 120);
        })
        .catch((err) => {
          console.warn('Audio play blocked:', err);
          const unlock = () => {
            fadeInAudio(audio);
            window.removeEventListener('pointerdown', unlock);
            window.removeEventListener('touchstart', unlock);
          };
          window.addEventListener('pointerdown', unlock, { once: true });
          window.addEventListener('touchstart', unlock, { once: true });
        });
    }
  };

  useEffect(() => {
    const handleStartMusic = () => {
      setHasStarted(true);
      if (audioRef.current) {
        fadeInAudio(audioRef.current);
      }
    };

    window.addEventListener('play-wedding-music', handleStartMusic);
    return () => {
      window.removeEventListener('play-wedding-music', handleStartMusic);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/wedding.mp3" loop preload="auto" />

      {/* Tombol Vinyl Baru Muncul Setelah Undangan Dibuka */}
      {hasStarted && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in zoom-in-75 duration-700">
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            className={`relative w-12 h-12 rounded-full border border-amber-400/50 bg-[#081224]/90 backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center justify-center p-1.5 transition-transform active:scale-90 cursor-pointer ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
          >
            {/* Efek Piringan Hitam Vinyl Hologram */}
            <div className="w-full h-full rounded-full border border-dashed border-cyan-300/40 flex items-center justify-center bg-radial from-amber-500/10 via-transparent to-black/60">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-300/90 shadow-[0_0_8px_#fbbf24] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-black" />
              </div>
            </div>

            {/* Soundwave Bars Indicator */}
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
              </span>
            )}
          </button>
        </div>
      )}
    </>
  );
}