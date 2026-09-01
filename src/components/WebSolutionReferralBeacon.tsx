import React, { useState, useEffect } from 'react';
import {
  Globe,
  Sparkles,
  ExternalLink,
  ArrowUpRight,
  ShieldCheck,
  X,
  Radio,
  Copy,
  Check,
  Code,
  Laptop,
  Compass,
  Zap,
  Play,
  Pause,
  Layers,
  Search,
} from 'lucide-react';
import { IntelligenceArticle, OpportunityItem } from '../types';

export interface WebBrowsingEvent {
  id: string;
  sourceUrl: string;
  sourceDomain: string;
  pageTitle: string;
  userContext: string;
  matchedSolutionType: 'article' | 'opportunity' | 'buildThis' | 'mineral';
  solutionId: string;
  solutionTitle: string;
  solutionSummary: string;
  solutionCategory: string;
  nigerianRelevance: string;
  confidenceScore: number;
}

interface WebSolutionReferralBeaconProps {
  articles: IntelligenceArticle[];
  opportunities: OpportunityItem[];
  onOpenArticle: (article: IntelligenceArticle) => void;
  onOpenOpportunity: (opp: OpportunityItem) => void;
  onShowToast: (msg: string) => void;
}

// Realistic simulated web browsing pages across the Nigerian & Global internet
const SIMULATED_WEB_EVENTS: Omit<WebBrowsingEvent, 'id'>[] = [
  {
    sourceUrl: 'https://techcabal.com/2026/08/nigerian-miners-seek-lithium-processing-partners/',
    sourceDomain: 'TechCabal Nigeria',
    pageTitle: 'Nigerian Mining Consortiums Seek High-Tech Lithium Processing Partners',
    userContext: 'Reader browsing African mining innovation news',
    matchedSolutionType: 'article',
    solutionId: 'art-1',
    solutionTitle: 'Nasarawa Spodumene Lithium Processing & Beneficiation Plant Concessions',
    solutionSummary: 'Federal Ministry initiates 25-year concession for domestic battery cathode precursor refining in Nasarawa and Kaduna.',
    solutionCategory: 'Mining & Minerals',
    nigerianRelevance: 'Guarantees $340M in local processing value retention rather than raw ore exports.',
    confidenceScore: 98,
  },
  {
    sourceUrl: 'https://news.ycombinator.com/item?id=39824110',
    sourceDomain: 'Hacker News',
    pageTitle: 'Show HN: Lightweight On-Device Speech Models for Low-Resource Languages',
    userContext: 'Developer looking for offline NLP models in West Africa',
    matchedSolutionType: 'article',
    solutionId: 'art-3',
    solutionTitle: 'ArewaLLM: Offline Hausa Speech-to-Text & Agricultural Diagnostic Engine',
    solutionSummary: 'Open-weight quantized 4-bit transformer model tailored for offline solar tablets used by extension workers in Kano.',
    solutionCategory: 'Hausa Tech',
    nigerianRelevance: 'Enables 14M rural farmers in Northern Nigeria to query agronomy data via voice in Hausa.',
    confidenceScore: 96,
  },
  {
    sourceUrl: 'https://nitda.gov.ng/grants/ai-research-fund-2026',
    sourceDomain: 'NITDA Official Portal',
    pageTitle: 'National Information Technology Development Agency Research Grants',
    userContext: 'Student / researcher searching for Nigerian tech funding',
    matchedSolutionType: 'opportunity',
    solutionId: 'opp-1',
    solutionTitle: 'Federal Ministry of Communications 3MTT AI Innovation & GPU Grant',
    solutionSummary: '₦15,000,000 equity-free funding and cloud compute vouchers for Nigerian AI researchers and startups.',
    solutionCategory: 'Scholarships & Grants',
    nigerianRelevance: 'Direct grants for Nigerian youth building sovereign foundational AI models.',
    confidenceScore: 99,
  },
  {
    sourceUrl: 'https://www.mining.com/nigeria-cadastre-solid-minerals-licensing-round/',
    sourceDomain: 'Mining.com Global',
    pageTitle: 'Nigeria Announces 2026 Cadastre Concession Auction for Critical Minerals',
    userContext: 'Investor evaluating West African mineral rights',
    matchedSolutionType: 'article',
    solutionId: 'art-2',
    solutionTitle: 'Presidential Solid Minerals Cadastre Concession Round 2026',
    solutionSummary: 'Transparent digital cadastre auction covering 140+ high-grade lithium, tantalite, and cassiterite blocks.',
    solutionCategory: 'Mining & Minerals',
    nigerianRelevance: 'Opens transparent bidding for local and diaspora consortiums.',
    confidenceScore: 95,
  },
  {
    sourceUrl: 'https://github.com/trending?since=daily',
    sourceDomain: 'GitHub Trending',
    pageTitle: 'Trending Open Source Repositories in AI Engineering',
    userContext: 'Software engineer seeking viable local startup architecture',
    matchedSolutionType: 'buildThis',
    solutionId: 'art-1',
    solutionTitle: 'Build This: GeoAssay — Mobile Spectrometry & Cadastre Verification PWA',
    solutionSummary: 'Full-stack offline-first React PWA + FastAPI with edge computer vision to verify mineral grades on-site.',
    solutionCategory: 'AI Engineering',
    nigerianRelevance: 'Solves the ₦45B assay fraud problem for artisanal miners across Jos and Nasarawa.',
    confidenceScore: 94,
  },
];

