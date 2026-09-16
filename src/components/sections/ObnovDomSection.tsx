import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { OBNOV_DOM, OBNOV_DOM_OURS, OBNOV_DOM_OTHERS } from '@/src/data/obnov-dom';

/**
 * Explicitný stack namiesto `font-mono`: --font-mono v globals.css vedie cez
 * nedefinované --font-jetbrains-mono, takže je celá deklarácia neplatná
 * a `font-mono` sa potichu vykreslí bezpätkovo. To isté rieši ServicesGrid.
 */
const MONO = 'font-[family-name:ui-monospace,SFMono-Regular,Menlo,monospace]';
const eur = (n: number) => new Intl.NumberFormat('sk-SK').format(n);

export function ObnovDomSection() {
  const { callOpen, status, verifiedOn, maxGrant,
          incomeLimit, incomeYear, completeBy, sourceUrl, diagram } = OBNOV_DOM;

  return (
    <section className="mt-5 border-y border-zinc-200 bg-zinc-100">
      <Hazard />

      {/* NIE <Container> — má max-w-7xl a iné odsadenie, sekcia by sa
          nezarovnala s dvojstĺpcom nad ňou. */}
      <div className="mx-auto max-w-[1500px] px-6 pt-[30px] pb-8">
        {/* Dva stĺpce len keď je schéma. Bez nej by pravý stĺpec ostal prázdny
            a ľavý by sa zbytočne zúžil na 44 %. */}
        <div className={`grid items-start gap-[26px] ${
          diagram ? 'lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]' : ''}`}>

          {/* ---------- ľavý stĺpec ---------- */}
          <div>
            <span className={`mb-[9px] block ${MONO} text-[10px] font-bold uppercase
              tracking-[0.2em] text-[#b45309]`}>
              Obnov dom · Plán obnovy SR
            </span>

            <h2 className="text-[23px] font-extrabold leading-[1.2]
              tracking-[-0.02em] text-zinc-950">
              Príspevok na obnovu rodinného domu
            </h2>

            <p className="mt-2.5 text-[14px] leading-[1.62] text-zinc-700">
              Časť prác, ktoré na dome robíme — zateplenie, výmena okien a dverí, strecha
              so zateplením — patrí medzi opatrenia podporované z programu Obnov dom.
              Samotnú obnovu realizujeme my a pripravíme podklady k žiadosti.
            </p>

            {/* stavový riadok */}
            <div className="mt-3.5 flex gap-3 border border-amber-300 border-l-[3px]
              border-l-amber-500 bg-amber-50 px-3 py-2.5">
              <span className={`flex-none ${MONO} text-[9px] font-bold uppercase
                leading-[1.4] tracking-[0.13em] text-[#92400e]`}>
                Stav k<br />{verifiedOn}
              </span>
              <span className="text-[12.5px] leading-[1.5] text-[#78350f]">{status}</span>
            </div>

            {/* tri údaje ako riadky štítok → hodnota */}
            <div className="mt-3.5 border-t-2 border-zinc-950">
              <Fact label="Výška príspevku">
                {maxGrant ? `až ${eur(maxGrant)} €` : 'Podľa aktuálnej výzvy'}
              </Fact>
              <Fact label="Pre koho">
                Príjem do {eur(incomeLimit)} € na člena<br />domácnosti za rok {incomeYear}
              </Fact>
              <Fact label="Dokedy">Práce dokončené do {completeBy}</Fact>
            </div>

            <p className="mt-2.5 text-[11.5px] leading-[1.55] text-zinc-500">
              Bez overovania príjmu: domácnosti dôchodcov, domácnosti v hmotnej núdzi
              a rodiny so štyrmi a viac maloletými deťmi. Termín platí pre celú obnovu,
              nielen pre podanie žiadosti.
            </p>

            {/* Zoznam opatrení — vždy v DOM, nikdy podmienené vykreslenie:
                bez neho by sekcia bola pre čítačku obrazovky a pre vyhľadávač
                len obrázok bez obsahu. Skrýva sa až od md, a to len vtedy,
                keď schéma existuje a prevezme jeho úlohu. */}
            <div className={`${diagram ? 'md:hidden ' : ''}mt-3.5 border-t border-zinc-300 pt-3`}>
              <span className={`mb-2.5 block ${MONO} text-[9px] font-bold uppercase
                tracking-[0.15em] text-[#b45309]`}>
                Podporované opatrenia, ktoré realizujeme
              </span>
              <ul>
                {OBNOV_DOM_OURS.map((m) => (
                  <li key={m.name} className="relative mb-2 pl-[18px] text-[12.5px] leading-[1.5] text-zinc-700 before:absolute before:left-0 before:top-2 before:h-0.5 before:w-2 before:bg-[#b45309] before:content-['']">
                    {m.name}
                    <span className="mt-px block text-[11.5px] text-zinc-500">{m.req}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-[11.5px] leading-[1.5] text-zinc-500">
                Ďalej sú podporované: {OBNOV_DOM_OTHERS.join(', ').toLowerCase()}. Tieto
                zabezpečuje iný dodávateľ — ak ich chcete, vieme vám ho odporučiť.
              </p>
            </div>

            {/* odopretie + odkaz na správcu */}
            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3.5">
              <p className="m-0 max-w-[44ch] text-[11.5px] leading-[1.5] text-zinc-600">
                Program spravuje Slovenská agentúra životného prostredia. Nie sme
                sprostredkovateľom príspevku a o jeho pridelení nerozhodujeme.
              </p>
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex flex-none items-center gap-2 px-3.5 py-[11px]
                  text-[10.5px] font-bold uppercase tracking-[0.11em] transition-colors
                  ${callOpen
                    ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400'
                    : 'bg-zinc-950 text-white hover:bg-zinc-800'}`}
              >
                {callOpen ? 'Podať žiadosť na obnovdom.sk' : 'Podmienky programu'}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ---------- pravý stĺpec: schéma, len od md nahor ---------- */}
          {diagram && (
            <figure className="hidden md:block m-0 border border-zinc-300 bg-white">
              <figcaption className="flex flex-wrap items-center justify-between gap-3
                border-b border-zinc-200 bg-zinc-50 px-3 py-[9px]">
                <span className={`${MONO} text-[9px] font-bold uppercase
                  tracking-[0.14em] text-[#b45309]`}>
                  Oficiálna schéma programu
                </span>
                <span className="text-[11px] leading-[1.4] text-zinc-500">
                  Zdroj: Obnov dom / SAŽP
                </span>
              </figcaption>

              <div className="p-2.5">
                {/* sizes je 780px, nie 640px z návrhu 38: pri strope kontajnera
                    1500 px sa figúra vykresľuje na 779 px, takže 640px by
                    siahlo po 640w kandidátovi = 0,82x — schéma s drobným
                    textom by sa na širokých displejoch zväčšovala. */}
                <Image
                  src={diagram.src}
                  alt="Schéma rodinného domu s vyznačenými podporovanými opatreniami: zateplenie obvodového plášťa min. 150 mm, strešného plášťa min. 250 mm pri plochej a 200 mm pri šikmej streche, podlahy podkrovia min. 260 mm, stropu nevykurovaného suterénu min. 80 mm, výmena okien a dverí za izolačné trojsklo, výmena strešnej krytiny pri súčasnom zateplení stropnej konštrukcie, solárne kolektory, tepelné čerpadlo, kotol na pelety alebo splyňovací kotol, systém merania a regulácie vykurovania."
                  width={diagram.width}
                  height={diagram.height}
                  sizes="(min-width: 1024px) 780px, 100vw"
                  quality={90}
                  className="h-auto w-full"
                />
              </div>

              <a
                href={diagram.src}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-[7px] border-t border-zinc-200
                  bg-zinc-50 py-[9px] ${MONO} text-[10px] font-bold uppercase
                  tracking-[0.13em] text-[#b45309] hover:bg-zinc-100`}
              >
                Zobraziť schému v plnej veľkosti
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </figure>
          )}

        </div>
      </div>

      <Hazard />
    </section>
  );
}

/* ---------- lokálne pomocné kúsky ---------- */

function Hazard() {
  return (
    <span className="block h-[5px]
      bg-[repeating-linear-gradient(-45deg,#f59e0b_0_10px,transparent_10px_20px)]" />
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-zinc-300
      py-[9px] last:border-b-0">
      <span className={`w-[106px] flex-none pt-0.5 ${MONO} text-[9px] font-bold
        uppercase tracking-[0.15em] text-[#b45309]`}>{label}</span>
      <span className="text-right text-[13.5px] font-extrabold leading-[1.35]
        tracking-[-0.015em] text-zinc-950">{children}</span>
    </div>
  );
}
