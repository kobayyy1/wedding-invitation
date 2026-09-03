'use client';

import { useState, useEffect } from 'react';
import CoverGate from '@/components/cover/CoverGate';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  // Kunci Scroll Layar sebelum cover dibuka
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
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-[#050811] select-none relative">
      <main className="w-full max-w-md bg-[#080d1a] relative border-x border-amber-400/20 shadow-[0_0_80px_rgba(6,182,212,0.15)] min-h-screen">
        {/* FASE 1: COVER GATE */}
        <CoverGate isOpen={isOpen} onOpen={handleOpenInvitation} />

        {/* Placeholder untuk komponen modul Fase berikutnya */}
      </main>
    </div>
  );
}