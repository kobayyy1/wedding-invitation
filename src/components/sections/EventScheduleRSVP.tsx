'use client';

import { useState, useEffect } from 'react';

interface EventScheduleRSVPProps {
  onBackToProfile: () => void;
}

export default function EventScheduleRSVP({ onBackToProfile }: EventScheduleRSVPProps) {
  // Hitung Mundur Menuju 20 September 2026
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-09-20T08:00:00+07:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Form State RSVP
  const [formData, setFormData] = useState({ name: '', status: 'hadir', guests: '1', wishes: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full px-5 pt-8 pb-20 space-y-10 relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Tombol Kembali ke Halaman Profil */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={onBackToProfile}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A059]/70 bg-white/90 text-[10px] font-mono tracking-wider uppercase text-[#133A5E] font-bold shadow-sm hover:bg-[#F1F7FB] active:scale-95 transition-all cursor-pointer"
        >
          <span>←</span>
          <span>Kembali ke Profil</span>
        </button>
      </div>

      {/* Header Halaman Kedua */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#C5A059] bg-[#143B5E] text-[#DFC384] text-[9.5px] font-mono tracking-[0.25em] uppercase font-bold shadow-sm">
          <span>Agenda Bahagia</span>
        </div>
        <h2 className="text-2xl font-serif text-[#08182B] font-extrabold tracking-wide">
          Rangkaian Acara
        </h2>
        <p className="text-xs text-[#24466B] font-medium max-w-xs mx-auto leading-relaxed">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir pada:
        </p>
      </div>

      {/* ======================================================== */}
      {/* 1. COUNTDOWN TIMER MEWAH                                 */}
      {/* ======================================================== */}
      <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto text-center">
        {[
          { label: 'HARI', val: timeLeft.days },
          { label: 'JAM', val: timeLeft.hours },
          { label: 'MENIT', val: timeLeft.minutes },
          { label: 'DETIK', val: timeLeft.seconds },
        ].map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white/90 border border-[#C5A059]/60 p-2.5 shadow-[0_4px_16px_rgba(20,55,90,0.08)] flex flex-col items-center justify-center"
          >
            <span className="text-xl font-serif font-extrabold text-[#133A5E]">
              {String(item.val).padStart(2, '0')}
            </span>
            <span className="text-[8px] font-mono tracking-wider text-[#C5A059] font-bold">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* ======================================================== */}
      {/* 2. KARTU AKAD NIKAH & RESEPSI                            */}
      {/* ======================================================== */}
      <div className="space-y-6">
        {/* AKAD NIKAH */}
        <div className="relative rounded-2xl bg-white/95 border-2 border-[#C5A059]/70 p-6 space-y-3 shadow-[0_10px_30px_rgba(20,55,90,0.1)]">
          <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-2.5">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase font-extrabold">
              Akad Nikah
            </span>
            <span className="text-xs font-serif italic text-[#133A5E] font-bold">08.00 - 10.00 WIB</span>
          </div>

          <h3 className="text-lg font-serif text-[#08182B] font-bold">
            Minggu, 20 September 2026
          </h3>

          <p className="text-xs text-[#24466B] leading-relaxed">
            <strong className="text-[#08182B]">Masjid Agung Sunda Kelapa</strong> <br />
            Jl. Taman Sunda Kelapa No.16, Menteng, Jakarta Pusat
          </p>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#C5A059] bg-[#F4F8FC] text-[#133A5E] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#E8F1F8] transition-all shadow-sm"
          >
            <span>Buka Google Maps</span>
            <span>↗</span>
          </a>
        </div>

        {/* RESEPSI PERNIKAHAN */}
        <div className="relative rounded-2xl bg-white/95 border-2 border-[#1E4D75]/60 p-6 space-y-3 shadow-[0_10px_30px_rgba(20,55,90,0.1)]">
          <div className="flex items-center justify-between border-b border-[#1E4D75]/20 pb-2.5">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#1E4D75] uppercase font-extrabold">
              Resepsi Pernikahan
            </span>
            <span className="text-xs font-serif italic text-[#C5A059] font-bold">11.00 - 14.00 WIB</span>
          </div>

          <h3 className="text-lg font-serif text-[#08182B] font-bold">
            Minggu, 20 September 2026
          </h3>

          <p className="text-xs text-[#24466B] leading-relaxed">
            <strong className="text-[#08182B]">Grand Ballroom Hotel Indonesia</strong> <br />
            Jl. M.H. Thamrin No.1, Menteng, Jakarta Pusat
          </p>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#1E4D75] bg-[#143B5E] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#0E2C48] transition-all shadow-md"
          >
            <span>Buka Lokasi Resepsi</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. FORMULIR KONFIRMASI KEHADIRAN (RSVP)                  */}
      {/* ======================================================== */}
      <div className="rounded-2xl bg-gradient-to-b from-white to-[#F2F7FB] border-2 border-[#C5A059] p-6 space-y-5 shadow-[0_12px_32px_rgba(20,55,90,0.12)]">
        <div className="text-center space-y-1">
          <span className="text-[9.5px] font-mono tracking-[0.25em] text-[#C5A059] uppercase font-extrabold">
            Buku Tamu &amp; Reservasi
          </span>
          <h3 className="text-xl font-serif text-[#08182B] font-bold">
            Konfirmasi Kehadiran (RSVP)
          </h3>
          <p className="text-[11.5px] text-[#24466B]">
            Mohon konfirmasikan kehadiran Anda sebelum tanggal 10 September 2026.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-50 text-center space-y-1.5 animate-in zoom-in-95 duration-500">
            <span className="text-xl">✨</span>
            <p className="text-xs font-serif font-bold text-emerald-900">
              Terima Kasih Atas Konfirmasinya!
            </p>
            <p className="text-[11px] text-emerald-800 font-light">
              Doa restu dan kehadiran Anda merupakan kebahagiaan terbesar bagi kami.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitRSVP} className="space-y-3.5">
            <div>
              <label className="block text-[10.5px] font-mono text-[#08182B] font-bold uppercase mb-1">
                Tamu Undangan
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tuliskan nama lengkap Anda..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#B3CFE5] bg-white text-xs text-[#08182B] focus:outline-none focus:border-[#1E4D75] focus:ring-1 focus:ring-[#1E4D75]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10.5px] font-mono text-[#08182B] font-bold uppercase mb-1">
                  Kehadiran
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#B3CFE5] bg-white text-xs text-[#08182B] focus:outline-none focus:border-[#1E4D75]"
                >
                  <option value="hadir">Pasti Hadir</option>
                  <option value="ragu">Masih Ragu</option>
                  <option value="tidak">Maaf Berhalangan</option>
                </select>
              </div>

              <div>
                <label className="block text-[10.5px] font-mono text-[#08182B] font-bold uppercase mb-1">
                  Jumlah Tamu
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#B3CFE5] bg-white text-xs text-[#08182B] focus:outline-none focus:border-[#1E4D75]"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10.5px] font-mono text-[#08182B] font-bold uppercase mb-1">
                Ucapan &amp; Doa Restu
              </label>
              <textarea
                rows={3}
                value={formData.wishes}
                onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                placeholder="Tuliskan pesan & doa tulus Anda..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#B3CFE5] bg-white text-xs text-[#08182B] focus:outline-none focus:border-[#1E4D75]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#DFC384] to-[#C5A059] text-[#08182B] text-xs font-mono font-extrabold uppercase tracking-[0.2em] shadow-[0_4px_15px_rgba(197,160,89,0.35)] active:scale-95 transition-all cursor-pointer"
            >
              Kirim Konfirmasi Kehadiran
            </button>
          </form>
        )}
      </div>
    </div>
  );
}