export const WebSolutionReferralBeacon: React.FC<WebSolutionReferralBeaconProps> = ({
  articles,
  opportunities,
  onOpenArticle,
  onOpenOpportunity,
  onShowToast,
}) => {
  const [isCompanionActive, setIsCompanionActive] = useState<boolean>(true);
  const [activeEvent, setActiveEvent] = useState<WebBrowsingEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [showEmbedStudio, setShowEmbedStudio] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);
  const [customWebUrl, setCustomWebUrl] = useState<string>('');
  const [isScanningCustom, setIsScanningCustom] = useState<boolean>(false);
  const [hasTriggeredInitial, setHasTriggeredInitial] = useState<boolean>(false);

  // Trigger initial contextual solution notification after app loads (to demonstrate the feature)
  useEffect(() => {
    if (!hasTriggeredInitial) {
      const timer = setTimeout(() => {
        triggerSimulatedDiscovery(0);
        setHasTriggeredInitial(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredInitial]);

  // Periodic simulated web intelligence discovery when companion is active
  useEffect(() => {
    if (!isCompanionActive) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * SIMULATED_WEB_EVENTS.length);
      triggerSimulatedDiscovery(randomIndex);
    }, 45000); // Trigger periodically

    return () => clearInterval(interval);
  }, [isCompanionActive]);

  const triggerSimulatedDiscovery = (index: number) => {
    const template = SIMULATED_WEB_EVENTS[index % SIMULATED_WEB_EVENTS.length];
    const newEvent: WebBrowsingEvent = {
      ...template,
      id: `web-event-${Date.now()}`,
    };
    setActiveEvent(newEvent);
    setIsDismissed(false);
  };

  // Handle clicking on the detected solution popup -> Refers user directly to the full solution details!
  const handleReferralClick = (event: WebBrowsingEvent) => {
    onShowToast(`Redirecting to full verified solution: "${event.solutionTitle}"...`);
    setIsDismissed(true);

    // Look for matching article first
    const matchedArticle = articles.find((a) => a.id === event.solutionId);
    if (matchedArticle) {
      onOpenArticle(matchedArticle);
      return;
    }

    // Look for matching opportunity
    const matchedOpp = opportunities.find((o) => o.id === event.solutionId);
    if (matchedOpp) {
      onOpenOpportunity(matchedOpp);
      return;
    }

    // Fallback: match by title similarity or default to first article
    const fallbackArt = articles.find((a) =>
      a.title.toLowerCase().includes(event.solutionTitle.toLowerCase()) ||
      a.category === event.solutionCategory
    ) || articles[0];

    if (fallbackArt) {
      onOpenArticle(fallbackArt);
    }
  };

  // Custom live web scanner simulation for any URL entered by the user
  const handleScanCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWebUrl) return;

    setIsScanningCustom(true);
    setTimeout(() => {
      setIsScanningCustom(false);
      const matchedArt = articles[Math.floor(Math.random() * articles.length)] || articles[0];
      const customEvent: WebBrowsingEvent = {
        id: `custom-${Date.now()}`,
        sourceUrl: customWebUrl,
        sourceDomain: new URL(customWebUrl.startsWith('http') ? customWebUrl : `https://${customWebUrl}`).hostname || 'External Website',
        pageTitle: `Browsing: ${customWebUrl}`,
        userContext: 'Live web surfing query analyzed by Gamji Autonomous Scout',
        matchedSolutionType: 'article',
        solutionId: matchedArt.id,
        solutionTitle: matchedArt.title,
        solutionSummary: matchedArt.summary,
        solutionCategory: matchedArt.category,
        nigerianRelevance: matchedArt.nigerianRelevance,
        confidenceScore: 97,
      };
      setActiveEvent(customEvent);
      setIsDismissed(false);
      onShowToast(`Gamji Web Intelligence matched a verified Nigerian solution for this page!`);
    }, 1200);
  };

  const sampleEmbedScript = `<!-- Gamji Web Intelligence Instant Solution Referral Beacon -->
<script 
  src="https://gamji-intelligence.ng/embed/beacon.js" 
  data-gamji-app="gamji-mines-edu"
  data-theme="dark"
  data-auto-refer="true"
  data-position="bottom-right"
  async>
</script>
<!-- Clicking any detected solution refers the visitor to the full Gamji OS solution details with verification scorecards -->`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(sampleEmbedScript);
    setCopiedSnippet(true);
    onShowToast('Embed snippet copied to clipboard! Paste it into any website HTML.');
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  return (
    <>
      {/* 1. Ambient Floating Solution Referral Popover (Appears when browsing the net or on detection) */}
      {activeEvent && !isDismissed && (
        <div
          id="gamji-web-referral-beacon"
          className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto"
        >
          <div className="rounded-[28px] bg-[#0c0c0c]/95 border border-emerald-500/40 shadow-2xl backdrop-blur-2xl p-5 text-white space-y-4 relative overflow-hidden ring-1 ring-emerald-500/20">
            {/* Ambient emerald backlight */}
            <div className="absolute -right-12 -top-12 w-36 h-36 bg-emerald-500/15 blur-[50px] rounded-full pointer-events-none" />

            {/* Header / Originating Web Context */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="bento-meta text-emerald-400 font-bold">
                  WEB INTELLIGENCE DETECTED
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="bento-pill-accent text-[10px] font-mono font-bold">
                  {activeEvent.confidenceScore}% Match
                </span>
                <button
                  type="button"
                  onClick={() => setIsDismissed(true)}
                  className="p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Dismiss alert"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Surfed Web Page Meta */}
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-white/50 font-mono text-[11px] truncate">
                <Globe className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="truncate">Found while on: <strong>{activeEvent.sourceDomain}</strong></span>
              </div>
              <p className="text-white/70 text-[11px] line-clamp-1 italic">
                &ldquo;{activeEvent.pageTitle}&rdquo;
              </p>
            </div>

            {/* Matching Verified Solution Card - Clickable to get full details */}
            <div
              onClick={() => handleReferralClick(activeEvent)}
              className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/50 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="bento-pill text-[10px] font-mono">
                  {activeEvent.solutionCategory}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Click for Full Solution</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                {activeEvent.solutionTitle}
              </h4>

              <p className="text-[11px] text-white/70 line-clamp-2 leading-relaxed">
                {activeEvent.solutionSummary}
              </p>

              <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/50">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Autonomous Intelligence
                </span>
                <span className="text-white/40">Referral ID: #{activeEvent.id.slice(-6)}</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowEmbedStudio(true)}
                className="text-[11px] font-mono text-white/50 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Code className="w-3 h-3 text-purple-400" />
                <span>Get Embed Widget</span>
              </button>

              <button
                type="button"
                onClick={() => handleReferralClick(activeEvent)}
                className="px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1 cursor-pointer transition-all"
              >
                <span>Open Full Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Floating Bottom-Left Companion Toggle & Test Trigger */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            const nextIdx = Math.floor(Math.random() * SIMULATED_WEB_EVENTS.length);
            triggerSimulatedDiscovery(nextIdx);
            onShowToast('Simulating web browsing event: Gamji solution detected on external site!');
          }}
          className="px-4 py-2 rounded-full bg-[#111111]/90 hover:bg-white/10 border border-white/15 shadow-2xl backdrop-blur-xl text-white text-xs font-mono font-medium flex items-center gap-2 cursor-pointer transition-all hover:border-emerald-500/50"
          title="Simulate discovering a solution while browsing the web"
        >
          <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Simulate Net Browsing</span>
        </button>

        <button
          type="button"
          onClick={() => setShowEmbedStudio(true)}
          className="p-2 rounded-full bg-[#111111]/90 hover:bg-white/10 border border-white/15 shadow-2xl backdrop-blur-xl text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Web Embed & Browser Extension Studio"
        >
          <Code className="w-4 h-4 text-purple-400" />
        </button>
      </div>

      {/* 3. Web Embed & Extension Studio Modal */}
      {showEmbedStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-[#111111] border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 text-white relative">
            <button
              type="button"
              onClick={() => setShowEmbedStudio(false)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bento-pill-accent text-[11px] font-mono font-bold">
                  WEB REFERRAL NETWORK
                </span>
                <span className="bento-pill text-[11px] font-mono text-purple-300">
                  Embeddable Widget & Extension
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display tracking-tight">
                Connect Gamji Solutions to Any Website
              </h3>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">
                Allow visitors browsing any Nigerian tech blog, university portal, or mineral forum to see verified Gamji solution popovers. When they click, they are instantly referred to the full solution details with deep-link attribution.
              </p>
            </div>

            {/* Test Live Web Page Scanner Form */}
            <form onSubmit={handleScanCustomUrl} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <span className="bento-meta block">Test Web Page Scanner</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. techcabal.com, nairametrics.com, or any mineral topic..."
                  value={customWebUrl}
                  onChange={(e) => setCustomWebUrl(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-white/30 focus:border-emerald-400 focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  disabled={isScanningCustom || !customWebUrl}
                  className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold font-mono text-xs flex items-center gap-1.5 cursor-pointer shrink-0 shadow-lg shadow-emerald-500/20"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{isScanningCustom ? 'Scanning...' : 'Test Referral'}</span>
                </button>
              </div>
              <p className="text-[10px] text-white/40 font-mono">
                Enter any URL or topic to trigger a simulated browsing event that generates an interactive solution referral.
              </p>
            </form>

            {/* Embed Code Snippet Container */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bento-meta">1-Line Javascript Embed Snippet:</span>
                <button
                  type="button"
                  onClick={copyEmbedCode}
                  className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedSnippet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippet ? 'Copied Code!' : 'Copy Script'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-emerald-300 overflow-x-auto">
                <pre>{sampleEmbedScript}</pre>
              </div>
            </div>

            {/* How It Works 3-Step Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                  1
                </div>
                <h4 className="font-bold text-white">Passive Web Detection</h4>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  As users browse related mineral, AI, or grant content, the beacon triggers an ambient match alert.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs">
                  2
                </div>
                <h4 className="font-bold text-white">1-Click Referral</h4>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  Clicking the popover instantly refers the visitor to the exact solution with verification scorecards.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-mono font-bold text-xs">
                  3
                </div>
                <h4 className="font-bold text-white">Direct Action & MVP</h4>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  Visitors access full architecture blueprints, grant application portals, and audio summaries.
                </p>
              </div>
            </div>

            {/* Footer Close */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/40">
                Gamji Autonomous Intelligence OS • Web Beacon API v2.6
              </span>
              <button
                type="button"
                onClick={() => setShowEmbedStudio(false)}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs cursor-pointer"
              >
                Close Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
