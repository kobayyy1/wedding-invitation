import Link from 'next/link';

interface BioProfile {
  role: string;
  fullName: string;
  nickName: string;
  birthDate: string;
  familyLabel: string;
  familyNote: string;
  photo: string;
  photoPos: string;
  passionBadge: string;
  quote: string;
  perspectiveTitle: string;
  perspectiveSubtitle: string;
  perspectiveContent: string;
}

const BIOGRAPHY_PROFILES: Record<'silvia' | 'wahyudi', BioProfile> = {
  silvia: {
    role: 'Mempelai Wanita',
    fullName: 'Silvia Wulandari',
    nickName: 'Silvia',
    birthDate: '14 Mei 1996',
    familyLabel: 'Anak Kedua dari Pasangan',
    familyNote: 'Bapak Amir Syarifudin & Ibu Sumiyati',
    photo: '/images/silvia.png',
    photoPos: 'object-top',
    passionBadge: 'Karya Musik & Wirausaha',
    quote:
      'Ia belajar tersenyum sebelum memahami arti bahagia, hingga semesta membawanya pulang pada seseorang yang tak pernah menuntutnya berpura-pura tegar.',
    perspectiveTitle: 'Tentang Riyandi Wahyudi di Mataku',
    perspectiveSubtitle: 'Sebuah Catatan Batin dari Silvia',
    perspectiveContent:
      'Bertahun-tahun aku mengayun pedangku sendirian, meyakinkan dunia bahwa aku wanita yang cukup kuat untuk tidak memerlukan siapa pun. Aku terbiasa tersenyum tipis hanya agar orang lain tidak mencemaskanku, meski di dalam dadaku ada lelah yang teramat sunyi.\n\nLalu Riyandi Wahyudi datang—bukan untuk merampas kemandirianku, melainkan menaruh pundaknya agar aku bisa menundukkan kepala dan beristirahat sejenak. Ia adalah satu-satunya orang yang mampu membaca luka di balik tawaku yang dulu hampa. Di hadapannya, aku tidak lagi dituntut menjadi prajurit yang kebal; aku diizinkan menjadi wanita biasa yang boleh rapuh dan menangis. Ketulusannya merawat luka masa laluku mengajariku satu hal: bahwa rumah sesungguhnya bukanlah bangunan bertiang, melainkan sepasang mata teduh yang membuatku tak perlu lagi berpura-pura bahagia.',
  },
  wahyudi: {
    role: 'Mempelai Pria',
    fullName: 'Riyandi Wahyudi',
    nickName: 'Yudi',
    birthDate: 'Sungai Pelang, 14 Feb 1985',
    familyLabel: 'Anak Bungsu dari Pasangan',
    familyNote: 'Alm.Bapak Abdul Rani & Ibu Farida',
    photo: '/images/wahyudi.png',
    photoPos: 'object-top',
    passionBadge: 'Balap Motor Sport & Trail',
    quote:
      'Di lintasan kecepatan kita belajar fokus dan kendali, namun di hadapan ketulusan hati kita belajar tentang arti setia dan melindungi.',
    perspectiveTitle: 'Tentang Silvia di Mataku',
    perspectiveSubtitle: 'Sebuah Catatan Batin dari Riyandi Wahyudi',
    perspectiveContent:
      'Pertama kali melihatnya, aku tahu ia bukan wanita yang mudah ditaklukkan oleh kerasnya dunia. Ada ketegasan seorang pejuang dalam tatapannya—jenis ketangguhan yang lahir dari seseorang yang telah berjuang keras sejak belia, jatuh bangun menaklukkan dunia musik dengan kecerdasan dan karyanya sendiri.\n\nNamun di balik zirah keras dan senyum tegarnya, aku melihat seorang jiwa jujur yang telah menempuh perjalanan teramat jauh dan merindukan pelabuhan teduh. Bagiku kelembutan hatinya saat bersamaku adalah anugerah terbesar yang ingin kujaga seumur hidupku. Aku hadir bukan untuk meremehkan masa lalunya yang penuh perjuangan; aku hadir agar ia tahu bahwa ia tak perlu lagi bertarung sendirian.',
  },
};

