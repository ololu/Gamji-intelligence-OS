import React, { useState } from 'react';
import {
  Pickaxe,
  MapPin,
  TrendingUp,
  Cpu,
  GraduationCap,
  Calculator,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { IntelligenceArticle } from '../types';

interface MinesIntelligenceProps {
  articles: IntelligenceArticle[];
  onSelectArticle: (article: IntelligenceArticle) => void;
}

export const MinesIntelligence: React.FC<MinesIntelligenceProps> = ({
  articles,
  onSelectArticle,
}) => {
  const [rawTonnage, setRawTonnage] = useState<number>(1000);
  const [rawPriceUSD, setRawPriceUSD] = useState<number>(850);
  const [refinedPriceUSD, setRefinedPriceUSD] = useState<number>(18500);

  // Beneficiation calculation: 1000 tons of 2% raw ore yields ~15% high-grade concentrate or refined product
  const rawExportGrossUSD = rawTonnage * rawPriceUSD;
  const refinedYieldTons = rawTonnage * 0.15;
  const domesticGrossUSD = refinedYieldTons * refinedPriceUSD;
  const multiplier = (domesticGrossUSD / (rawExportGrossUSD || 1)).toFixed(1);

  const mineralsList = [
    {
      name: 'Lithium (Spodumene / Lepidolite)',
      states: ['Nasarawa', 'Kaduna', 'Kogi', 'Ekiti', 'Oyo'],
      applications: 'LFP & NMC EV Batteries, Solar Storage, Drone Power Cells',
      mandate: '100% In-Country Beneficiation Required (No Raw Export)',
      status: 'Surging High',
      color: 'emerald',
    },
    {
      name: 'Tantalite & Columbite (Coltan)',
      states: ['Plateau (Jos)', 'Kogi', 'Osun', 'Kano', 'Nasarawa'],
      applications: 'Capacitors, 5G Smartphone Circuitry, Avionics, Medical Implants',
      mandate: 'Licensed Export upon 90%+ Oxide Purity Assay',
      status: 'Strategic Global Asset',
      color: 'teal',
    },
    {
      name: 'Bitumen & Heavy Crude Deposits',
      states: ['Ondo', 'Ogun', 'Lagos', 'Edo'],
      applications: 'Road Infrastructure, Asphalt Paving, Petrochemical Polymers',
      mandate: 'Import Substitution Development Priority',
      status: 'Untapped Reserve (42 Billion Barrels)',
      color: 'amber',
    },
    {
      name: 'Gold (Vein & Alluvial)',
      states: ['Zamfara', 'Osun (Ilesha)', 'Niger', 'Kogi', 'Kebbi'],
      applications: 'National Reserves, Jewelry, High-Reliability Electronic Connectors',
      mandate: 'PAGMI National Gold Purchase Scheme Verification',
      status: 'High Domestic Formalization',
      color: 'yellow',
    },
    {
      name: 'Rare Earth Elements (Monazite, Xenotime)',
      states: ['Plateau', 'Bauchi', 'Kaduna'],
      applications: 'Permanent Magnets for Wind Turbines & EV Motors, Defense Tech',
      mandate: 'Strategic Exploration & Radiometric Mapping',
      status: 'High Research Priority',
      color: 'purple',
    },
  ];

  const miningArticles = articles.filter(
    (a) => a.category === 'Mining & Minerals' || a.tags.some((t) => t.toLowerCase().includes('mining') || t.toLowerCase().includes('lithium'))
  );

  return (
    <div className="space-y-6">
      {/* Header Banner Bento Tile */}
      <div className="bento-card-gradient p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bento-pill-accent text-[11px] font-mono font-bold">
              GAMJI MINES INTELLIGENCE
            </span>
            <span className="text-white/40 text-xs font-mono">Geological & Industrial Value Chain</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
            Nigeria Solid Minerals & Mining Technology
          </h2>
          <p className="text-xs sm:text-sm text-white/60 max-w-2xl mt-1 leading-relaxed">
            Tracking mineral exploration, geological mapping, domestic processing mandates, and engineering opportunities for Nigerian researchers, software builders, and mining entrepreneurs.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs flex flex-col gap-1 self-start md:self-auto">
          <span className="bento-meta block">Federal Mandate:</span>
          <span className="text-emerald-400 font-bold font-mono">In-Country Beneficiation Enforced</span>
        </div>
      </div>

      {/* Mineral of the Week: Lithium Spotlight Bento Box */}
      <div className="bento-card p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              MINERAL OF THE WEEK SPOTLIGHT
            </span>
            <h3 className="text-2xl font-bold text-white font-display mt-1 tracking-tight">
              Lithium (Spodumene & Lepidolite Pegmatites)
            </h3>
          </div>
          <span className="bento-pill text-xs font-mono">
            Key Regions: Nasarawa • Kaduna • Kogi • Oyo
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: What is it & deposits */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <span className="bento-meta text-emerald-400">
              01 • GEOLOGICAL DEPOSITS
            </span>
            <h4 className="text-base font-bold text-white">Where is it in Nigeria?</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Found predominantly in central pegmatite belts: Kokona and Uke in <strong>Nasarawa</strong>, Birnin Gwari in <strong>Kaduna</strong>, Egbe in <strong>Kogi</strong>, and Komu in <strong>Oyo</strong>.
            </p>
          </div>

          {/* Card 2: Industrial & clean energy use */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <span className="bento-meta text-teal-400">
              02 • INDUSTRIAL APPLICATION
            </span>
            <h4 className="text-base font-bold text-white">Why does the world need it?</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Essential for Lithium Iron Phosphate (LFP) and NMC battery cells powering electric mobility, off-grid telecom towers, and national renewable grid energy storage.
            </p>
          </div>

          {/* Card 3: Engineering opportunity */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <span className="bento-meta text-cyan-400">
              03 • BUILDER OPPORTUNITY
            </span>
            <h4 className="text-base font-bold text-cyan-300">What can engineers build?</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Automated computer vision ore grading systems, IoT acid recovery sensors, chemical flotation controllers, and digital traceability pipelines.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Beneficiation Value Calculator Bento Box */}
      <div className="bento-card p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-display">
              Domestic Beneficiation Multiplier Calculator
            </h3>
            <p className="text-xs text-white/50">
              Calculate the macroeconomic difference between exporting raw unrefined ore vs. domestic processing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="bento-meta block mb-1.5">
              Raw Ore Tonnage (Tons)
            </label>
            <input
              type="number"
              value={rawTonnage}
              onChange={(e) => setRawTonnage(Number(e.target.value) || 0)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono focus:border-emerald-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="bento-meta block mb-1.5">
              Raw Export Price / Ton ($ USD)
            </label>
            <input
              type="number"
              value={rawPriceUSD}
              onChange={(e) => setRawPriceUSD(Number(e.target.value) || 0)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono focus:border-emerald-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="bento-meta block mb-1.5">
              Refined Battery Product Price / Ton ($ USD)
            </label>
            <input
              type="number"
              value={refinedPriceUSD}
              onChange={(e) => setRefinedPriceUSD(Number(e.target.value) || 0)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono focus:border-emerald-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Calculation Output Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs space-y-1">
            <span className="bento-meta block">RAW EXPORT GROSS</span>
            <div className="text-xl font-bold text-white/80 font-mono">
              ${rawExportGrossUSD.toLocaleString()} USD
            </div>
            <span className="text-[11px] text-white/40 font-mono">Value retained in Nigeria: ~8%</span>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
            <span className="bento-meta text-emerald-400 block">DOMESTIC REFINED GROSS</span>
            <div className="text-xl font-bold text-emerald-300 font-mono">
              ${domesticGrossUSD.toLocaleString()} USD
            </div>
            <span className="text-[11px] text-emerald-400/80 font-mono">High local chemical multiplier</span>
          </div>

          <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs space-y-1">
            <span className="bento-meta text-teal-400 block">ECONOMIC VALUE MULTIPLIER</span>
            <div className="text-2xl font-black text-teal-300 font-mono">
              {multiplier}x Increase
            </div>
            <span className="text-[11px] text-teal-400/80 font-mono">Domestic economic gain</span>
          </div>
        </div>
      </div>

      {/* Strategic Nigerian Minerals Directory */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white font-display">
            Strategic Mineral Value Chains in Nigeria
          </h3>
          <p className="text-xs text-white/50">
            Geographic distribution and processing requirements across major mineral belts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mineralsList.map((mineral, idx) => (
            <div
              key={idx}
              className="bento-card p-6 space-y-4 flex flex-col justify-between hover:border-emerald-500/40 transition-all"
            >
              <div className="space-y-2.5">
                <span className="bento-pill text-[10px] text-emerald-400 font-mono">
                  {mineral.status}
                </span>
                <h4 className="text-base font-bold text-white">{mineral.name}</h4>
                
                <div className="text-xs text-white/60 space-y-1.5 pt-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Deposits:</strong> {mineral.states.join(', ')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Cpu className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Uses:</strong> {mineral.applications}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] text-white/60 font-mono">
                <span className="bento-meta block mb-0.5">POLICY MANDATE</span>
                <span className="text-white/80">{mineral.mandate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Mining Intelligence Articles */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white font-display">
          Verified Mining & Geological Intelligence Reports
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {miningArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bento-card p-6 hover:border-emerald-500/40 transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="bento-pill text-[10px] font-mono">
                  {art.category}
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {art.verification.confidenceScore}% Verified
                </span>
              </div>
              <h4 className="text-base font-bold text-white hover:text-emerald-300 transition-colors">
                {art.title}
              </h4>
              <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">{art.summary}</p>
              <div className="text-xs text-emerald-400 font-bold flex items-center gap-1 pt-1">
                <span>View Full Mining Brief</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
