'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const WEDDING_DATE = new Date(2026, 8, 20, 9, 0, 0);

const ADDRESS_TEXT =
  'Jl. Cemp. Putih Bar. No.3, RT.9/RW.13, Cemp. Putih Bar., Kec. Cemp. Putih, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10520';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Jl.+Cemp.+Putih+Bar.+No.65,+RT.6%2FRW.6,+Cemp.+Putih+Bar.,+Kec.+Cemp.+Putih,+Kota+Jakarta+Pusat,+Daerah+Khusus+Ibukota+Jakarta+10520/@-6.1841581,106.8658512,21z/data=!4m6!3m5!1s0x2e69f4f812859c19:0x3fd245196bff45e3!8m2!3d-6.1841476!4d106.8658339!16s%2Fg%2F11c5q48xv6?hl=id-ID&entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D';

const CALENDAR_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Silvia+%26+Wahyudi&dates=20260920T020000Z/20260920T080000Z&details=Pernikahan+Silvia+Wulandari+%26+Wahyudi&location=${encodeURIComponent(
  ADDRESS_TEXT
)}`;

const VIBRANT_PETALS = [
  { id: 1, left: '1%', delay: '-2.1s', duration: '18.5s', size: 28, color: 'ruby', rotate: 25 },
  { id: 2, left: '4%', delay: '-14.4s', duration: '22.2s', size: 15, color: 'gold', rotate: 60 },
  { id: 3, left: '7%', delay: '-6.8s', duration: '17.6s', size: 24, color: 'rose', rotate: -35 },
  { id: 4, left: '10%', delay: '-19.2s', duration: '21.0s', size: 14, color: 'ruby', rotate: 45 },
  { id: 5, left: '13%', delay: '-1.5s', duration: '16.4s', size: 30, color: 'gold', rotate: -55 },
  { id: 6, left: '16%', delay: '-9.3s', duration: '24.0s', size: 18, color: 'rose', rotate: 70 },
  { id: 7, left: '19%', delay: '-16.7s', duration: '19.0s', size: 26, color: 'ruby', rotate: -20 },
  { id: 8, left: '22%', delay: '-4.0s', duration: '20.8s', size: 16, color: 'gold', rotate: 40 },
  { id: 9, left: '25%', delay: '-12.5s', duration: '15.8s', size: 25, color: 'rose', rotate: -65 },
  { id: 10, left: '28%', delay: '-7.8s', duration: '23.5s', size: 19, color: 'ruby', rotate: 15 },
  { id: 11, left: '31%', delay: '-18.1s', duration: '18.4s', size: 32, color: 'gold', rotate: -45 },
  { id: 12, left: '34%', delay: '-3.6s', duration: '22.0s', size: 13, color: 'rose', rotate: 50 },
  { id: 13, left: '37%', delay: '-11.0s', duration: '16.6s', size: 27, color: 'ruby', rotate: -30 },
  { id: 14, left: '40%', delay: '-15.2s', duration: '20.2s', size: 21, color: 'gold', rotate: 65 },
  { id: 15, left: '43%', delay: '-5.9s', duration: '19.8s', size: 17, color: 'rose', rotate: -75 },
  { id: 16, left: '46%', delay: '-13.4s', duration: '23.8s', size: 29, color: 'ruby', rotate: 35 },
  { id: 17, left: '49%', delay: '-2.8s', duration: '15.4s', size: 14, color: 'gold', rotate: -40 },
  { id: 18, left: '52%', delay: '-17.6s', duration: '21.6s', size: 25, color: 'rose', rotate: 80 },
  { id: 19, left: '55%', delay: '-8.9s', duration: '18.1s', size: 20, color: 'ruby', rotate: -15 },
  { id: 20, left: '58%', delay: '-20.3s', duration: '24.2s', size: 31, color: 'gold', rotate: 55 },
  { id: 21, left: '61%', delay: '-6.7s', duration: '17.9s', size: 16, color: 'rose', rotate: -60 },
  { id: 22, left: '64%', delay: '-14.9s', duration: '22.0s', size: 24, color: 'ruby', rotate: 30 },
  { id: 23, left: '67%', delay: '-1.2s', duration: '16.5s', size: 18, color: 'gold', rotate: -50 },
  { id: 24, left: '70%', delay: '-10.0s', duration: '20.4s', size: 28, color: 'rose', rotate: 75 },
  { id: 25, left: '73%', delay: '-18.9s', duration: '17.7s', size: 15, color: 'ruby', rotate: -25 },
  { id: 26, left: '76%', delay: '-4.4s', duration: '23.6s', size: 26, color: 'gold', rotate: 45 },
  { id: 27, left: '79%', delay: '-15.5s', duration: '19.3s', size: 22, color: 'rose', rotate: -70 },
  { id: 28, left: '82%', delay: '-8.6s', duration: '21.9s', size: 19, color: 'ruby', rotate: 20 },
  { id: 29, left: '85%', delay: '-21.0s', duration: '18.7s', size: 23, color: 'rose', rotate: -45 },
  { id: 30, left: '88%', delay: '-3.8s', duration: '16.3s', size: 25, color: 'gold', rotate: 55 },
  { id: 31, left: '91%', delay: '-16.6s', duration: '20.1s', size: 17, color: 'ruby', rotate: -35 },
  { id: 32, left: '94%', delay: '-9.5s', duration: '23.7s', size: 27, color: 'rose', rotate: 60 },
  { id: 33, left: '97%', delay: '-2.4s', duration: '17.2s', size: 20, color: 'gold', rotate: -15 },
  { id: 34, left: '3%', delay: '-10.5s', duration: '19.5s', size: 22, color: 'ruby', rotate: 30 },
  { id: 35, left: '8%', delay: '-17.2s', duration: '21.4s', size: 18, color: 'gold', rotate: -65 },
  { id: 36, left: '14%', delay: '-5.1s', duration: '16.8s', size: 29, color: 'rose', rotate: 40 },
  { id: 37, left: '21%', delay: '-22.0s', duration: '22.8s', size: 15, color: 'ruby', rotate: -25 },
  { id: 38, left: '26%', delay: '-8.2s', duration: '18.2s', size: 26, color: 'gold', rotate: 50 },
  { id: 39, left: '33%', delay: '-13.9s', duration: '20.6s', size: 17, color: 'rose', rotate: -80 },
  { id: 40, left: '38%', delay: '-0.9s', duration: '15.9s', size: 31, color: 'ruby', rotate: 10 },
  { id: 41, left: '45%', delay: '-19.7s', duration: '23.1s', size: 16, color: 'gold', rotate: -40 },
  { id: 42, left: '50%', delay: '-11.8s', duration: '17.4s', size: 24, color: 'rose', rotate: 65 },
  { id: 43, left: '57%', delay: '-4.6s', duration: '21.2s', size: 20, color: 'ruby', rotate: -30 },
  { id: 44, left: '63%', delay: '-16.1s', duration: '18.9s', size: 28, color: 'gold', rotate: 35 },
  { id: 45, left: '68%', delay: '-7.3s', duration: '22.5s', size: 14, color: 'rose', rotate: -55 },
  { id: 46, left: '74%', delay: '-14.0s', duration: '16.1s', size: 27, color: 'ruby', rotate: 75 },
  { id: 47, left: '81%', delay: '-2.0s', duration: '24.5s', size: 19, color: 'gold', rotate: -20 },
  { id: 48, left: '87%', delay: '-18.5s', duration: '19.9s', size: 23, color: 'rose', rotate: 45 },
  { id: 49, left: '93%', delay: '-6.3s', duration: '17.0s', size: 25, color: 'ruby', rotate: -70 },
  { id: 50, left: '11%', delay: '-12.8s', duration: '20.5s', size: 21, color: 'rose', rotate: 15 },
  { id: 51, left: '35%', delay: '-21.5s', duration: '18.0s', size: 16, color: 'gold', rotate: -50 },
  { id: 52, left: '59%', delay: '-9.9s', duration: '22.7s', size: 30, color: 'ruby', rotate: 55 },
  { id: 53, left: '77%', delay: '-15.8s', duration: '16.7s', size: 18, color: 'rose', rotate: -35 },
  { id: 54, left: '90%', delay: '-4.9s', duration: '21.8s', size: 26, color: 'gold', rotate: 40 },
];

function GoldFiligreeCorner({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={`w-16 h-16 pointer-events-none ${className}`}>
      <path
        d="M 6 6 L 46 6 C 46 6 36 24 24 24 C 24 36 6 46 6 46 Z"
        stroke="url(#goldStrokeGrad)"
        strokeWidth="1.8"
        fill="rgba(245, 158, 11, 0.07)"
      />
      <path d="M 12 12 Q 32 12 32 32" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="3 3" />
      <path
        d="M 18 18 C 30 10 40 20 34 32 C 22 36 12 28 18 18 Z"
        fill="url(#goldFillGrad)"
        stroke="#F59E0B"
        strokeWidth="1"
      />
      <circle cx="22" cy="22" r="4" fill="#FBBF24" />
      <path d="M 42 7 C 54 10 56 22 44 25" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 7 42 C 10 54 22 56 25 44" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
      <defs>
        <linearGradient id="goldStrokeGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="goldFillGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" stopOpacity="0.4" />
          <stop offset="1" stopColor="#92400E" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function RoyalDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-3">
      <div className="h-[1.5px] w-14 bg-gradient-to-r from-transparent via-[#FBBF24] to-[#F59E0B]" />
      <div className="w-2.5 h-2.5 rotate-45 border border-[#FDE68A] bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
      <div className="h-[1.5px] w-14 bg-gradient-to-l from-transparent via-[#FBBF24] to-[#F59E0B]" />
    </div>
  );
}

export default function AcaraPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const difference = WEDDING_DATE.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setErrorMessage('Nama dan untaian doa restu wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('message', message.trim());
      if (selectedFile) {
        formData.append('proof', selectedFile);
      }

      const res = await fetch('/api/tanda-kasih', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setName('');
        setMessage('');
        handleRemoveFile();
      } else {
        setErrorMessage(data.error || 'Gagal menyimpan data ke sistem. Silakan coba kembali.');
      }
    } catch {
      setErrorMessage('Kendala jaringan saat mengirim. Silakan coba sesaat lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calendarDays = [
    null, null, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, null, null, null,
  ];

  return (
    <div className="w-full min-h-screen flex justify-center bg-[#03060C] select-none relative font-sans antialiased">
      <main className="w-full max-w-md bg-gradient-to-b from-[#070D19] via-[#0B1528] to-[#040810] relative border-x-2 border-[#D97706]/40 shadow-[0_0_90px_rgba(217,119,6,0.25)] min-h-screen text-[#F1F5F9] pb-24 overflow-hidden">
        <style>{`
          @keyframes pageEpicBloom {
            0% { opacity: 0; transform: translateY(28px) scale(0.97); filter: blur(8px); }
            100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
          }
          @keyframes majesticPetalFloat {
            0% {
              top: -12%;
              transform: translateX(0px) rotate3d(1, 1, 1, 0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.95;
            }
            25% {
              transform: translateX(28px) rotate3d(1, 2, 1, 90deg);
            }
            50% {
              transform: translateX(-20px) rotate3d(2, 1, 2, 180deg);
            }
            75% {
              transform: translateX(34px) rotate3d(1, 2, 1, 270deg);
            }
            92% {
              opacity: 0.9;
            }
            100% {
              top: 110%;
              transform: translateX(-18px) rotate3d(2, 1, 2, 360deg);
              opacity: 0;
            }
          }
          @keyframes heartGlowPulse {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px #F43F5E); }
            50% { transform: scale(1.35); filter: drop-shadow(0 0 14px #E11D48); }
          }

          .anim-page-bloom {
            animation: pageEpicBloom 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .anim-heart-glow {
            animation: heartGlowPulse 1.5s ease-in-out infinite;
          }
        `}</style>

        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-radial from-[#D97706]/25 via-[#BE123C]/10 to-transparent blur-3xl" />
          <div className="absolute top-[38%] -left-20 w-80 h-80 bg-radial from-[#E11D48]/20 via-transparent to-transparent blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-radial from-[#F59E0B]/25 via-transparent to-transparent blur-3xl" />

          {VIBRANT_PETALS.map((petal) => {
            const isRuby = petal.color === 'ruby';
            const isGold = petal.color === 'gold';

            return (
              <div
                key={petal.id}
                style={{
                  position: 'absolute',
                  left: petal.left,
                  animation: `majesticPetalFloat ${petal.duration} ease-in-out infinite`,
                  animationDelay: petal.delay,
                  zIndex: petal.size > 24 ? 2 : 1,
                }}
              >
                <svg
                  width={petal.size}
                  height={petal.size * 1.35}
                  viewBox="0 0 32 44"
                  fill="none"
                  style={{
                    transform: `rotate(${petal.rotate}deg)`,
                    filter: isRuby
                      ? 'drop-shadow(0 4px 12px rgba(225,29,72,0.75))'
                      : isGold
                      ? 'drop-shadow(0 4px 12px rgba(245,158,11,0.75))'
                      : 'drop-shadow(0 4px 12px rgba(253,164,175,0.65))',
                  }}
                >
                  <path
                    d="M16 0 C2 14 0 30 16 44 C32 30 30 14 16 0 Z"
                    fill={`url(#${petal.color}Gradient)`}
                  />
                  <path
                    d="M16 4 C16 16 16 28 16 40"
                    stroke={isGold ? '#FEF08A' : '#FFF'}
                    strokeWidth="1.2"
                    strokeOpacity="0.8"
                  />
                  <defs>
                    <linearGradient id="rubyGradient" x1="0" y1="0" x2="32" y2="44" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FDA4AF" />
                      <stop offset="0.35" stopColor="#E11D48" />
                      <stop offset="1" stopColor="#881337" />
                    </linearGradient>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="32" y2="44" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FEF08A" />
                      <stop offset="0.4" stopColor="#F59E0B" />
                      <stop offset="1" stopColor="#B45309" />
                    </linearGradient>
                    <linearGradient id="roseGradient" x1="0" y1="0" x2="32" y2="44" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFFFFF" />
                      <stop offset="0.45" stopColor="#FB7185" />
                      <stop offset="1" stopColor="#BE123C" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            );
          })}
        </div>

        <header className="sticky top-0 z-40 bg-[#070D19]/90 backdrop-blur-xl border-b border-[#F59E0B]/35 px-5 py-3.5 flex items-center justify-between shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
          <Link
            href="/?opened=true#couple-profile"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#F59E0B] bg-gradient-to-r from-[#92400E] to-[#B45309] text-white text-[10.5px] font-mono tracking-wider uppercase font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_2px_10px_rgba(217,119,6,0.3)]"
          >
            <span>← Profil Mempelai</span>
          </Link>
          <div className="flex flex-col items-end">
            <span className="text-[9.5px] font-mono tracking-[0.28em] text-[#FDE68A] uppercase font-extrabold drop-shadow-xs">
              Lembaran Acara
            </span>
            <span className="text-[8.5px] font-mono text-[#FDA4AF] tracking-widest uppercase font-semibold">
              Silvia &amp; Wahyudi
            </span>
          </div>
        </header>

        <div className="px-5 pt-6 space-y-8 anim-page-bloom relative z-10">
          <section className="relative rounded-[30px] bg-gradient-to-b from-[#111C33]/90 via-[#0B1528]/95 to-[#060D1A] border-2 border-[#F59E0B] p-6 text-center text-white space-y-5 shadow-[0_16px_45px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-md">
            <GoldFiligreeCorner className="absolute -top-1 -left-1" />
            <GoldFiligreeCorner className="absolute -top-1 -right-1 scale-x-[-1]" />
            <GoldFiligreeCorner className="absolute -bottom-1 -left-1 scale-y-[-1]" />
            <GoldFiligreeCorner className="absolute -bottom-1 -right-1 rotate-180" />

            <div className="space-y-1 relative z-10 pt-1">
              <span className="text-[9.5px] font-mono tracking-[0.32em] uppercase text-[#FDE68A] font-extrabold block">
                Menghitung Hari Bahagia
              </span>
              <h2 className="text-2xl font-serif font-extrabold text-white tracking-wide drop-shadow-[0_2px_12px_rgba(245,158,11,0.4)]">
                Menuju Momen Sakral
              </h2>
              <RoyalDivider />
            </div>

            <div className="relative z-10 rounded-2xl bg-[#040810]/70 backdrop-blur-md border border-[#F59E0B]/50 p-4 space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-[#F59E0B]/25 pb-2 px-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">🗓️</span>
                  <span className="text-xs font-serif font-bold tracking-widest text-[#FDE68A] uppercase">
                    September 2026
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#FDE68A] bg-[#92400E]/40 border border-[#F59E0B]/50 px-2.5 py-0.5 rounded-full font-bold">
                  Minggu, 20 September
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10.5px]">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d, i) => (
                  <span key={i} className={`font-bold py-1 ${i === 0 ? 'text-[#FDA4AF]' : 'text-[#FDE68A]'}`}>
                    {d}
                  </span>
                ))}

                {calendarDays.map((day, idx) => {
                  if (day === null) {
                    return <span key={idx} className="py-1 opacity-0" />;
                  }

                  const isTargetDate = day === 20;

                  return (
                    <div
                      key={idx}
                      className={`relative py-1.5 flex items-center justify-center rounded-xl text-[11px] font-bold transition-transform ${
                        isTargetDate
                          ? 'bg-gradient-to-b from-[#FDE68A] via-[#F59E0B] to-[#B45309] text-[#060D1A] shadow-[0_0_18px_#F59E0B] scale-110 z-10 font-extrabold'
                          : 'text-[#E2E8F0] hover:bg-white/10'
                      }`}
                    >
                      <span>{day}</span>
                      {isTargetDate && (
                        <span className="absolute -top-3 -right-1.5 text-[15px] anim-heart-glow">
                          ❤️
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2.5 pt-0.5 relative z-10">
              {[
                { label: 'Hari', value: timeLeft.days },
                { label: 'Jam', value: timeLeft.hours },
                { label: 'Menit', value: timeLeft.minutes },
                { label: 'Detik', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-2xl bg-gradient-to-b from-[#182844]/80 to-[#0B1528]/80 border border-[#F59E0B]/50 flex flex-col items-center shadow-[0_4px_14px_rgba(0,0,0,0.4)]"
                >
                  <span className="text-xl font-mono font-extrabold text-[#FDE68A] tracking-tight drop-shadow-xs">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-mono tracking-wider uppercase text-[#CBD5E1] pt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-1 relative z-10">
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#F59E0B] bg-gradient-to-r from-[#B45309]/50 via-[#F59E0B]/30 to-[#B45309]/50 hover:brightness-125 active:scale-95 text-xs font-mono text-[#FDE68A] font-bold tracking-wider transition-all shadow-[0_2px_12px_rgba(245,158,11,0.25)]"
              >
                <span>📅 Simpan di Kalender Google</span>
              </a>
            </div>
          </section>

          <section className="space-y-3">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[#FDE68A] font-extrabold block">
                Pelaksanaan Acara
              </span>
              <h3 className="text-2xl font-serif text-white font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                Waktu &amp; Tempat
              </h3>
            </div>

            <div className="relative rounded-[30px] bg-gradient-to-b from-[#101C33]/90 via-[#0B1528]/95 to-[#060D1A] border-2 border-[#F59E0B]/80 p-6 space-y-4 shadow-[0_16px_45px_rgba(0,0,0,0.6)] text-center overflow-hidden backdrop-blur-md">
              <GoldFiligreeCorner className="absolute -top-1 -left-1" />
              <GoldFiligreeCorner className="absolute -top-1 -right-1 scale-x-[-1]" />
              <GoldFiligreeCorner className="absolute -bottom-1 -left-1 scale-y-[-1]" />
              <GoldFiligreeCorner className="absolute -bottom-1 -right-1 rotate-180" />

              <div className="inline-block border-b-2 border-[#F59E0B]/60 pb-1.5 px-5 relative z-10">
                <span className="text-sm font-mono tracking-widest text-[#FDE68A] font-extrabold uppercase drop-shadow-xs">
                  Akad Nikah &amp; Syukuran
                </span>
              </div>

              <div className="space-y-2 relative z-10">
                <p className="text-lg font-serif font-extrabold text-white">
                  Minggu, 20 September 2026
                </p>
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1A2E50]/80 text-[#FDE68A] font-mono text-xs font-bold border border-[#F59E0B]/40 shadow-xs">
                  <span>🕒 Pukul 09.00 WIB – Selesai</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F59E0B]/25 space-y-1.5 relative z-10">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#FDA4AF] font-bold block">
                  Lokasi Acara
                </span>
                <p className="text-base font-serif font-bold text-white">
                  Kediaman Mempelai Wanita
                </p>
                <p className="text-xs text-[#CBD5E1] leading-relaxed max-w-xs mx-auto">
                  {ADDRESS_TEXT}
                </p>
              </div>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 w-full py-3.5 px-4 rounded-2xl border border-[#FDE68A] bg-gradient-to-r from-[#92400E] via-[#D97706] to-[#92400E] text-white text-xs font-mono font-bold tracking-wider hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-[0_6px_22px_rgba(217,119,6,0.35)]"
              >
                <span>📍 Buka Petunjuk Arah (Google Maps)</span>
              </a>
            </div>
          </section>

          <section className="space-y-3">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[#FDE68A] font-extrabold block">
                Ungkapan Kasih
              </span>
              <h3 className="text-2xl font-serif text-white font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                Amplop Digital &amp; Doa Restu
              </h3>
              <p className="text-xs text-[#CBD5E1] leading-relaxed max-w-xs mx-auto pt-0.5">
                Doa restu Anda adalah kado terindah bagi kami. Bagi keluarga dan sahabat yang ingin memberikan tanda kasih secara digital:
              </p>
            </div>

            <div className="relative rounded-[30px] bg-gradient-to-b from-[#101C33]/90 via-[#0B1528]/95 to-[#060D1A] border-2 border-[#F59E0B]/80 p-6 flex flex-col items-center text-center space-y-5 shadow-[0_16px_45px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-md">
              <GoldFiligreeCorner className="absolute -top-1 -left-1" />
              <GoldFiligreeCorner className="absolute -top-1 -right-1 scale-x-[-1]" />
              <GoldFiligreeCorner className="absolute -bottom-1 -left-1 scale-y-[-1]" />
              <GoldFiligreeCorner className="absolute -bottom-1 -right-1 rotate-180" />

              <div className="space-y-1 relative z-10">
                <span className="text-xs font-mono font-extrabold tracking-widest text-[#FDE68A] uppercase block drop-shadow-xs">
                  QRIS Pembayaran Digital
                </span>
                <p className="text-[11px] text-[#94A3B8]">
                  Dapat dipindai via BCA, Mandiri, GoPay, OVO, ShopeePay &amp; Seluruh M-Banking
                </p>
              </div>

              <div className="relative p-3.5 rounded-3xl bg-gradient-to-b from-white to-[#F1F5F9] border-2 border-[#F59E0B] shadow-[0_0_28px_rgba(245,158,11,0.25)] w-60 h-60 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-2xl bg-white p-2 border border-[#E2E8F0] flex items-center justify-center">
                  <img
                    src="/images/qris.png"
                    alt="QRIS Barcode"
                    className="w-full h-full object-contain filter contrast-105"
                  />
                </div>
              </div>

              <div className="w-full relative z-10">
                <a
                  href="/images/qris.png"
                  download="QRIS-Wedding-Silvia-Wahyudi.png"
                  className="w-full py-2.5 px-4 rounded-xl border border-[#F59E0B]/60 bg-[#162744]/80 text-[#FDE68A] text-xs font-mono font-bold tracking-wider hover:bg-[#1C3259] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>📥 Unduh Barcode QRIS</span>
                </a>
              </div>

              <div className="w-full pt-4 border-t border-[#F59E0B]/25 text-left space-y-3.5 relative z-10">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-extrabold text-[#FDE68A] uppercase tracking-wider block">
                    Konfirmasi Tanda Kasih &amp; Doa
                  </span>
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                    Sertakan nama, doa tulus, dan lampiran bukti transfer agar tersimpan langsung untuk kedua mempelai:
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-[10.5px] font-mono font-bold text-[#FDE68A] uppercase block mb-1">
                      Nama Pengirim:
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Rian &amp; Keluarga"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F59E0B]/40 bg-[#060D1A]/90 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10.5px] font-mono font-bold text-[#FDE68A] uppercase block mb-1">
                      Untaian Doa &amp; Restu:
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tuliskan ucapan selamat atau doa restu Anda..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F59E0B]/40 bg-[#060D1A]/90 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10.5px] font-mono font-bold text-[#FDE68A] uppercase block mb-1">
                      Lampiran Bukti Transfer (Opsional):
                    </label>
                    <div className="p-3 rounded-2xl border-2 border-dashed border-[#F59E0B]/50 bg-[#060D1A]/60 flex flex-col items-center justify-center gap-2 text-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full text-xs text-[#94A3B8] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#B45309] file:text-white file:text-[10px] file:font-mono file:font-bold hover:file:bg-[#D97706] cursor-pointer"
                      />

                      {previewUrl && (
                        <div className="mt-1 relative inline-block p-1 bg-white border border-[#F59E0B] rounded-xl shadow-md">
                          <img
                            src={previewUrl}
                            alt="Preview Bukti Transfer"
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-sm"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {errorMessage && (
                    <p className="text-[11px] font-mono text-rose-400 font-bold">
                      ⚠️ {errorMessage}
                    </p>
                  )}

                  {isSuccess && (
                    <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-500 text-emerald-200 text-xs font-serif leading-relaxed text-center shadow-xs">
                      ✨ Terima kasih banyak! Doa restu dan bukti tanda kasih Anda telah berhasil tersimpan di sistem untuk kedua mempelai.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 px-4 rounded-2xl border-2 border-[#FDE68A] bg-gradient-to-r from-[#92400E] via-[#D97706] to-[#92400E] text-white text-xs font-mono font-bold tracking-wider hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-[0_6px_22px_rgba(217,119,6,0.35)] ${
                      isSubmitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <span>
                      {isSubmitting ? '⏳ Sedang Menyimpan ke Sistem...' : '💌 Kirim Tanda Kasih &amp; Doa'}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </section>

          <footer className="pt-6 flex flex-col items-center gap-3 relative z-10">
            <Link
              href="/?opened=true#couple-profile"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#F59E0B] bg-[#0E1A30] text-xs text-[#FDE68A] font-mono font-bold tracking-wider hover:bg-[#142544] active:scale-95 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
            >
              <span>← Kembali ke Profil Mempelai</span>
            </Link>
            <div className="flex items-center gap-2 pt-1 opacity-80">
              <span className="w-8 h-[1px] bg-[#F59E0B]" />
              <p className="text-[10px] font-mono text-[#FDE68A] tracking-[0.25em] uppercase">
                Silvia &amp; Wahyudi
              </p>
              <span className="w-8 h-[1px] bg-[#F59E0B]" />
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}