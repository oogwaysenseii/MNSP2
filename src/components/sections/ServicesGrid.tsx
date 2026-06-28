import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { sluzby } from '@/src/data/sluzby';

export function ServicesGrid({ hideAllLink = false }: { hideAllLink?: boolean }) {
  return (
    <section className="pt-5 pb-5 bg-white border-b border-gray-200 overflow-hidden">
      <Container className="max-w-[1500px]">

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {sluzby.slice(0, 5).map((sluzba) => (
            <Link 
              key={sluzba.id} 
              href={`/sluzby/${sluzba.id}`}
              className="group flex flex-col bg-white border border-gray-200 transition-all duration-500 hover:border-amber-500 hover:shadow-2xl h-full relative"
            >
              {/* Image Container - Fixed height to ensure rendering regardless of aspect ratio support */}
              <div className="relative w-full h-48 lg:h-56 overflow-hidden bg-gray-200">
                <Image
                  src={sluzba.imageUrl || `https://picsum.photos/seed/${sluzba.id}/600/400`}
                  alt={sluzba.name}
                  fill
                  quality={100}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-grow relative z-10 bg-zinc-50">
                <h3 className="text-lg font-bold mb-3 text-black transition-colors duration-300 group-hover:text-amber-500 leading-tight">
                  {sluzba.name}
                </h3>
                
                <p className="text-gray-500 mb-6 flex-grow text-sm leading-relaxed">
                  {sluzba.description || `Profesionálna realizácia v oblasti ${sluzba.name.toLowerCase()}. Zameriavame sa na najvyššiu kvalitu a odolnosť.`}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between transition-colors group-hover:border-amber-100">
                  <span
                    className="text-black group-hover:text-amber-600 font-bold text-[11px] tracking-widest uppercase flex items-center transition-colors"
                  >
                    ZOBRAZIŤ
                  </span>
                  <span className="text-black group-hover:text-amber-500 transition-colors transform group-hover:translate-x-1 duration-300">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {!hideAllLink && (
          <div className="mt-10 flex justify-end">
             <Link href="/sluzby" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-black transition-colors group">
               Zobraziť všetky služby
               <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
             </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
