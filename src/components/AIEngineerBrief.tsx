import React, { useState } from 'react';
import {
  Cpu,
  Terminal,
  Code2,
  GitBranch,
  Layers,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Award,
  Zap,
} from 'lucide-react';
import { IntelligenceArticle } from '../types';

interface AIEngineerBriefProps {
  articles: IntelligenceArticle[];
  onSelectArticle: (article: IntelligenceArticle) => void;
}

export const AIEngineerBrief: React.FC<AIEngineerBriefProps> = ({
  articles,
  onSelectArticle,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleSnippet = `// Gamji Edge Inference Pipeline with Offline SQLite Cache
import { GoogleGenAI } from '@google/genai';

export async function runOfflineFirstAgent(query: string, localCurriculumDb: any) {
  // 1. Search local SQLite vector index first (zero internet cost for Nigerian schools)
  const localMatch = await localCurriculumDb.vectorSearch(query, { threshold: 0.85 });
  
  if (localMatch) {
    return { answer: localMatch.content, source: 'offline_local_cache' };
  }

  // 2. Fallback to Cloud Gemini 3.7 Flash when online
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3.7-flash',
    contents: query,
    config: {
      systemInstruction: 'You are an expert Nigerian STEM tutor speaking in simple Hausa and English.'
    }
  });

  return { answer: response.text, source: 'gemini_cloud' };
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const aiArticles = articles.filter(
    (a) => a.category === 'Artificial Intelligence' || a.category === 'AI Engineering'
  );

  return (
    <div className="space-y-6">
      {/* Header Banner Bento Tile */}
      <div className="bento-card-gradient p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bento-pill-accent text-[11px] font-mono font-bold">
              AI ENGINEER’S DESK
            </span>
            <span className="text-white/40 text-xs font-mono">Full-Stack & Edge AI in Nigeria</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
            Architectures, Models & Weekly Build Challenges
          </h2>
          <p className="text-xs sm:text-sm text-white/60 max-w-2xl mt-1 leading-relaxed">
            Weekly deep technical blueprints, open-source models, RAG design patterns, and hardware deployment strategies for Nigerian engineers and 3MTT fellows.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs flex flex-col gap-1 self-start md:self-auto">
          <span className="bento-meta block">Active Challenge:</span>
          <span className="text-cyan-400 font-bold font-mono">#BUILD-CHALLENGE-104</span>
        </div>
      </div>

      {/* Featured Build Challenge Bento Box */}
      <div className="bento-card p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              BUILD CHALLENGE OF THE WEEK
            </span>
            <h3 className="text-2xl font-bold text-white font-display mt-1 tracking-tight">
              Malami AI — Offline Solar-Powered Classroom AI Tutor
            </h3>
          </div>
          <span className="bento-pill text-xs font-mono">
            ₦500,000 Milestone Prize + Incubation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <strong className="text-white font-semibold block text-sm">The Problem</strong>
              <p className="text-white/60 leading-relaxed">
                Secondary school students in rural LGAs lack experienced physics, chemistry, and mathematics teachers. Furthermore, internet data is unaffordable, and power outages prevent standard cloud computing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <strong className="text-cyan-300 font-semibold block text-sm">System Architecture</strong>
              <p className="text-white/80 leading-relaxed font-mono text-[11px]">
                Solar Panel (10W) → 12V Battery → Single Board PC (Orange Pi 5 / Raspberry Pi 5) → GGUF Quantized 8B Model → Local Wi-Fi Access Point (Captive Portal) → Student Phones
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
              <strong className="text-white font-semibold block text-sm">Recommended Tech Stack</strong>
              <div className="flex flex-wrap gap-1.5">
                {['llama.cpp', 'Python FastAPI', 'React PWA', 'Tailwind CSS', 'WebSpeech API', 'SQLite Vector'].map((t) => (
                  <span key={t} className="bento-pill text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
              <strong className="text-cyan-200 font-semibold block text-sm">Evaluation Criteria</strong>
              <ul className="text-white/70 space-y-1">
                <li>• Latency under 2.5s on edge hardware without internet</li>
                <li>• Hausa STEM vocabulary accuracy &gt; 92%</li>
                <li>• 100% responsive on low-end Android mobile browsers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Blueprint Bento Box */}
      <div className="bento-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-display">
              Production Code Blueprint: Offline-First AI Pipeline
            </h3>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer"
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Snippet</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
          <code>{sampleSnippet}</code>
        </pre>
      </div>

      {/* AI Engineering Articles */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white font-display">
          AI Engineering & Systems Articles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bento-card p-6 hover:border-cyan-500/40 transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="bento-pill text-[10px] font-mono">
                  {art.category}
                </span>
                <span className="text-[10px] font-mono text-cyan-400">
                  {art.verification.confidenceScore}% Confidence
                </span>
              </div>
              <h4 className="text-base font-bold text-white hover:text-cyan-300 transition-colors">
                {art.title}
              </h4>
              <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">{art.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
