import { notFound, redirect } from 'next/navigation';
import { getServiceBySlug, SERVICES } from '@/src/data/services';
import { SERVICE_DETAILS, type ServiceDetail } from '@/src/data/service-details';
import { getSEOTags } from '@/src/lib/seo';
import { Metadata } from 'next';
import { SubServiceDetail } from '@/src/components/sections/SubServiceDetail';
import { REDIRECTED, componentKeyFor } from '@/src/data/service-component-keys';
import { projectsForService } from '@/src/data/projects';
import { HardHat, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
  DOMAIN,
} from '@/src/lib/schema';

interface PageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return SERVICES.filter((s) => !(REDIRECTED as readonly string[]).includes(s.slug)).map((service) => ({
    service: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  // The root layout appends " | MNSP | Stavby a rekonštrukcie" (~30 chars).
  return getSEOTags(service.name, service.description, `/sluzby/${serviceSlug}`);
}

function fallbackDetail(name: string, description: string): ServiceDetail {
  return {
    longDescription: `${description}\n\nSpoliehame sa na odborné skúsenosti a overené stavebné postupy.`,
    partnerText: `${name} realizujeme pre súkromných investorov, firmy aj stavebné spoločnosti v Banskobystrickom kraji a okolí. Dôraz kladieme na kvalitné materiály, presné prevedenie a dodržiavanie technologických postupov.`,
    features: [
      'Dôkladná príprava a obhliadka staveniska',
      'Zabezpečenie potrebného materiálu a techniky',
      'Odborná realizácia podľa platných technických noriem',
      'Priebežná kontrola kvality a stavebný dozor',
      'Odovzdanie kompletne ukončených prác bez nedostatkov',
    ],
    materials: [
      'Overené a certifikované materiály',
      'Certifikované izolácie a zmesi',
      'Materiály s vyhlásením o parametroch',
    ],
    equipment: [
      'Vlastná stavebná mechanizácia',
      'Nivelačné a zameriavacie systémy',
      'Profesionálne elektrické a akumulátorové náradie',
    ],
  };
}

function buildFaq(name: string) {
  const lower = name.toLowerCase();
  return [
    {
      q: `Aká je cena za ${lower}?`,
      a: 'Každý projekt oceňujeme individuálne — cena závisí od rozsahu, náročnosti prístupu a použitého materiálu. Orientačný odhad si viete spraviť v kalkulátore vyššie, záväznú ponuku vypracujeme po obhliadke a s položkovým rozpisom.',
    },
    {
      q: 'Akú záruku na dielo poskytujete?',
      a: 'Záruka je vždy uvedená v zmluve o dielo a jej rozsah zodpovedá typu prác. Minimálne však vždy v rozsahu, ktorý stanovujú právne predpisy Slovenskej republiky.',
    },
    {
      q: `Robíte ${lower} aj ako samostatnú zákazku?`,
      a: 'Áno. Nemusí ísť o súčasť väčšej stavby — túto prácu vieme zrealizovať aj samostatne, či už pri novostavbe alebo pri rekonštrukcii existujúceho objektu.',
    },
    {
      q: 'Ako rýchlo viete začať?',
      a: 'Závisí to od aktuálnej vyťaženosti a rozsahu prác. Po obhliadke vám povieme konkrétny najbližší možný termín — a ak ho nedokážeme dodržať, povieme to hneď, nie až v priebehu stavby.',
    },
    {
      q: 'V akej oblasti pôsobíte?',
      a: 'Pôsobíme vo Zvolene, Banskej Bystrici, Detve, Hriňovej a v širšom okolí Banskobystrického kraja. Pri väčších zákazkách sme ochotní vycestovať aj mimo tento región.',
    },
    {
      q: 'Zabezpečujete odvoz a likvidáciu odpadu?',
      a: 'Áno, súčasťou ponuky môže byť aj nakladanie so stavebným odpadom — od pristavenia kontajnera cez triedenie až po legálnu likvidáciu na skládke.',
    },
  ];
}

export default async function GenericServicePage({ params }: PageProps) {
  const { service: serviceSlug } = await params;

  if ((REDIRECTED as readonly string[]).includes(serviceSlug)) {
    redirect('/sluzby/rodinne-domy');
  }

  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const serviceIdForComponent = componentKeyFor(serviceSlug);
  const extra = SERVICE_DETAILS[serviceSlug] ?? fallbackDetail(service.name, service.description);
  const faq = buildFaq(service.name);

  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Domov', path: '/' },
      { name: 'Služby', path: '/sluzby' },
      { name: service.name, path: `/sluzby/${service.slug}` },
    ]),
    generateServiceSchema(service.name, extra.longDescription, `${DOMAIN}/sluzby/${service.slug}`),
    generateFaqSchema(faq),
  ];

  const GenericSpecificTop = (
    <div className="mt-8 border border-zinc-200 overflow-hidden shadow-sm">
      <div className="bg-zinc-950 px-6 py-4 flex items-center gap-3">
        <HardHat className="w-5 h-5 text-amber-500" />
        <h3 className="text-white font-display font-medium text-lg">Naša odbornosť</h3>
      </div>
      <div className="bg-zinc-50 p-6 sm:p-8 space-y-6">
        <p className="text-zinc-700 leading-relaxed text-sm sm:text-base">{extra.partnerText}</p>

        <div className="pt-4 border-t border-zinc-200/60">
          <strong className="text-sm text-zinc-900 block mb-2">Na čo sa môžete spoľahnúť:</strong>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Overené technologické postupy',
              'Skúsený a kvalifikovaný personál',
              'Vlastné strojové vybavenie',
              'Termíny dohodnuté v zmluve',
            ].map((feat) => (
              <li
                key={feat}
                className="flex items-center gap-2 text-xs bg-white p-3 border border-zinc-200 shadow-sm text-zinc-700 font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                {feat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const GenericFaq = (
    <div className="max-w-[1500px] mx-auto px-6  mb-10 space-y-8">
      <div className="space-y-4 text-center">
        <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase">
          Časté otázky
        </span>
        <h2 className="text-3xl font-display font-extrabold text-zinc-900">
          Otázky a odpovede — {service.name.toLowerCase()}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {faq.map((item) => (
          <div key={item.q} className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
            <h3 className="font-bold text-zinc-900">{item.q}</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Projects that tagged this trade in `realizedServices`. Renders nothing
  // until a project is tagged, so an untagged service page is unchanged
  // rather than showing an empty section.
  const realizedOn = projectsForService(service.slug);

  const RealizedProjects = realizedOn.length > 0 && (
    <div className="max-w-[1500px] mx-auto px-6 mt-16">
      <div className="border border-zinc-200 overflow-hidden shadow-sm">
        <div className="bg-zinc-950 px-6 py-4">
          <h2 className="text-white font-display font-medium text-lg">
            Kde sme {service.name.toLowerCase()} realizovali
          </h2>
        </div>
        <div className="bg-zinc-50 p-6 sm:p-8">
          <p className="text-sm text-zinc-500 mb-6">
            Referencie z našich vlastných realizácií — nie ilustračné fotografie.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {realizedOn.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/portfolio/${project.id}`}
                  className="group flex gap-3 bg-white border border-zinc-200 hover:border-amber-500 transition-colors h-full"
                >
                  <span className="relative w-24 shrink-0 overflow-hidden bg-zinc-100">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </span>
                  <span className="py-3 pr-3 min-w-0">
                    <span className="block text-sm text-zinc-900 font-medium leading-snug group-hover:text-amber-700 transition-colors">
                      {project.title}
                    </span>
                    <span className="block text-[11px] text-zinc-500 mt-1">
                      {project.location} · {project.year}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubServiceDetail
        serviceId={serviceIdForComponent}
        serviceSlug={service.slug}
        title={service.name}
        description={extra.longDescription}
        features={extra.features}
        materials={extra.materials}
        equipment={extra.equipment}
        customLocationTop={GenericSpecificTop}
      />
      {RealizedProjects}
      {GenericFaq}
    </>
  );
}
