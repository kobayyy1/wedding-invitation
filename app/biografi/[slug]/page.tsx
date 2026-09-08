'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

interface BioProfile {
  role: string;
  fullName: string;
  nickName: string;
  birthDate: string;
  parents: string;
  photo: string;
  photoPos: string;
  profession: string;
  passionBadge: string;
  instagram: string;
  quote: string;
  storyTitle: string;
  storyParagraphs: string[];
  perspectiveTitle: string;
  perspectiveSubtitle: string;
  perspectiveContent: string;
}

const BIOGRAPHY_PROFILES: Record<'silvia' | 'wahyudi', BioProfile> = {
  silvia: {
    role: 'Mempelai Wanita',
    fullName: 'Silvia Wulandari, S.Kom',
    nickName: 'Silvia',
    birthDate: '14 Mei 1996',
    parents: 'Bapak Fulan & Ibu Fulanah',
    photo: '/images/couple-3d.png',
    photoPos: 'object-top',
    profession: 'Creative Entrepreneur & Electronic Music Artist',
    passionBadge: 'Karya Musik & Wirausaha',
    instagram: '@silvia.wulandari',
    quote:
      'Ia belajar tersenyum sebelum memahami arti bahagia, hingga semesta membawanya pulang pada seseorang yang tak pernah menuntutnya berpura-pura tegar.',
    storyTitle: 'Riwajat, Tempaan, & Jejak Kelana',
    storyParagraphs: [
      'Lahir pada 14 Mei 1996 di bawah naungan kesederhanaan keluarga yang mengajarkannya arti syukur tanpa syarat. Tumbuh di antara dinamika lingkungan yang majemuk dan keras, Silvia ditempa menjadi sosok karang yang pantang goyah. Jiwanya mandiri, langkahnya tegap bak wanita tomboi yang menolak berpangku tangan pada keadaan. Menghadapi rintangan hidup yang datang silih berganti, ia memilih berdiri tegak menopang segalanya seorang diri—kerap membungkus letihnya di balik senyuman tegar yang sesungguhnya belum seutuhnya sampai ke sudut mata.',
      'Seusai menamatkan bangku sekolah menengah atas, tekadnya untuk mandiri langsung membawanya melangkah ke dunia kerja tanpa ragu. Jiwa pejuangnya teruji saat ia memberanikan diri terjun ke rimba wirausaha. Mulai dari dinamika merintis usaha kuliner makanan hingga perniagaan komoditas barang pernah ia lakoni dengan peluh dan ketulusan hati. Segala pasang surut dunia usaha ia jadikan kawah candradimuka yang menajamkan mentalitas serta kemandiriannya.',
      'Pengembaraan hidup yang membawanya berkelana puluhan kilometer jauhnya dari rumah kemudian mempertemukannya dengan panggilan jiwa yang baru di dunia musik. Berangkat dari ketidaktahuan yang pekat, bermodalkan kecerdasan akal, kepekaan rasa, dan ketekunan yang tak kenal lelah, Silvia menyelami seni merangkai nada dari titik nol. Dari rasa ingin tahu murni hingga kini berdiri mantap secara profesional menghasilkan karya cipta musiknya sendiri, ia membuktikan bahwa keterbatasan tak pernah mampu membelenggu sayap kreativitasnya.',
      'Perjalanan panjang yang sarat perjuangan itu akhirnya bermuara pada pertemuan dengan laki-laki pilihannya. Untuk pertama kalinya setelah bertahun-tahun mengenakan zirah pertahanan diri, beban di pundaknya luruh perlahan. Di sanalah senyum tulus yang lama terkunci kembali terbit dengan bebas; bukan lagi sebagai topeng ketegaran, melainkan cermin jiwa yang telah menemukan tempatnya berlabuh.',
    ],
    perspectiveTitle: 'Tentang Wahyudi di Mataku',
    perspectiveSubtitle: 'Sebuah Catatan Batin dari Silvia',
    perspectiveContent:
      'Bertahun-tahun aku mengayun pedangku sendirian, meyakinkan dunia bahwa aku wanita yang cukup kuat untuk tidak memerlukan siapa pun. Aku terbiasa tersenyum tipis hanya agar orang lain tidak mencemaskanku, meski di dalam dadaku ada lelah yang teramat sunyi.\n\nLalu Wahyudi datang—bukan untuk merampas kemandirianku, melainkan menaruh pundaknya agar aku bisa menundukkan kepala dan beristirahat sejenak. Ia adalah satu-satunya orang yang mampu membaca luka di balik tawaku yang dulu hampa. Di hadapannya, aku tidak lagi dituntut menjadi prajurit yang kebal; aku diizinkan menjadi wanita biasa yang boleh rapuh dan menangis. Ketulusannya merawat luka masa laluku mengajariku satu hal: bahwa rumah sesungguhnya bukanlah bangunan bertiang, melainkan sepasang mata teduh yang membuatku tak perlu lagi berpura-pura bahagia.',
  },
  wahyudi: {
    role: 'Mempelai Pria',
    fullName: 'Wahyudi, S.Kom',
    nickName: 'Yudi',
    birthDate: '29 Oktober 1994',
    parents: 'Bapak Fulan & Ibu Fulanah',
    photo: '/images/couple-3d.png',
    photoPos: 'object-bottom',
    profession: 'Sarjana Komputer & Tech Lead Engineer',
    passionBadge: 'Software Architecture & Otomotif',
    instagram: '@wahyudi_dev',
    quote:
      'Cinta sejati bukanlah tentang dua tatapan yang saling mencari, melainkan dua jiwa yang melangkah memandang arah yang sama.',
    storyTitle: 'Pilar Waktu, Karsa, & Dedikasi',
    storyParagraphs: [
      'Lahir pada 29 Oktober 1994, Wahyudi dibimbing dalam keluarga yang menjunjung tinggi ketertiban dan ketulusan sikap. Ia tumbuh sebagai pribadi yang tenang, hemat bicara, namun memiliki keteguhan tekad yang sulit digoyahkan. Sejak masa belia, bakat analitisnya telah menuntunnya mendalami dunia rekayasa perangkat lunak—sebuah jalur yang ia tekuni dengan kesungguhan penuh hingga kini dipercaya merancang fondasi arsitektur sistem teknologi berskala besar.',
      'Di balik hari-harinya yang padat dengan keteraturan logika komputasi, Wahyudi menemukan keseimbangan batin melalui ritual seduhan kopi manual di keheningan fajar, serta kecintaannya merestorasi mesin-mesin otomotif klasik. Baginya, ketelitian mekanik dan kesabaran menyeduh adalah cerminan dari bagaimana ia menjalani hidup: menghargai setiap proses, tidak tergesa-gesa, dan selalu mendahulukan komitmen nyata di atas janji lisan.',
      'Langkahnya yang terbiasa mandiri menemui makna barunya saat takdir mempertemukannya dengan Silvia. Di balik sikap tangguh sang pujaan hati, Wahyudi melihat jiwa jujur yang telah menempuh perjalanan teramat panjang. Pertemuan itu meneguhkan tujuannya: bukan sekadar berjalan beriringan, melainkan menjadi pelindung tempat segala kepenatan hidup pasangannya bisa diletakkan dengan tenang selamanya.',
    ],
    perspectiveTitle: 'Tentang Silvia di Mataku',
    perspectiveSubtitle: 'Sebuah Catatan Batin dari Wahyudi',
    perspectiveContent:
      'Pertama kali melihatnya, aku tahu ia bukan wanita yang mudah ditaklukkan oleh kerasnya dunia. Ada ketegasan seorang pejuang dalam tatapannya—jenis ketangguhan yang lahir dari seseorang yang telah membanting tulang sejak belia, jatuh bangun menjajal wirausaha, hingga menaklukkan dunia musik dengan kecerdasan dan karyanya sendiri.\n\nNamun di balik zirah keras dan senyum tegarnya, aku melihat seorang jiwa jujur yang telah menempuh perjalanan teramat jauh dan merindukan pelabuhan teduh. Bagiku, keberhasilannya berkarya adalah bukti kecemerlangan pikirannya, namun kelembutan hatinya saat bersamaku adalah anugerah terbesar yang ingin kujaga seumur hidupku. Aku hadir bukan untuk meremehkan masa lalunya yang penuh perjuangan; aku hadir agar ia tahu bahwa ia tak perlu lagi bertarung sendirian.',
  },
};

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

