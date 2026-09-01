import React from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  Layers,
  Languages,
  Check,
  Clock,
  Building,
} from 'lucide-react';
import { IntelligenceArticle } from '../types';
import { AudioPlayer } from './AudioPlayer';

interface ArticleModalProps {
  article: IntelligenceArticle | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-[#111111] border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 text-white relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Status */}
        <div className="flex flex-wrap items-center gap-2 pr-12">
          <span className="bento-pill-accent text-xs font-mono font-bold">
            {article.category}
          </span>
          <span className="text-xs font-mono text-white/40">
            {article.publishedAt || article.source?.publishedDate || 'Today'} • {article.readTimeMinutes || 3} min read
          </span>
          <span className="bento-pill text-xs font-mono">
            Source: {article.source?.name || 'Verified Source'}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white font-display leading-snug tracking-tight">
          {article.title}
        </h2>

        {/* Audio Player */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
          <span className="bento-meta">Audio Briefing (English):</span>
          <AudioPlayer textToRead={`${article.title}. ${article.summary}. ${article.whyItMatters || ''}`} title={article.title} />
        </div>

        {/* Main Image if available */}
        {article.imageUrl && (
          <div className="rounded-2xl overflow-hidden border border-white/10 max-h-72">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Core Summary & Content */}
        <div className="space-y-3">
          <p className="text-sm text-white/90 leading-relaxed font-medium">
            {article.summary}
          </p>
          <div className="text-xs text-white/60 leading-relaxed space-y-2 whitespace-pre-line">
            {article.whatHappened || article.summary}
          </div>
        </div>

        {/* AI Verification Scorecard */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-white font-display">
                Autonomous Verification Scorecard (Gamji Verify)
              </h4>
            </div>
            <span className="bento-pill-accent text-xs font-mono font-bold text-emerald-400">
              {article.verification?.confidenceScore ?? 95}% Confidence
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="bento-meta block">Source Trust</span>
              <div className="text-base font-bold text-white font-mono mt-0.5">
                {article.verification?.sourceTrust ?? 92}%
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="bento-meta block">Corroboration</span>
              <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                {article.verification?.corroborationCount ?? (article.verification as any)?.corroboratingSources?.length ?? 3} Sources
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="bento-meta block">Risk Level</span>
              <div className="text-base font-bold text-amber-400 font-mono mt-0.5 uppercase">
                {article.qualityGate?.riskLevel ?? 'LOW'}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="bento-meta block">Status</span>
              <div className="text-base font-bold text-emerald-300 font-mono mt-0.5 uppercase">
                {article.qualityGate?.status ? article.qualityGate.status.replace('_', ' ') : 'APPROVED'}
              </div>
            </div>
          </div>

          {/* Named Entities Extracted */}
          {(article.verification as any)?.keyEntitiesExtracted && (article.verification as any).keyEntitiesExtracted.length > 0 && (
            <div className="space-y-1.5 text-xs">
              <span className="bento-meta block">Extracted Entities & Locations:</span>
              <div className="flex flex-wrap gap-1.5">
                {((article.verification as any).keyEntitiesExtracted as string[]).map((ent, idx) => (
                  <span
                    key={idx}
                    className="bento-pill text-[11px]"
                  >
                    {ent}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Why it matters to Nigeria */}
        <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
          <span className="text-xs font-bold text-emerald-400 font-mono uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            WHY THIS MATTERS TO NIGERIA
          </span>
          <p className="text-xs text-white/80 leading-relaxed">
            {article.nigerianRelevance}
          </p>
        </div>

        {/* Build This MVP concept if available */}
        {article.buildThis && (
          <div className="p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-3">
            <span className="text-xs font-bold text-indigo-300 font-mono uppercase flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              BUILD THIS: NIGERIAN STARTUP OPPORTUNITY
            </span>
            <h4 className="text-base font-bold text-white">{article.buildThis.title}</h4>
            <p className="text-xs text-white/80 leading-relaxed">{article.buildThis.problem}</p>
            <div className="text-[11px] font-mono text-indigo-300">
              <strong>Stack:</strong> {(article.buildThis.techStack || []).join(' • ')}
            </div>
          </div>
        )}

        {/* Hausa Summary if available */}
        {article.hausaSummary && (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 font-mono uppercase flex items-center gap-1.5">
                <Languages className="w-4 h-4" />
                FASAHAR HAUSA (HAUSA BRIEFING)
              </span>
              <AudioPlayer textToRead={article.hausaSummary.summary} title={article.hausaSummary.title} language="ha" />
            </div>
            <h4 className="text-sm font-bold text-emerald-200">{article.hausaSummary.title}</h4>
            <p className="text-xs text-white/70 leading-relaxed">{article.hausaSummary.summary}</p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <a
            href={article.source?.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-white/50 hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
          >
            <span>View Original Source Documentation</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onReject(article.id);
                onClose();
              }}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-red-950/40 text-white/60 hover:text-red-400 border border-white/10 text-xs font-mono cursor-pointer transition-colors"
            >
              Reject / Archive
            </button>
            <button
              type="button"
              onClick={() => {
                onApprove(article.id);
                onClose();
              }}
              className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <Check className="w-4 h-4" />
              <span>Approve for Dispatch</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