// Next.js static export mendaftarkan semua kemungkinan URL slug di sini
export async function generateStaticParams() {
  return [
    { slug: 'silvia' },
    { slug: 'wahyudi' },
    { slug: 'riyandi' },
  ];
}

function CardFloralCorner({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 75 75" fill="none" className={`w-12 h-12 pointer-events-none ${className}`}>
      <path
        d="M 4 4 L 36 4 C 36 4 30 18 18 18 C 18 30 4 36 4 36 Z"
        stroke="#F59E0B"
        strokeWidth="1.4"
        fill="rgba(245,158,11,0.12)"
      />
      <path d="M 8 8 Q 24 8 24 24" stroke="#FDE68A" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M 12 12 C 22 6 30 12 26 22 C 16 26 8 20 12 12 Z" fill="#111E36" stroke="#F59E0B" strokeWidth="1" />
      <g transform="translate(6, 6) scale(0.65)">
        <circle cx="16" cy="16" r="14" fill="#08101E" stroke="#F59E0B" strokeWidth="1.2" />
        <circle cx="16" cy="16" r="4.5" fill="#FDE68A" />
      </g>
    </svg>
  );
}

function BotanicalWreath() {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none animate-[spin_40s_linear_infinite]">
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full opacity-80">
        <circle cx="80" cy="80" r="66" stroke="#F59E0B" strokeWidth="1.3" strokeDasharray="6 3" />
        <circle cx="80" cy="80" r="72" stroke="#FDE68A" strokeWidth="0.8" opacity="0.6" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 80 80)`}>
            <circle cx="80" cy="10" r="4" fill="#08101E" stroke="#F59E0B" strokeWidth="1" />
            <circle cx="80" cy="10" r="2" fill="#FDE68A" />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default async function BiografiPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const rawSlug = resolvedParams?.slug || 'silvia';
  const slugKey =
    rawSlug.toLowerCase().includes('wahyudi') || rawSlug.toLowerCase().includes('riyandi')
      ? 'wahyudi'
      : 'silvia';
  const person = BIOGRAPHY_PROFILES[slugKey] || BIOGRAPHY_PROFILES.silvia;

  return (
    <div className="w-full min-h-screen flex justify-center bg-[#02050B] select-none relative font-sans antialiased">
      <main className="w-full max-w-md bg-gradient-to-b from-[#0B1528] via-[#070D19] to-[#03060E] relative border-x border-[#F59E0B]/30 shadow-[0_0_80px_rgba(0,0,0,0.95)] min-h-screen text-gray-200 pb-12">
        {/* HEADER */}
        <header className="sticky top-0 z-30 bg-[#070D19]/90 backdrop-blur-md border-b border-[#F59E0B]/30 px-5 py-3 flex items-center justify-between">
          <Link
            href="/?opened=true"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#F59E0B] bg-[#111C33] text-white text-[10.5px] font-mono tracking-wider uppercase font-bold hover:bg-[#1A2E4E] active:scale-95 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            <span className="text-[#FDE68A]">←</span>
            <span>Kembali ke Undangan</span>
          </Link>
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#FDE68A] uppercase font-extrabold drop-shadow-xs">
            Biografi Resmi
          </span>
        </header>

        <div className="px-5 pt-5 space-y-6">
          {/* SECTION 1: PROFIL UTAMA */}
          <section className="relative rounded-[26px] bg-gradient-to-b from-[#111C33]/95 via-[#0B1528]/98 to-[#050B17] border-2 border-[#F59E0B]/80 p-6 flex flex-col items-center text-center space-y-4 shadow-[0_16px_45px_rgba(0,0,0,0.65)] overflow-hidden">
            <CardFloralCorner className="absolute -top-1 -left-1" />
            <CardFloralCorner className="absolute -top-1 -right-1 scale-x-[-1]" />
            <CardFloralCorner className="absolute -bottom-1 -left-1 scale-y-[-1]" />
            <CardFloralCorner className="absolute -bottom-1 -right-1 rotate-180" />

            <div className="relative w-32 h-32 flex items-center justify-center mt-1">
              <BotanicalWreath />
              <div className="w-22 h-22 rounded-full overflow-hidden border-2 border-[#FDE68A] p-1 shadow-[0_0_24px_rgba(245,158,11,0.45)] bg-gradient-to-b from-[#B45309] via-[#92400E] to-[#78350F]">
                <img
                  src={person.photo}
                  alt={person.fullName}
                  className={`w-full h-full object-cover ${person.photoPos} filter brightness-105 rounded-full`}
                />
              </div>
            </div>

            <div className="space-y-1.5 relative z-10">
              <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#FDE68A] font-extrabold bg-[#162744]/90 border border-[#F59E0B]/50 px-4 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                {person.role}
              </span>
              <h1 className="text-2xl font-serif text-white font-extrabold tracking-wide pt-1 drop-shadow-[0_2px_12px_rgba(245,158,11,0.4)]">
                {person.fullName}
              </h1>
              <p className="text-xs text-[#94A3B8] font-medium pt-0.5">
                {person.familyLabel} <br />
                <span className="text-[#FDE68A] font-bold">{person.familyNote}</span>
              </p>
            </div>

            <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-[#F59E0B]/25 text-left">
              <div className="p-2.5 rounded-xl bg-[#0B1528]/80 border border-[#F59E0B]/30 shadow-inner">
                <span className="text-[9px] font-mono tracking-wider uppercase text-[#FDE68A]/80 font-bold block">
                  Kelahiran
                </span>
                <span className="text-[11px] font-serif text-white font-bold block pt-0.5">
                  {person.birthDate}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0B1528]/80 border border-[#F59E0B]/30 shadow-inner">
                <span className="text-[9px] font-mono tracking-wider uppercase text-[#FDE68A]/80 font-bold block">
                  Fokus &amp; Hobi
                </span>
                <span className="text-[11px] font-serif text-white font-bold block pt-0.5 truncate">
                  {person.passionBadge}
                </span>
              </div>
            </div>

            <div className="w-full p-3.5 rounded-xl bg-gradient-to-r from-[#0E1B33]/80 via-[#142647]/90 to-[#0E1B33]/80 border border-[#F59E0B]/50 text-center shadow-md">
              <p className="text-[11.5px] text-[#FDE68A] italic font-serif leading-relaxed drop-shadow-xs">
                &ldquo;{person.quote}&rdquo;
              </p>
            </div>
          </section>

          {/* SECTION 2: SUDUT PANDANG PASANGAN (CATATAN BATIN) */}
          <section className="rounded-[24px] bg-gradient-to-b from-[#111C33] via-[#0D182E] to-[#060C18] border-2 border-[#F59E0B] p-5.5 text-white space-y-3 shadow-[0_14px_38px_rgba(0,0,0,0.7)] relative overflow-hidden">
            <div className="space-y-0.5 border-b border-[#F59E0B]/30 pb-2">
              <span className="text-[9.5px] font-mono tracking-[0.25em] text-[#FDA4AF] uppercase font-extrabold block drop-shadow-xs">
                {person.perspectiveSubtitle}
              </span>
              <h3 className="text-sm font-serif font-bold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]">
                {person.perspectiveTitle}
              </h3>
            </div>
            <p className="text-[12px] italic font-serif leading-relaxed text-justify whitespace-pre-line text-[#F1F5F9]">
              {person.perspectiveContent}
            </p>
          </section>

          {/* FOOTER */}
          <footer className="flex flex-col items-center gap-3 pt-4">
            <Link
              href="/?opened=true"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-[#F59E0B]/60 bg-[#111C33] text-xs font-mono text-[#FDE68A] hover:bg-[#1A2E4E] active:scale-95 tracking-wider transition-all shadow-[0_4px_16px_rgba(0,0,0,0.5)] font-bold"
            >
              ← Kembali ke Beranda Undangan
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}