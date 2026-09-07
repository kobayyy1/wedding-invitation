'use client';

import Link from 'next/link';

function CardFloralRoseCorner({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 75 75" fill="none" className={`w-14 h-14 pointer-events-none ${className}`}>
      <path d="M 4 4 L 36 4 C 36 4 30 18 18 18 C 18 30 4 36 4 36 Z" stroke="#C5A059" strokeWidth="1.4" fill="rgba(197,160,89,0.15)" />
      <path d="M 8 8 Q 24 8 24 24" stroke="#DFC384" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M 12 12 C 22 6 30 12 26 22 C 16 26 8 20 12 12 Z" fill="#E2EDF5" stroke="#3B739E" strokeWidth="1" />
      <path d="M 32 8 C 42 6 46 16 38 22 C 30 20 28 12 32 8 Z" fill="#D3E5F2" stroke="#1E4D75" strokeWidth="0.9" />
      <g transform="translate(6, 6) scale(0.65)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))">
        <circle cx="16" cy="16" r="14" fill="#FFFFFF" stroke="#3B739E" strokeWidth="1.2" />
        <path d="M 16 4 C 7 11 7 21 16 28 C 25 21 25 11 16 4 Z" fill="#F4F8FB" stroke="#C5A059" strokeWidth="1" />
        <circle cx="16" cy="16" r="4.5" fill="#C5A059" />
      </g>
    </svg>
  );
}

