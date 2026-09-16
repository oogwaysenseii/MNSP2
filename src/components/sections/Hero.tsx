'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Award, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

/** image je povinný — slajd bez neho nechá v hero prázdnu dieru 391 x 463 px. */
type Slide = {
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Background quotes/headlines that fade in/out on top of the timelapse
  const headlines: Slide[] = [
    {
      badge: 'Výstavba a rekonštrukcie rodinných domov',
      title: 'Rodinné domy',
      description: 'Postavte alebo zrekonštruujte si svoj vysnívaný dom bez námahy. Projekt vám vypracujeme, stavbu zrealizujeme a s formalitami vám pomôžeme alebo ich rovno vybavíme za vás.',
      image: '/rodinne-domy-hero.webp',
      imageAlt: 'Vizualizácia rodinného domu na kľúč',
    },
    {
      badge: 'Termíny dohodnuté v zmluve',
      title: 'Komplexná výstavba a obnova budov',
      description: 'Zabezpečujeme komplexnú výstavbu, rekonštrukcie a modernizácie budov. Či už sa púšťate do rezidenčného, obchodného alebo priemyselného projektu, máme schopnosti a skúsenosti aby sme zaistili úspech v každej fáze.',
      image: '/stavby.webp',
      imageAlt: 'Zariadenie sociálnych služieb Detva',
    },
    {
      badge: 'Od projektu po kolaudáciu',
      title: 'Staviame vaše sny na pevných základoch',
      description: 'Od rodinných domov až po rozsiahle stavebné realizácie. Prinášame skúsenosti, profesionálny prístup a zodpovedné vedenie projektov v každej fáze výstavby.',
      image: '/2.webp',
      imageAlt: 'Hrubá stavba Dúbravy',
    }
  ];

  /**
   * currentSlideIndex is in the deps on purpose: every change — auto or from
   * the arrows — tears the timer down and starts a fresh 7s. Without it a
   * click could be followed by an auto-advance a moment later.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % headlines.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [headlines.length, currentSlideIndex]);

  const goToSlide = (step: number) =>
    setCurrentSlideIndex((prev) => (prev + step + headlines.length) % headlines.length);

  /*
   * The video is attached only after the page has finished loading.
   *
   * `preload="none"` does not work here: `autoPlay` overrides it, so the
   * browser fetches the file during page load anyway and it competes with the
   * CSS, JS and poster for bandwidth. Leaving `src` off until the load event
   * is the only reliable way to keep it off the critical path.
   *
   * The poster paints immediately and carries LCP; the video starts a moment
   * later. Visitors who never scroll past the fold on a slow connection still
   * see the hero straight away.
   */
  useEffect(() => {
    const attach = () => {
      const el = videoRef.current;
      if (!el || el.src) return;
      el.src = '/vystavba-a-rekonstrukcie-budov.mp4';
      el.load();
    };

    if (document.readyState === 'complete') {
      const id = window.setTimeout(attach, 200);
      return () => window.clearTimeout(id);
    }

    window.addEventListener('load', attach, { once: true });
    return () => window.removeEventListener('load', attach);
  }, []);

  return (
    <div id="hero" className="relative w-full lg:min-h-[750px] overflow-hidden bg-zinc-950 text-white">
      {/* 1. TIMELAPSE VIDEO BACKGROUND */}
      <div className=" absolute inset-0 z-0">
        {/*
          preload="none" so the video doesn't compete with CSS, JS and the
          poster for bandwidth during first paint. On a throttled connection the
          1.3 MB file was dominating LCP; now the poster paints first and the
          video fades in behind it a moment later.

          The poster is preloaded with a link tag rather than a second visual
          layer. A `poster` attribute alone is discovered late and fetched at
          low priority, which makes it a weak LCP candidate — but rendering an
          <Image> behind the video meant two stacked layers at opacity-65, so
          the still showed through the playing video as a ghost.

          React hoists this link into <head>, so the poster is requested at
          high priority without adding anything to the DOM.
        */}
        <link
          rel="preload"
          as="image"
          href="/hero-poster.webp"
          fetchPriority="high"
        />

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/hero-poster.webp"
          aria-hidden="true"
          className="w-full h-full object-cover opacity-65 transition-opacity duration-1000"
        />

        {/* Subtle high-end radial lighting overlay */}
        <div className=" absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/80" />
        <div className="absolute inset-0 bg-zinc-950/20 backdrop-brightness-[0.85]" />
      </div>

      {/* 2. MAIN CONTENT GRID (SXS DESIGN) */}
      <div className="max-w-[1500px] relative z-10 w-full  mx-auto px-4 sm:px-8 flex flex-col justify-end pt-24 pb-24 lg:pt-32 lg:pb-0">
        
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
              <p className="text-sm font-semibold text-white">{'Spoľahlivý personál'}</p>
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
        {/* lg:min-h-[423px] = výška 2-riadkového slajdu. Bez nej rad meria
            max(text, panel): 419 px na slajde 01 a 423 px na 02/03, takže sa
            celý rad (a s ním horná hrana panela aj tlačidlá) posúval o 4 px
            pri každom prepnutí. Panel ostáva 419 px podľa kroku 01. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full lg:min-h-[423px]">
          {/* FADING HEADLINES */}
          {/* lg:self-stretch premôže items-end na rade: stĺpec má vždy výšku
              radu, takže text začína na tom istom riadku pri každom slajde.
              Bez toho sedí kratší slajd 01 o 75 px nižšie než 02 a 03. */}
          <div className="lg:col-span-8 space-y-6 lg:flex lg:flex-col lg:self-stretch">
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
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                  {headlines[currentSlideIndex].title}
                </h2>
                <p className="text-zinc-300 text-sm sm:text-base max-w-xl font-sans tracking-wide leading-relaxed">
                  {headlines[currentSlideIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            {/* mt-auto drží tlačidlá na spodnej hrane radu, aby ostali
                zarovnané s panelom aj so šípkami. Voľné miesto na slajde 01
                sa tak zbiera nad nimi, nie pod textom. */}
            <div className="flex flex-wrap gap-4 mt-10 lg:mt-auto">
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

          {/* OBRÁZOK SLAJDU + OVLÁDAČ VIDEA */}
          {/* Skrytý do 1023 px vrátane — panel sa ukáže až v dvojstĺpcovom
              rozložení od lg (1024 px). Pod tým zaberal pás 2:1 miesto nad
              textom a hero bol zbytočne dlhý. */}
          <div className="hidden lg:block lg:col-span-4 order-first lg:order-none">
            {/* posun doľava len na desktope — translate, nie margin, aby sa
                mriežka nepočítala nanovo. Na mobile je panel na celú šírku,
                tam by posun spôsobil vodorovné rolovanie. */}
            <div className="relative w-full aspect-[2/1] lg:h-[419px] overflow-hidden
              lg:-translate-x-[30px]">

              {/* vrstva 1 — prelína sa */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentSlideIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  {/* 391px stačí: pri paneli 419 px vysokom je najväčší cover
                      nárok 419 x 1.5 = 629 px a 391px siahne po 640w kandidátovi.
                      Pri pôvodných 463 px to bolo 695 px a 640w by nestačilo. */}
                  <Image
                    src={headlines[currentSlideIndex].image}
                    alt={headlines[currentSlideIndex].imageAlt}
                    fill
                    sizes="(min-width: 1024px) 391px, 100vw"
                    quality={90}
                    priority={currentSlideIndex === 0}
                    className="object-contain"
                  />

                  {/* tienenie zdola — aby ovládač videa držal kontrast aj na svetlej fotke */}
                  <span className="absolute inset-0
                    bg-[linear-gradient(to_top,rgba(9,9,11,0.6),transparent_45%)]" />
                </motion.div>
              </AnimatePresence>

              {/* šípky stoja mimo motion.div — inak by pri každom prepnutí slajdu bliknuli */}
              <div className="absolute right-3 bottom-0 z-10 flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm px-2 py-2 border border-zinc-800">
                <button
                  type="button"
                  onClick={() => goToSlide(-1)}
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
                  title="Predchádzajúci slajd"
                  aria-label="Predchádzajúci slajd"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => goToSlide(1)}
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
                  title="Nasledujúci slajd"
                  aria-label="Nasledujúci slajd"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TRANSITIONAL BASE SLOPE */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}
