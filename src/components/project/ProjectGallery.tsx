'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Project } from '@/src/data/projects';
import { Container } from '@/src/components/ui/Container';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function ProjectGallery({ project }: { project: Project }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const touchStartX = useRef<number | null>(null);

    const gallery = project.gallery;
    const count = gallery?.length ?? 0;
    const isOpen = selectedImageIndex !== null;

    const close = useCallback(() => setSelectedImageIndex(null), []);

    /** Wraps at both ends, so the arrows never dead-end on a 105-photo set. */
    const step = useCallback(
        (delta: number) =>
            setSelectedImageIndex((i) => (i === null ? i : (i + delta + count) % count)),
        [count],
    );

    // Keyboard: arrows to move, Escape to close. Without this the lightbox is
    // mouse-only, which is painful on a gallery this long.
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowRight') step(1);
            else if (e.key === 'ArrowLeft') step(-1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, close, step]);

    // Stop the page behind the overlay from scrolling while it is open.
    useEffect(() => {
        if (!isOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [isOpen]);

    if (!gallery || count === 0) return null;

    const current = selectedImageIndex !== null ? gallery[selectedImageIndex] : null;

    return (
        <section className="py-16 bg-zinc-50 border-y border-zinc-100">
            <Container className="max-w-[1500px]">
                <h2 className="sr-only">Galéria projektu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.map((img, idx) => (
                        <button
                            key={img.url}
                            type="button"
                            aria-label={`Zobraziť fotografiu ${idx + 1} z ${count}${img.caption ? `: ${img.caption}` : ''}`}
                            className="group relative aspect-[4/3] overflow-hidden bg-zinc-200 cursor-pointer w-full text-left"
                            onClick={() => setSelectedImageIndex(idx)}
                        >
                            <Image
                                src={img.url}
                                alt={img.caption || `${project.title} - fotografia ${idx + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {img.caption && (
                                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white font-medium text-sm">{img.caption}</p>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </Container>

            {current && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Galéria projektu"
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
                    onClick={close}
                    onTouchStart={(e) => {
                        touchStartX.current = e.touches[0].clientX;
                    }}
                    onTouchEnd={(e) => {
                        if (touchStartX.current === null) return;
                        const dx = e.changedTouches[0].clientX - touchStartX.current;
                        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
                        touchStartX.current = null;
                    }}
                >
                    {/* The image fills the viewport and is contained, so a portrait
                        shot uses the full height instead of being letterboxed into
                        a fixed 4:3 box — which is what the previous version did to
                        every phone photo in these galleries. */}
                    <Image
                        key={current.url}
                        src={current.url}
                        alt={current.caption || `${project.title} - fotografia ${selectedImageIndex! + 1}`}
                        fill
                        sizes="100vw"
                        className="object-contain p-4 sm:p-12"
                        priority
                    />

                    <button
                        type="button"
                        aria-label="Zavrieť"
                        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                        onClick={(e) => {
                            e.stopPropagation();
                            close();
                        }}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {count > 1 && (
                        <>
                            <button
                                type="button"
                                aria-label="Predchádzajúca fotografia"
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    step(-1);
                                }}
                            >
                                <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
                            </button>
                            <button
                                type="button"
                                aria-label="Ďalšia fotografia"
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    step(1);
                                }}
                            >
                                <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
                            </button>
                        </>
                    )}

                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/85 to-transparent pointer-events-none">
                        <p className="text-white/60 text-xs font-mono text-center mb-1">
                            {selectedImageIndex! + 1} / {count}
                        </p>
                        {current.caption && (
                            <p className="text-white font-medium text-sm sm:text-lg text-center max-w-3xl mx-auto">
                                {current.caption}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