function BotanicalRoseWreath() {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none animate-[spin_32s_linear_infinite]">
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
        <circle cx="80" cy="80" r="66" stroke="#C5A059" strokeWidth="1.4" strokeDasharray="6 3" />
        <circle cx="80" cy="80" r="72" stroke="#3B739E" strokeWidth="0.9" opacity="0.6" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 80 80)`}>
            <path d="M 74 12 C 66 8 64 18 70 22 C 76 18 80 14 74 12 Z" fill="#E2EDF5" stroke="#3B739E" strokeWidth="0.9" />
            <path d="M 86 12 C 94 8 96 18 90 22 C 84 18 80 14 86 12 Z" fill="#E2EDF5" stroke="#3B739E" strokeWidth="0.9" />
            <circle cx="80" cy="10" r="5.5" fill="#FFFFFF" stroke="#1E4D75" strokeWidth="1" />
            <circle cx="80" cy="10" r="2.5" fill="#C5A059" />
          </g>
        ))}
      </svg>
    </div>
  );
}

interface CoupleProfileProps {
  isRevealing?: boolean;
}

export default function CoupleProfile({ isRevealing = false }: CoupleProfileProps) {
  return (
    <section id="couple-profile" className="w-full px-5 py-6 space-y-8 relative z-10 overflow-hidden">
      <style>{`
        @keyframes luxuryCardBloom {
          0% {
            opacity: 0;
            filter: blur(12px);
            transform: perspective(1000px) rotateX(16deg) translateY(45px) scale(0.92);
          }
          65% { filter: blur(2px); }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: perspective(1000px) rotateX(0deg) translateY(0) scale(1);
          }
        }
        @keyframes ampersandBloomIn {
          0% { opacity: 0; filter: blur(8px); transform: scale(0.4) rotate(-140deg); }
          100% { opacity: 1; filter: blur(0px); transform: scale(1) rotate(0deg); }
        }
        .anim-card-silvia {
          animation: luxuryCardBloom 1.25s cubic-bezier(0.16, 1, 0.3, 1) 1.1s both;
        }
        .anim-ampersand {
          animation: ampersandBloomIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) 1.55s both;
        }
        .anim-card-wahyudi {
          animation: luxuryCardBloom 1.25s cubic-bezier(0.16, 1, 0.3, 1) 1.85s both;
        }
      `}</style>

      <div
        className={`relative rounded-[26px] bg-gradient-to-b from-white via-[#FCFDFE] to-[#F1F7FB] border-2 border-[#C5A059]/70 p-6 flex flex-col items-center text-center space-y-4 shadow-[0_14px_36px_rgba(20,55,90,0.12)] overflow-hidden ${
          isRevealing ? 'anim-card-silvia' : ''
        }`}
      >
        <CardFloralRoseCorner className="absolute -top-1 -left-1" />
        <CardFloralRoseCorner className="absolute -top-1 -right-1 scale-x-[-1]" />
        <CardFloralRoseCorner className="absolute -bottom-1 -left-1 scale-y-[-1]" />
        <CardFloralRoseCorner className="absolute -bottom-1 -right-1 rotate-180" />
        <div className="absolute inset-2 rounded-[20px] border border-[#1E4D75]/25 border-dashed pointer-events-none" />

        <div className="relative w-36 h-36 flex items-center justify-center mt-1">
          <BotanicalRoseWreath />
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#C5A059] p-1 shadow-[0_6px_20px_rgba(30,77,117,0.22)] bg-[#1E4D75]">
            <img
              src="/images/couple-3d.png"
              alt="Silvia Wulandari"
              className="w-full h-full object-cover object-top filter brightness-105 rounded-full"
            />
          </div>
        </div>

        <div className="space-y-1.5 relative z-10">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A059] font-extrabold bg-[#1E4D75] px-4 py-1 rounded-full shadow-sm">
            Mempelai Wanita
          </span>
          <h3 className="text-2xl font-serif text-[#08182B] font-extrabold tracking-wide pt-1">
            Silvia Wulandari, S.Kom
          </h3>
        </div>

        <div className="w-full pt-1 relative z-10">
          <Link
            href="/biografi/silvia"
            className="w-full py-3 px-4 rounded-xl border border-[#C5A059] bg-gradient-to-r from-[#183E63] via-[#255684] to-[#183E63] text-white text-xs font-mono tracking-wider uppercase hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 font-bold shadow-[0_4px_16px_rgba(24,62,99,0.25)]"
          >
            <span>Detail Biografi</span>
            <span className="text-sm text-[#DFC384]">→</span>
          </Link>
        </div>
      </div>

      <div className={`flex items-center justify-center gap-3 ${isRevealing ? 'anim-ampersand' : ''}`}>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
        <div className="w-11 h-11 rounded-full border-2 border-[#C5A059] bg-white flex items-center justify-center shadow-[0_4px_14px_rgba(197,160,89,0.25)]">
          <span className="font-serif italic text-[#133A5E] text-base font-extrabold">&amp;</span>
        </div>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
      </div>

      <div
        className={`relative rounded-[26px] bg-gradient-to-b from-white via-[#FCFDFE] to-[#F1F7FB] border-2 border-[#C5A059]/70 p-6 flex flex-col items-center text-center space-y-4 shadow-[0_14px_36px_rgba(20,55,90,0.12)] overflow-hidden ${
          isRevealing ? 'anim-card-wahyudi' : ''
        }`}
      >
        <CardFloralRoseCorner className="absolute -top-1 -left-1" />
        <CardFloralRoseCorner className="absolute -top-1 -right-1 scale-x-[-1]" />
        <CardFloralRoseCorner className="absolute -bottom-1 -left-1 scale-y-[-1]" />
        <CardFloralRoseCorner className="absolute -bottom-1 -right-1 rotate-180" />
        <div className="absolute inset-2 rounded-[20px] border border-[#1E4D75]/25 border-dashed pointer-events-none" />

        <div className="relative w-34 h-34 flex items-center justify-center mt-1">
          <BotanicalRoseWreath />
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#C5A059] p-1 shadow-[0_6px_20px_rgba(30,77,117,0.22)] bg-[#1E4D75]">
            <img
              src="/images/couple-3d.png"
              alt="Wahyudi"
              className="w-full h-full object-cover object-bottom filter brightness-105 rounded-full"
            />
          </div>
        </div>

        <div className="space-y-1.5 relative z-10">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A059] font-extrabold bg-[#1E4D75] px-4 py-1 rounded-full shadow-sm">
            Mempelai Pria
          </span>
          <h3 className="text-2xl font-serif text-[#08182B] font-extrabold tracking-wide pt-1">
            Wahyudi, S.Kom
          </h3>
        </div>

        <div className="w-full pt-1 relative z-10">
          <Link
            href="/biografi/wahyudi"
            className="w-full py-3 px-4 rounded-xl border border-[#C5A059] bg-gradient-to-r from-[#183E63] via-[#255684] to-[#183E63] text-white text-xs font-mono tracking-wider uppercase hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 font-bold shadow-[0_4px_16px_rgba(24,62,99,0.25)]"
          >
            <span>Detail Biografi</span>
            <span className="text-sm text-[#DFC384]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}