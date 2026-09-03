'use client';

export default function WelcomeQuote() {
  return (
    <section className="w-full px-6 py-12 text-center space-y-4 animate-in fade-in duration-1000">
      <div className="inline-block px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-950/30">
        <span className="text-[9px] font-mono tracking-[0.25em] text-cyan-200 uppercase">
          Salam &amp; Doa
        </span>
      </div>

      <p className="text-amber-200 font-serif text-lg tracking-wider pt-2">
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
      </p>

      <p className="text-gray-300 text-xs italic leading-relaxed px-2 font-light">
        &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan
        untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia
        menjadikan di antaramu rasa kasih dan sayang.&rdquo;
      </p>

      <p className="text-[10px] text-amber-300/80 font-mono tracking-widest uppercase">
        QS. Ar-Rum : 21
      </p>

      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mx-auto pt-4" />
    </section>
  );
}