export default function BiografiPage() {
  const params = useParams();
  const slug = (params?.slug as 'silvia' | 'wahyudi') || 'silvia';
  const person = BIOGRAPHY_PROFILES[slug] || BIOGRAPHY_PROFILES.silvia;

  return (
    <div className="w-full min-h-screen flex justify-center bg-[#02050B] select-none relative font-sans antialiased">
      <main className="w-full max-w-md bg-gradient-to-b from-[#0B1528] via-[#070D19] to-[#03060E] relative border-x border-[#F59E0B]/30 shadow-[0_0_80px_rgba(0,0,0,0.95)] min-h-screen text-gray-200 pb-12">
        {/* HEADER DENGAN TEMA MIDNIGHT GOLD */}
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
          {/* SECTION 1: PROFIL UTAMA DENGAN BINGKAI EMAS DAN TEKS KONTRAS TINGGI */}
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
                Putra/i tercinta dari <br />
                <span className="text-[#FDE68A] font-bold">{person.parents}</span>
              </p>
            </div>

            {/* KARTU KECIL INFO (KELAHIRAN & KARYA) */}
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
                  Fokus &amp; Karya
                </span>
                <span className="text-[11px] font-serif text-white font-bold block pt-0.5 truncate">
                  {person.passionBadge}
                </span>
              </div>
            </div>

            {/* BOX KUTIPAN BIOGRAFI */}
            <div className="w-full p-3.5 rounded-xl bg-gradient-to-r from-[#0E1B33]/80 via-[#142647]/90 to-[#0E1B33]/80 border border-[#F59E0B]/50 text-center shadow-md">
              <p className="text-[11.5px] text-[#FDE68A] italic font-serif leading-relaxed drop-shadow-xs">
                &ldquo;{person.quote}&rdquo;
              </p>
            </div>
          </section>

          {/* SECTION 2: RIWAYAT DAN PERJALANAN (TEKS TERANG & TAJAM DI LATAR GELAP) */}
          <section className="rounded-[24px] bg-[#0B1528]/90 border border-[#F59E0B]/40 p-5.5 space-y-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.5)] backdrop-blur-md">
            <div className="flex items-center gap-2 border-b border-[#F59E0B]/30 pb-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
              <h2 className="text-xs font-mono tracking-[0.2em] text-[#FDE68A] uppercase font-bold">
                {person.storyTitle}
              </h2>
            </div>
            <div className="space-y-3.5 text-[12px] text-[#E2E8F0] font-sans leading-relaxed text-justify">
              {person.storyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </section>

          {/* SECTION 3: SUDUT PANDANG PASANGAN (PERSPECTIVE) */}
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
          <footer className="flex flex-col items-center gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#F59E0B] bg-[#111C33] text-xs text-white font-mono tracking-wider hover:bg-[#1A2E4E] active:scale-95 transition-all font-bold shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            >
              <svg className="w-3.5 h-3.5 fill-[#FDE68A]" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>{person.instagram}</span>
            </a>
            <Link
              href="/?opened=true"
              className="text-[11px] font-mono text-[#94A3B8] hover:text-[#FDE68A] underline tracking-wider pt-1 transition-colors"
            >
              Kembali ke Beranda Undangan
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}