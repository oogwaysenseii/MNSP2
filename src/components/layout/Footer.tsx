import Link from 'next/link';
import { Container } from '../ui/Container';
import { BUSINESS } from '@/src/lib/schema';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 py-16 text-sm text-gray-500 mt-12 bg-white">
      <Container className="max-w-[1500px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_0.5fr_1.5fr_1fr] gap-10 lg:gap-16">
          {/* Column 1: Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-black tracking-tight mb-6">MNSP | Stavby a rekonštrukcie</h3>
            <p className="leading-relaxed">
              Poskytujeme komplexné stavebné služby od návrhu až po realizáciu na kľúč, s dôrazom na kvalitu, inováciu a detail.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="text-[14px] font-mono tracking-widest text-black font-bold uppercase mb-6">Rýchle odkazy</h3>
            <ul className="space-y-1.5">
              <li><Link href="/" className="inline-block py-1 hover:text-amber-600 transition-colors">Domov</Link></li>
              <li><Link href="/sluzby" className="inline-block py-1 hover:text-amber-600 transition-colors">Služby</Link></li>
              <li><Link href="/portfolio" className="inline-block py-1 hover:text-amber-600 transition-colors">Portfólio</Link></li>
              <li><Link href="/blog" className="inline-block py-1 hover:text-amber-600 transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="inline-block py-1 hover:text-amber-600 transition-colors">Časté otázky (FAQ)</Link></li>
              <li><Link href="/o-nas" className="inline-block py-1 hover:text-amber-600 transition-colors">O nás</Link></li>
              <li><Link href="/kontakt" className="inline-block py-1 hover:text-amber-600 transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-[14px] font-mono tracking-widest text-black font-bold uppercase mb-6">Naše služby</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <ul className="space-y-1 ">
                <li><Link href="/sluzby/rodinne-domy" className="inline-block py-1 hover:text-amber-600 transition-colors">Rodinné domy</Link></li>
                <li><Link href="/sluzby/komercna-vystavba" className="inline-block py-1 hover:text-amber-600 transition-colors">Komerčná výstavba</Link></li>
                <li><Link href="/sluzby/rezidencne-budovy" className="inline-block py-1 hover:text-amber-600 transition-colors">Rezidenčné budovy</Link></li>
                <li><Link href="/sluzby/priemyselne-objekty" className="inline-block py-1 hover:text-amber-600 transition-colors">Priemyselné objekty</Link></li>
                <li><Link href="/sluzby/obcianske-stavby" className="inline-block py-1 hover:text-amber-600 transition-colors">Občianske stavby</Link></li>

              </ul>
              <ul className="space-y-2 text-[10px]">
                <li><Link href="/sluzby/zakladanie-stavieb" className="inline-block py-1 hover:text-amber-600 transition-colors">Zakladanie stavieb</Link></li>
                <li><Link href="/sluzby/monoliticke-konstrukcie" className="inline-block py-1 hover:text-amber-600 transition-colors">Monolitické konštr.</Link></li>
                <li><Link href="/sluzby/murarske-prace" className="inline-block py-1 hover:text-amber-600 transition-colors">Murárske práce</Link></li>
                <li><Link href="/sluzby/tesarske-prace" className="inline-block py-1 hover:text-amber-600 transition-colors">Tesárske práce</Link></li>
                <li><Link href="/sluzby/omietky" className="inline-block py-1 hover:text-amber-600 transition-colors">Omietky</Link></li>
                <li><Link href="/sluzby/potery" className="inline-block py-1 hover:text-amber-600 transition-colors">Potery</Link></li>
                <li><Link href="/sluzby/obkladacske-prace" className="inline-block py-1 hover:text-amber-600 transition-colors">Obkladačské práce</Link></li>
                <li><Link href="/sluzby/fasady" className="inline-block py-1 hover:text-amber-600 transition-colors">Fasády</Link></li>
                <li><Link href="/sluzby/jadrove-vrtanie" className="inline-block py-1 hover:text-amber-600 transition-colors">Jadrové vŕtanie</Link></li>
                <li><Link href="/sluzby/rezanie-otvorov" className="inline-block py-1 hover:text-amber-600 transition-colors">Rezanie otvorov</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-[14px] font-mono tracking-widest text-black font-bold uppercase mb-6">Kontakt</h3>
            <ul className="space-y-1.5">
              <li>
                <a href="mailto:info@mnsp.sk" className="inline-block py-1 hover:text-amber-600 transition-colors">info@mnsp.sk</a>
              </li>
              <li>
                <a href="tel:+421950699585" className="inline-block py-1 hover:text-amber-600 transition-colors">+421 950 699 585</a>
              </li>
              <li className="pt-2">
                Jozefa Kozáčeka 829/2<br />
                960 01 Zvolen<br />
                Slovensko
              </li>
              {/* TODO: fill BUSINESS.ico / BUSINESS.dic in src/lib/schema.ts.
                  Required on the website by §3a Obchodného zákonníka. */}
              {BUSINESS.ico && (
                <li className="pt-2 text-xs text-gray-400">
                  {BUSINESS.legalName}<br />
                  IČO: {BUSINESS.ico}{BUSINESS.dic ? ` · DIČ: ${BUSINESS.dic}` : ''}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p>&copy; {new Date().getFullYear()} MNSP | Stavby a rekonštrukcie</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/ochrana-sukromia" className="inline-block py-1 hover:text-amber-600 transition-colors">Ochrana súkromia</Link>
            <Link href="/obchodne-podmienky" className="inline-block py-1 hover:text-amber-600 transition-colors">Obchodné podmienky</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
