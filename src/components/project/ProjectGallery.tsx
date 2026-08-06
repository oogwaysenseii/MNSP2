'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/src/data/projects';
import { Container } from '@/src/components/ui/Container';
import { X } from 'lucide-react';

export function ProjectGallery({ project }: { project: Project }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    if (!project.gallery || project.gallery.length === 0) return null;

    return (
        <section className="py-16 bg-zinc-50 border-y border-zinc-100">
            <Container className="max-w-[1500px]">
                <h2 className="sr-only">Galéria projektu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.gallery.map((img, idx) => (
                        <div
                            key={idx}
                            className="group relative aspect-[4/3] overflow-hidden bg-zinc-200 cursor-pointer"
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
                        </div>
                    ))}
                </div>
            </Container>

            {selectedImageIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-sm" onClick={() => setSelectedImageIndex(null)}>
                    <button
                        className="absolute top-6 right-6 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
                        onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="relative w-full max-w-6xl aspect-[4/3] sm:aspect-video" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={project.gallery[selectedImageIndex].url}
                            alt={project.gallery[selectedImageIndex].caption || `${project.title} - fotografia`}
                            fill
                            className="object-contain"
                        />
                        {project.gallery[selectedImageIndex].caption && (
                            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-center">
                                <p className="text-white font-medium text-lg">{project.gallery[selectedImageIndex].caption}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
