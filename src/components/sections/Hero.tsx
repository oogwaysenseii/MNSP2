'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Award, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMuted, setIsMuted] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Background quotes/headlines that fade in/out on top of the timelapse
  const headlines = [
    {
      badge: 'Výstavba a rekonštrukcie rodinných domov',
      title: 'Rodinné domy',
      description: 'Postavte alebo zrekonštruujte si svoj vysnívaný dom bez námahy. Projekt vám vypracujeme, stavbu zrealizujeme a s formalitami vám pomôžeme albo ich rovno vybavíme za vás.'
    },
    {
      badge: 'Záruka dodržania termínov',
      title: 'Komplexná výstavba a obnova budov',
      description: 'Zabezpečujeme komplexnú výstavbu, rekonštrukcie a modernizácie budov. Či už sa púšťate do rezidenčného, obchodného alebo priemyselného projektu, máme schopnosti a skúsenosti aby sme zaistili úspech v každej fáze.'
    },
    {
      badge: 'Certifikát kvality ISO 9001',
      title: 'Staviame vaše sny na pevných základoch',
      description: 'Od rodinných domov až po rozsiahle stavebné realizácie. Prinášame skúsenosti, profesionálny prístup a zodpovedné vedenie projektov v každej fáze výstavby..'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % headlines.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [headlines.length]);

  return (
    <div id="hero" className="relative w-full h-[750px] overflow-hidden bg-zinc-950 text-white ">
      {/* 1. TIMELAPSE VIDEO BACKGROUND */}
      <div className=" absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-65 transition-opacity duration-1000"
          src="vystavba-a-rekonstrukcie-budov.mp4"
        />
        {/* Subtle high-end radial lighting overlay */}
        <div className=" absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/80" />
        <div className="absolute inset-0 bg-zinc-950/20 backdrop-brightness-[0.85]" />
      </div>

      {/* 2. MAIN CONTENT GRID (SXS DESIGN) */}
      <div className="max-w-[1500px] relative z-10 w-full  mx-auto px-10 flex flex-col justify-end  pt-32">
        
        {/* TOP COMPACT METRICS */}
        <div className="hidden lg:grid grid-cols-3 gap-6 max-w-3xl pb-10 mb-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 border border-white/15"
          >
            <div className="p-2 bg-amber-500 text-zinc-950">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-300 font-medium">{'Garancia kvality'}</p>
              <p className="text-sm font-semibold text-white">{'Kvalitné služby'}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 border border-white/15"
          >
            <div className="p-2 bg-amber-500 text-zinc-950">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-300 font-medium">{'Odbornosť'}</p>
              <p className="text-sm font-semibold text-white">{'Spoľahlivý presonál'}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 border border-white/15"
          >
            <div className="p-2 bg-amber-500 text-zinc-950">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-300 font-medium">{'Poradenstvo'}</p>
              <p className="text-sm font-semibold text-white">{'Zákaznícka podpora'}</p>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM HEADLINE SLIDER & FORM CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
          {/* FADING HEADLINES */}
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-sm sm:text-base text-amber-400 font-mono tracking-widest font-bold uppercase">
              Stavebná firma | Výstavba a rekonštrukcie budov
            </h1>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <span className=" inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/90 text-zinc-950 text-xs font-mono font-bold tracking-wider">
                  {headlines[currentSlideIndex].badge}
                </span>
                <p className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                  {headlines[currentSlideIndex].title}
                </p>
                <p className="text-zinc-300 text-sm sm:text-base max-w-xl font-sans tracking-wide leading-relaxed">
                  {headlines[currentSlideIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                id="hero-cta-contact"
                href="/kontakt"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 text-zinc-950 text-sm font-semibold hover:bg-amber-400 transition-all shadow-lg hover:shadow-amber-500/15 cursor-pointer"
              >
                {'Nezáväzne dopytovať cenu'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                id="hero-cta-portfolio"
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/25 transition-all cursor-pointer"
              >
                {'Zobraziť naše referencie'}
              </Link>
            </div>
          </div>

          {/* TIMELAPSE PAUSE CONTROLLER */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="flex items-center gap-4 bg-zinc-900/80 backdrop-blur-sm px-4 py-2 border border-zinc-850">
              <button
                onClick={() => {
                  const videoElement = document.querySelector('video');
                  if (videoElement) {
                    if (isPlaying) {
                      videoElement.pause();
                    } else {
                      videoElement.play();
                    }
                    setIsPlaying(!isPlaying);
                  }
                }}
                className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
                title={isPlaying ? "Pause Real Timelapse" : "Play Real Timelapse"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* 3. TRANSITIONAL BASE SLOPE */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}
