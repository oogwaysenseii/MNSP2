import Link from 'next/link';
import { Container } from '../ui/Container';
import { BUSINESS } from '@/src/lib/schema';

/**
 * Explicit stack rather than `font-mono`: --font-mono in globals.css resolves
 * through an undefined --font-jetbrains-mono, which makes the whole declaration
 * invalid at computed-value time, so `font-mono` silently renders as sans.
 */
const MONO = 'font-[family-name:ui-monospace,SFMono-Regular,Menlo,monospace]';

/** Popisok stĺpca — jantárová značka + monospace nadpis. */
function ColHead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className={`mb-6 ${MONO} text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-950`}>
      <span className="mr-[9px] inline-block h-0.5 w-[18px] align-middle bg-[#f68c05]" />
      {children}
    </h3>
  );
}

const LINK = 'inline-block py-1 transition-colors hover:text-[#b45309]';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white pt-[72px] text-sm text-zinc-600">
      <Container className="max-w-[1500px]">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2
          lg:grid-cols-[1.4fr_1fr_1.3fr_1.1fr] lg:gap-14">

          {/* 1 — značka */}
          <div>
            <p className="m-0 text-2xl font-black tracking-[0.03em] text-zinc-950">MNSP</p>
            <span className={`mt-2 block ${MONO} text-[9px] font-bold uppercase
              tracking-[0.24em] text-[#b45309]`}>
              Stavby a rekonštrukcie
            </span>
            <p className="mt-[18px] max-w-[30rem] leading-[1.7] text-zinc-500">
              Poskytujeme komplexné stavebné služby od návrhu až po realizáciu na kľúč,
              s dôrazom na kvalitu, inováciu a detail.
            </p>
          </div>

          {/* 2 — rýchle odkazy */}
          <div>
            <ColHead>Rýchle odkazy</ColHead>
            <ul>
              <li><Link href="/" className={LINK}>Domov</Link></li>
              <li><Link href="/sluzby" className={LINK}>Služby</Link></li>
              <li><Link href="/portfolio" className={LINK}>Portfólio</Link></li>
              <li><Link href="/blog" className={LINK}>Blog</Link></li>
              <li><Link href="/faq" className={LINK}>Časté otázky</Link></li>
              <li><Link href="/o-nas" className={LINK}>O nás</Link></li>
              <li><Link href="/kontakt" className={LINK}>Kontakt</Link></li>
            </ul>
          </div>

          {/* 3 — služby, obe úrovne rovnako veľké */}
          <div>
            <ColHead>Naše služby</ColHead>
            <div className="grid grid-cols-2 gap-x-6">
              <ul>
                <li><Link href="/sluzby/rodinne-domy" className={LINK}>Rodinné domy</Link></li>
                <li><Link href="/sluzby/komercna-vystavba" className={LINK}>Komerčná výstavba</Link></li>
                <li><Link href="/sluzby/rezidencne-budovy" className={LINK}>Rezidenčné budovy</Link></li>
                <li><Link href="/sluzby/priemyselne-objekty" className={LINK}>Priemyselné objekty</Link></li>
                <li><Link href="/sluzby/obcianske-stavby" className={LINK}>Občianske stavby</Link></li>
              </ul>
              <ul>
                <li><Link href="/sluzby/zakladanie-stavieb" className={LINK}>Zakladanie stavieb</Link></li>
                <li><Link href="/sluzby/monoliticke-konstrukcie" className={LINK}>Monolitické konštr.</Link></li>
                <li><Link href="/sluzby/murarske-prace" className={LINK}>Murárske práce</Link></li>
                <li><Link href="/sluzby/tesarske-prace" className={LINK}>Tesárske práce</Link></li>
                <li><Link href="/sluzby/omietky" className={LINK}>Omietky</Link></li>
              </ul>
            </div>
          </div>

          {/* 4 — kontakt a firemné údaje */}
          <div>
            <ColHead>Kontakt</ColHead>
            <ul>
              <li>
                <a href="mailto:info@mnsp.sk"
                   className="inline-block py-1 font-semibold text-zinc-950 transition-colors hover:text-[#b45309]">
                  info@mnsp.sk
                </a>
              </li>
              <li>
                <a href="tel:+421950699585"
                   className="inline-block py-1 font-semibold text-zinc-950 transition-colors hover:text-[#b45309]">
                  +421 950 699 585
                </a>
              </li>
            </ul>

            <address className="mt-[14px] not-italic leading-[1.8] text-zinc-500">
              Jozefa Kozáčeka 829/2<br />960 01 Zvolen<br />Slovensko
            </address>

            {/* Povinné podľa §3a Obchodného zákonníka — nikdy nezabaliť do podmienky. */}
            <p className={`mt-[18px] ${MONO} text-xs leading-[1.7] text-zinc-500`}>
              {BUSINESS.legalName}<br />
              IČO: {BUSINESS.ico} · DIČ: {BUSINESS.dic}
            </p>
          </div>
        </div>

        {/* spodná linka */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4
          border-t border-zinc-200 py-[26px] text-[13px] text-zinc-500 md:flex-row md:gap-0">
          <p className="m-0">&copy; {new Date().getFullYear()} {BUSINESS.legalName}</p>
          <div className="flex gap-6">
            <Link href="/ochrana-sukromia" className={LINK}>Ochrana súkromia</Link>
            <Link href="/obchodne-podmienky" className={LINK}>Obchodné podmienky</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
