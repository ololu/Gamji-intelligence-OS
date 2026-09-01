import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Sparkles,
  Zap,
  RotateCw,
  Copy,
  Check,
  CheckCircle,
  Clock,
  DollarSign,
  Smartphone,
  Server,
  Database,
  WifiOff,
} from 'lucide-react';

export const BuildLab: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState(
    'Lithium & Solid Mineral Artisanal Supply Chain Traceability in Nasarawa & Kaduna'
  );
  const [customIdea, setCustomIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprint, setBlueprint] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const presetProblems = [
    'Lithium & Solid Mineral Artisanal Supply Chain Traceability in Nasarawa & Kaduna',
    'Offline Solar-Powered Secondary School AI Tutor in Northern Nigeria',
    'Cassava & Tomato Pest Early Diagnostic Assistant via WhatsApp',
    'Hausa & Nigerian Accent Speech-to-Text for Court Transcriptions & Radio',
    'Solar Mini-Grid Smart Metering & USSD Payment Gateway for Rural LGAs',
    'Almajiri & Out-of-School Children Literacy Gamification on Low-End Android',
  ];

  const handleGenerate = async (targetIdea?: string) => {
    const query = targetIdea || customIdea || selectedProblem;
    setIsGenerating(true);

    try {
      const response = await fetch('/api/build-lab/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: query, domain: 'Nigeria STEM & Solid Minerals' }),
      });
      const data = await response.json();
      setBlueprint(data);
    } catch (e) {
      // Fallback structured blueprint
      setBlueprint({
        title: query,
        problemStatement:
          'Informal operators and small enterprises lack cost-effective telemetry and data verification tooling suited for Nigerian infrastructure realities.',
        targetAudience: 'Artisanal miners, cooperative heads, and state ministry inspectors in Kaduna and Nasarawa.',
        techStack: {
          frontend: 'React PWA (Progressive Web App) with IndexedDB offline storage',
          backend: 'FastAPI / Node.js Express lightweight microservice',
          aiModel: 'Gemini 3.7 Flash + Local ONNX Runtime / MobileNet for mobile grading',
          database: 'PostgreSQL with PostGIS for geological coordinates',
          hardware: 'Handheld Bluetooth Bluetooth GPS + QR thermal badge printer',
        },
        architecture:
          'Mobile PWA captures GPS tags and ore photos offline → Syncs via edge queue upon 3G connection → Cloud AI analyzes spectrographic image → Generates cryptographic provenance certificate.',
        nigeriaSpecificConstraints: [
          'Zero-data offline operation with local IndexedDB storage',
          'SMS / USSD fallback notifications for remote field workers',
          'Low power battery consumption on 2GB RAM Android phones',
          'Multi-language UI support in Hausa, Yoruba, and English',
        ],
        fourWeekRoadmap: [
          'Week 1: Schema design, offline local storage, and GPS tagging UI',
          'Week 2: Backend REST endpoints and lightweight AI vision model pipeline',
          'Week 3: Field testing with 5 cooperatives in Nasarawa state',
          'Week 4: Launch MVP, USSD notification gateway, and public demo',
        ],
        monetization:
          'SaaS subscription for licensed mineral exporters (₦50,000/mo) + 0.5% verification fee per assayed consignment.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyBlueprint = () => {
    navigator.clipboard.writeText(JSON.stringify(blueprint, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner Bento Tile */}
      <div className="bento-card-gradient p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bento-pill-accent text-[11px] font-mono font-bold">
              GAMJI BUILD LAB
            </span>
            <span className="text-white/40 text-xs font-mono">MVP Blueprint & System Architect</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
            Nigerian MVP Architecture Generator
          </h2>
          <p className="text-xs sm:text-sm text-white/60 max-w-2xl mt-1 leading-relaxed">
            Turn real Nigerian problems in solid minerals, education, agriculture, and AI into complete production architectures, tech stacks, and 4-week execution roadmaps.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs flex flex-col gap-1 self-start md:self-auto">
          <span className="bento-meta block">Architect Engine:</span>
          <span className="text-indigo-300 font-bold font-mono">Gemini 3.7 Structured Spec</span>
        </div>
      </div>

      {/* Selector & Custom Input Bento Box */}
      <div className="bento-card p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white font-display">
            Select or Describe a Nigerian Problem to Architect
          </h3>
          <p className="text-xs text-white/50 mt-1">
            Choose a verified regional bottleneck or describe your own domain challenge to generate an engineering architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {presetProblems.map((prob, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedProblem(prob);
                handleGenerate(prob);
              }}
              className={`p-4 rounded-2xl text-left text-xs transition-all border cursor-pointer ${
                selectedProblem === prob
                  ? 'bg-indigo-500/15 border-indigo-500/50 text-white font-semibold shadow-lg shadow-indigo-500/10'
                  : 'bg-white/[0.02] border-white/5 text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              {prob}
            </button>
          ))}
        </div>

        <div className="pt-2">
          <label className="bento-meta block mb-2">
            Or type your custom Nigerian product idea:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. Real-time GSM telemetry for cold chain vaccine storage in rural Primary Health Centers..."
              value={customIdea}
              onChange={(e) => setCustomIdea(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-white/30 focus:border-indigo-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className={`px-6 py-3 rounded-full font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isGenerating
                  ? 'bg-white/5 text-white/30 cursor-not-allowed'
                  : 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20'
              }`}
            >
              {isGenerating ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Architecting MVP...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Blueprint</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Rendered Architecture Blueprint Bento Box */}
      {blueprint && (
        <div className="bento-card p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                PRODUCTION SYSTEM BLUEPRINT
              </span>
              <h3 className="text-2xl font-bold text-white font-display mt-1 tracking-tight">
                {blueprint.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={handleCopyBlueprint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-mono cursor-pointer self-start sm:self-auto"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">JSON Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Full Spec</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Problem & Audience */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <span className="bento-meta block">
                  CORE PROBLEM STATEMENT
                </span>
                <p className="text-white/80 leading-relaxed">{blueprint.problemStatement}</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <span className="bento-meta block">
                  TARGET NIGERIAN AUDIENCE
                </span>
                <p className="text-white/80 leading-relaxed">{blueprint.targetAudience}</p>
              </div>

              {/* Nigerian Constraints */}
              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2.5">
                <span className="bento-meta text-amber-400 flex items-center gap-1.5">
                  <WifiOff className="w-3.5 h-3.5" />
                  NIGERIAN INFRASTRUCTURE ADAPTATIONS
                </span>
                <ul className="space-y-1.5 text-white/80 text-xs">
                  {blueprint.nigeriaSpecificConstraints?.map((c: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Architecture & Tech Stack */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
                <span className="bento-meta text-indigo-400 block">
                  RECOMMENDED TECH STACK
                </span>
                <div className="space-y-2 text-xs text-white/80 font-mono">
                  <div><strong className="text-white">Frontend:</strong> {blueprint.techStack?.frontend}</div>
                  <div><strong className="text-white">Backend:</strong> {blueprint.techStack?.backend}</div>
                  <div><strong className="text-white">AI Engine:</strong> {blueprint.techStack?.aiModel}</div>
                  <div><strong className="text-white">Database:</strong> {blueprint.techStack?.database}</div>
                  <div><strong className="text-white">Hardware / Edge:</strong> {blueprint.techStack?.hardware}</div>
                </div>
              </div>

              {/* 4-Week Roadmap */}
              <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-2.5">
                <span className="bento-meta text-indigo-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  4-WEEK EXECUTION ROADMAP
                </span>
                <ul className="space-y-1.5 text-white/80 text-xs">
                  {blueprint.fourWeekRoadmap?.map((step: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-400 font-bold">✓</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Monetization */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-1.5">
                <span className="bento-meta text-emerald-400 block">
                  BUSINESS & MONETIZATION MODEL
                </span>
                <p className="text-emerald-200">{blueprint.monetization}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
