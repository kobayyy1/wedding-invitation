'use client';

import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startFadeIn = (audio: HTMLAudioElement) => {
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
        .catch(() => {
          const unlock = () => {
            audio.play().then(() => setIsPlaying(true)).catch(() => { });
            window.removeEventListener('pointerdown', unlock);
            window.removeEventListener('touchstart', unlock);
          };
          window.addEventListener('pointerdown', unlock, { once: true });
          window.addEventListener('touchstart', unlock, { once: true });
        });
    }
  };

  useEffect(() => {
    const isAlreadyStarted = sessionStorage.getItem('wedding_music_active') === 'true';
    const savedTime = sessionStorage.getItem('wedding_music_time');

    if (isAlreadyStarted && audioRef.current) {
      setHasStarted(true);

      // KUNCI: Setel posisi detik sebelum lagu di-play ulang
      if (savedTime) {
        audioRef.current.currentTime = parseFloat(savedTime);
      }

      audioRef.current.volume = 0.65;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          const resumeOnTap = () => {
            if (audioRef.current) {
              if (savedTime) audioRef.current.currentTime = parseFloat(savedTime);
              audioRef.current.play();
              setIsPlaying(true);
            }
            window.removeEventListener('click', resumeOnTap);
            window.removeEventListener('touchstart', resumeOnTap);
          };
          window.addEventListener('click', resumeOnTap, { once: true });
          window.addEventListener('touchstart', resumeOnTap, { once: true });
        });
    }

    const handleStartEvent = () => {
      sessionStorage.setItem('wedding_music_active', 'true');
      setHasStarted(true);
      if (audioRef.current) {
        startFadeIn(audioRef.current);
      }
    };

    window.addEventListener('play-wedding-music', handleStartEvent);

    return () => {
      window.removeEventListener('play-wedding-music', handleStartEvent);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  // Simpan detik lagu secara realtime setiap milidetik berjalan
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      sessionStorage.setItem('wedding_music_time', String(audioRef.current.currentTime));
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      sessionStorage.setItem('wedding_music_active', 'false');
    } else {
      sessionStorage.setItem('wedding_music_active', 'true');
      audio.play().then(() => setIsPlaying(true)).catch(() => { });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/wedding.mp3"
        loop
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
      />

      {hasStarted && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in zoom-in-75 duration-700">
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            className={`relative w-12 h-12 rounded-full border border-amber-400/60 bg-[#081224]/90 backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.35)] flex items-center justify-center p-1.5 transition-transform active:scale-90 cursor-pointer ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
              }`}
          >
            <div className="w-full h-full rounded-full border border-dashed border-amber-300/40 flex items-center justify-center bg-radial from-amber-500/15 via-transparent to-black/70">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-300/90 shadow-[0_0_8px_#fbbf24] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-black" />
              </div>
            </div>

            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
              </span>
            )}
          </button>
        </div>
      )}
    </>
  );
}