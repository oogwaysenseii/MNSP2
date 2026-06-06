import ConstructionCalculator from "@/src/components/calculator/ConstructionCalculator";

export const metadata = {
  title: "Cenová kalkulačka | MN-Stavebné Práce",
  description: "Vypočítajte si orientačnú cenu vašej plánovanej stavby alebo rekonštrukcie.",
};

export default function KalkulackaPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      {/* HEADER SECTION */}
      <div className="bg-zinc-950 text-white py-20 px-6 mt-16 sm:mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight">
            Cenová kalkulačka
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Získajte rýchly odhad nákladov na váš projekt. Naklikajte si rozsah prác a parametre, a my vám obratom ukážeme orientačnú cenu.
          </p>
        </div>
      </div>

      <ConstructionCalculator />
    </main>
  );
}
