import { RodinneDomyServiceDetail } from "@/src/components/sections/RodinneDomyServiceDetail";
import { RENOVATION_RATE_PER_M2, RENOVATION_OPTIONS } from '@/src/data/pricing';
import { getSEOTags } from "@/src/lib/seo";
import { generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema, DOMAIN } from '@/src/lib/schema';
import type { Metadata } from 'next';
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import {
    WHY_US,
    RENOVATION_SCOPE,
    RENOVATION_WORK_GROUPS,
    RENOVATION_STAGES,
    RENOVATION_EQUIPMENT,
    RENOVATION_FAQ,
} from "@/src/data/rodinne-domy-content";

const title = "Rekonštrukcia rodinného domu";
const description = "Zrekonštruujeme váš dom bez starostí. Realizujeme čiastočné aj kompletné rekonštrukcie rodinných domov.";

const seo = getSEOTags(
    title,
    description,
    '/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu'
);

export const metadata: Metadata = seo;

export default function RekonstrukciaDomuPage() {
    const jsonLd = [
        generateBreadcrumbSchema([
            { name: 'Domov', path: '/' },
            { name: 'Služby', path: '/sluzby' },
            { name: 'Rodinné domy', path: '/sluzby/rodinne-domy' },
            { name: 'Rekonštrukcia domu', path: '/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu' },
        ]),
        generateServiceSchema(title, description, `${DOMAIN}/sluzby/rodinne-domy/rekonstrukcia-rodinneho-domu`),
        generateFaqSchema(RENOVATION_FAQ),
    ];

    const faqSection = (
        <div className="max-w-[1500px] mx-auto px-6 mt-16 mb-10 space-y-8">
            <div className="space-y-4 text-center">
                <span className="text-xs font-mono tracking-widest text-amber-600 font-bold uppercase">Časté otázky</span>
                <h2 className="text-3xl font-display font-extrabold text-zinc-900">Otázky a odpovede o rekonštrukcii</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                {RENOVATION_FAQ.map((item) => (
                    <div key={item.q} className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
                        <h3 className="font-bold text-zinc-900">{item.q}</h3>
                        <p className="text-sm text-zinc-600 leading-relaxed">{item.a}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const whyUsSection = (
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 h-full flex flex-col justify-center">
            <div className="text-center space-y-2 mb-6">
                <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 mx-auto" />
                <h2 className="text-2xl font-display font-extrabold text-zinc-900">Prečo si vybrať nás?</h2>
                <p className="text-zinc-600 text-sm leading-relaxed max-w-md mx-auto">
                    Poznáme materiály používané v minulosti a vieme ich správne nakombinovať
                    s modernými technológiami. Zrekonštruujeme váš dom spoľahlivo a bez starostí.
                </p>
            </div>
            <ul className="text-zinc-700 text-sm font-medium leading-relaxed max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 w-full text-left">
                {WHY_US.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />
            <RodinneDomyServiceDetail
                title="Rekonštrukcia rodinného domu"
                breadcrumbTitle="Rekonštrukcia domu"
                subtitle1="Zrekonštruujte si svoj vysnívaný dom bez námahy."
                subtitle2="Projekt vám vypracujeme, dom vám zrekonštruujeme a s formalitami vám pomôžeme alebo ich rovno vybavíme za vás."
                fullDesc={`Špecializujeme sa na kvalitné rekonštrukcie starších domov a budov s dôrazom na precízne spracovanie a dlhú životnosť. Zvyšujeme životnú úroveň pôvodných domov prostredníctvom moderných technológií, energetických úspor a rešpektovania statiky pôvodnej budovy.\n\nČi už potrebujete komplexné statické spevnenie nosných stien, výmenu starých inštalácií, precízne zateplenie, alebo kompletnú premenu interiérových dispozícií na kľúč, postaráme sa o celý priebeh prác.`}
                imageUrl="/rodinne-domy/rekonstrukcia-rodinneho-domu.webp"
                features={[...RENOVATION_SCOPE]}
                workGroups={RENOVATION_WORK_GROUPS}
                stages={[...RENOVATION_STAGES]}
                equipment={[...RENOVATION_EQUIPMENT]}
                options={RENOVATION_OPTIONS}
                category="Rodinné domy"
                serviceSlug="rekonstrukcia-rodinneho-domu"
                ctaTitle="Plánujete rekonštrukciu staršieho rodinného domu?"
                ctaSubtitle="Nechajte nám na seba kontakt a posúdime stav vašej nehnuteľnosti a navrhneme optimálne riešenie."
                blogFilterCategory="Rekonštrukcia domu"
                customFaq={faqSection}
                whyChooseUs={whyUsSection}
                minSize={50}
                maxSize={300}
                stepSize={5}
                defaultSize={120}
                baseRate={RENOVATION_RATE_PER_M2}
            />
        </>
    );
}
