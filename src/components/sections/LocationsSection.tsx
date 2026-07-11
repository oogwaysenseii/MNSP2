"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { CITIES, KRAJE } from "@/src/data/cities";

interface LocationsSectionProps {
    serviceSlug?: string;
    citySlug?: string;
    getBreadcrumbUrl?: () => string;
}

export function LocationsSection({
                                     serviceSlug,
                                     citySlug,
                                     getBreadcrumbUrl,
                                 }: LocationsSectionProps) {
    const [activeKraj, setActiveKraj] = useState("banskobystricky");

    return (
        <div className="bg-zinc-50 border border-zinc-200 p-8 h-full flex flex-col justify-center">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-display font-bold text-zinc-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-600" />
                    {citySlug ? "Ďalšie lokality pôsobenia" : "Kde pôsobíme"}
                </h2>
                {!citySlug && (
                    <Link
                        href="/lokality"
                        className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center"
                    >
                        Všetky pobočky
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                )}
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wider">
                        Kraje (Regióny)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {KRAJE.map((kraj) => (
                            <button
                                key={kraj.slug}
                                onClick={() => setActiveKraj(kraj.slug)}
                                className={`inline-flex items-center px-3 py-1.5 border text-xs font-medium transition-colors shadow-sm cursor-pointer ${
                                    activeKraj === kraj.slug
                                        ? "bg-amber-500 border-amber-500 text-zinc-950 font-bold"
                                        : "bg-white border-zinc-200 text-zinc-700 hover:border-amber-500 hover:text-amber-600"
                                }`}
                            >
                                {kraj.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wider">
                        Okresné mestá
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {CITIES.filter(
                            (city) => city.kraj === activeKraj && city.slug !== citySlug
                        ).map((city) => {
                            const getServicePath = (slug: string) => {
                                if (!serviceSlug) return `/lokality/${city.slug}`;
                                if (getBreadcrumbUrl) {
                                    return citySlug
                                        ? `${getBreadcrumbUrl()}/${city.slug}`
                                        : `/sluzby/${serviceSlug}/${city.slug}`;
                                }
                                if (
                                    slug === "stavba-domu-na-kluc" ||
                                    slug === "rekonstrukcia-rodinneho-domu"
                                ) {
                                    return `/sluzby/rodinne-domy/${slug}/${city.slug}`;
                                }
                                return `/sluzby/${slug}/${city.slug}`;
                            };

                            return (
                                <Link
                                    key={city.slug}
                                    href={getServicePath(serviceSlug || "")}
                                    className="inline-flex items-center px-3 py-1.5 bg-white border border-zinc-200 text-xs font-medium hover:border-amber-500 hover:text-amber-600 transition-colors shadow-sm"
                                >
                                    {city.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
