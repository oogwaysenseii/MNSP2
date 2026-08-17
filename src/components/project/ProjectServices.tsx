import Link from 'next/link';
import { Project } from '@/src/data/projects';
import { getServiceBySlug } from '@/src/data/services';
import { Container } from '@/src/components/ui/Container';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

/**
 * Scope of work actually carried out on this project.
 *
 * Two lists, deliberately distinguished:
 *  - `realizedServices` are trades with their own page, so they link. They are
 *    also what places this project on /sluzby/[service], which means the chip
 *    a visitor sees here and the proof shown on the service page can never
 *    disagree — both read the same array.
 *  - `additionalScope` is real work with no page behind it (utilities,
 *    landscaping, main-contractor role). Shown, but not linked, rather than
 *    inventing a destination for it.
 */
export function ProjectServices({ project }: { project: Project }) {
  const realized = (project.realizedServices ?? []).flatMap((slug) => {
    const service = getServiceBySlug(slug);
    return service ? [{ slug, service }] : [];
  });
  const extra = project.additionalScope ?? [];

  if (realized.length === 0 && extra.length === 0) return null;

  return (
    <section className="py-16 bg-white border-t border-zinc-100">
      <Container className="max-w-[1500px]">
        <div className="mx-auto text-center">
          <h2 className="text-2xl font-display font-bold text-zinc-900 mb-2">
            Rozsah realizovaných prác
          </h2>
          <p className="text-sm text-zinc-500 mb-8 max-w-xl mx-auto">
            Práce, ktoré sme na tomto projekte realizovali vlastnými tímami.
          </p>

          {realized.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {realized.map(({ slug, service }) => (
                <Link
                  key={slug}
                  href={`/sluzby/${slug}`}
                  className="group inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 text-amber-800 text-sm font-medium hover:bg-amber-100 hover:border-amber-300 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  {service.name}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          )}

          {extra.length > 0 && (
            <div className="mt-6 pt-6 border-t border-zinc-100 max-w-2xl mx-auto">
              <span className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-3">
                Ďalší rozsah dodávky
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {extra.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-200 text-zinc-700 text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
