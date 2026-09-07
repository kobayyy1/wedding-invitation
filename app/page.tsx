'use client';

import { useState, useEffect } from 'react';
import CoverGate from '../src/components/cover/CoverGate';
import WelcomeQuote from '../src/components/sections/WelcomeQuote';
import CoupleProfile from '../src/components/sections/CoupleProfile';
import FloralBackground from '../src/components/decorations/FloralBackground';
import RoyalFountainLoveBurst from '../src/components/decorations/RoyalFountainLoveBurst';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('opened') === 'true') {
      setIsOpen(true);
      window.dispatchEvent(new Event('play-wedding-music'));
      setIsRevealing(false);
      window.history.replaceState({}, '', '/');

      setTimeout(() => {
        const profileEl = document.getElementById('couple-profile');
        if (profileEl) {
          profileEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      window.scrollTo(0, 0);
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  }, [isOpen]);

  const handleOpenCover = () => {
    window.dispatchEvent(new Event('play-wedding-music'));
    setIsOpen(true);
    setIsRevealing(true);

    setTimeout(() => {
      setIsRevealing(false);
    }, 5500);
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-[#CBDCE8] select-none relative font-sans antialiased">
      <main className="w-full max-w-md bg-gradient-to-b from-[#F3F8FC] via-[#E8F2F9] to-[#DCEAF4] relative border-x-2 border-[#C5A059]/40 shadow-[0_0_70px_rgba(19,58,94,0.2)] min-h-screen overflow-hidden text-[#091D34]">
        <style>{`
          @keyframes luxuryUnrollScroll {
            0% {
              clip-path: inset(0 0 100% 0);
              opacity: 0.1;
              transform: scale(0.98);
            }
            12% {
              opacity: 1;
            }
            100% {
              clip-path: inset(0 0 0% 0);
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes radiantBeamGlide {
            0% { top: -2%; opacity: 0; }
            8% { opacity: 1; }
            85% { opacity: 1; }
            100% { top: 102%; opacity: 0; }
          }

          .anim-luxury-unroll {
            animation: luxuryUnrollScroll 3s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          }
          .anim-radiant-beam {
            animation: radiantBeamGlide 3s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          }
        `}</style>

        <CoverGate isOpen={isOpen} onOpen={handleOpenCover} />

        {isOpen && (
          <div className="w-full relative min-h-screen">
            <RoyalFountainLoveBurst isActive={isRevealing} />

            {isRevealing && (
              <div className="absolute inset-x-0 z-40 pointer-events-none anim-radiant-beam flex items-center justify-center -translate-y-1/2">
                <div className="absolute inset-x-0 top-1 h-8 bg-gradient-to-b from-black/15 via-black/5 to-transparent pointer-events-none" />
                <div className="w-full h-[2.5px] bg-gradient-to-r from-transparent via-[#FFF4D0] to-transparent shadow-[0_0_24px_#C5A059,0_0_10px_#DFC384]" />
                <div className="absolute w-24 h-6 bg-radial from-white via-[#DFC384]/70 to-transparent blur-[3px]" />
                <div className="absolute w-10 h-10 rounded-full border border-white/80 bg-[#DFC384]/40 blur-xs" />
                <div className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#FFF]" />
              </div>
            )}

            <div className={`w-full pb-20 relative ${isRevealing ? 'anim-luxury-unroll' : ''}`}>
              <FloralBackground isRevealing={isRevealing} />

              <div className="relative z-10">
                <WelcomeQuote isRevealing={isRevealing} />
                <CoupleProfile isRevealing={isRevealing} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}