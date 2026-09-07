'use client';

function RoyalCrownCrest() {
  return (
    <div className="w-28 h-7 mx-auto flex items-center justify-center relative opacity-90">
      <svg viewBox="0 0 140 36" fill="none" className="w-full h-full">
        <path
          d="M 70 4 L 75 14 L 86 6 L 82 22 L 58 22 L 54 6 L 65 14 Z"
          fill="rgba(197,160,89,0.25)"
          stroke="#C5A059"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="70" cy="3" r="2.5" fill="#1E4D75" />
        <circle cx="54" cy="5" r="1.8" fill="#C5A059" />
        <circle cx="86" cy="5" r="1.8" fill="#C5A059" />
        <path d="M 52 18 Q 30 18 10 10 Q 28 26 50 22" stroke="#1E4D75" strokeWidth="1.2" fill="none" />
        <path d="M 88 18 Q 110 18 130 10 Q 112 26 90 22" stroke="#1E4D75" strokeWidth="1.2" fill="none" />
        <circle cx="8" cy="10" r="2" fill="#C5A059" />
        <circle cx="132" cy="10" r="2" fill="#C5A059" />
      </svg>
    </div>
  );
}

interface WelcomeQuoteProps {
  isRevealing?: boolean;
}

export default function WelcomeQuote({ isRevealing = false }: WelcomeQuoteProps) {
  return (
    <section className="w-full px-6 pt-9 pb-3 text-center space-y-4 relative z-10">
      <style jsx>{`
        /* Animasi Transisi dari Blur Sinematik ke Fokus Tajam */
        @keyframes cinemaFocusRise {
          0% {
            opacity: 0;
            filter: blur(10px);
            transform: translateY(24px) scale(0.96);
          }
          60% {
            opacity: 0.9;
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0) scale(1);
          }
        }

        .anim-focus-crest {
          animation: cinemaFocusRise 1s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
        }
        .anim-focus-badge {
          animation: cinemaFocusRise 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both;
        }
        .anim-focus-greeting {
          animation: cinemaFocusRise 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.85s both;
        }
      `}</style>

      {/* 1. Lambang Mahkota Mengalir Muncul */}
      <div className={isRevealing ? 'anim-focus-crest' : ''}>
        <RoyalCrownCrest />
      </div>

      {/* 2. Lencana Emas Porselen */}
      <div className={isRevealing ? 'anim-focus-badge' : ''}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A059]/70 bg-white/95 shadow-[0_4px_16px_rgba(30,77,117,0.1)] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#133A5E] uppercase font-extrabold">
            The Wedding Invitation
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
        </div>
      </div>

      {/* 3. Teks Salam & Kalimat Undangan */}
      <div className={`space-y-2 ${isRevealing ? 'anim-focus-greeting' : ''}`}>
        <h2 className="text-[#091D34] font-serif text-xl tracking-wide font-extrabold leading-snug drop-shadow-sm">
          Assalamu&apos;alaikum Wr. Wb.
        </h2>
        <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto" />
        <p className="text-[#1D3E61] text-[12.5px] font-medium leading-relaxed px-1 max-w-sm mx-auto pt-1">
          Dengan memohon rahmat dan ridho Allah SWT, tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i sekalian untuk turut hadir menyaksikan ikatan suci kami:
        </p>
      </div>
    </section>
  );
}