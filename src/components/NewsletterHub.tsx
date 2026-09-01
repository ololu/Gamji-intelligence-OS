import React, { useState } from 'react';
import {
  Send,
  Calendar,
  Sparkles,
  Layers,
  Pickaxe,
  Cpu,
  GraduationCap,
  Radar,
  Languages,
  CheckCircle2,
  Copy,
  Printer,
  Download,
  Share2,
  Bookmark,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Check,
} from 'lucide-react';
import {
  IntelligenceArticle,
  NewsletterEdition,
  OpportunityItem,
  SubscriberProfile,
} from '../types';
import { AudioPlayer } from './AudioPlayer';

interface NewsletterHubProps {
  editions: NewsletterEdition[];
  articles: IntelligenceArticle[];
  opportunities: OpportunityItem[];
  subscriber: SubscriberProfile;
  onSelectArticle: (article: IntelligenceArticle) => void;
  onOpenSubscriberModal: () => void;
  onGenerateCustomNewsletter: () => void;
  isGeneratingCustom: boolean;
  customEditionData: any;
}

export const NewsletterHub: React.FC<NewsletterHubProps> = ({
  editions,
  articles,
  opportunities,
  subscriber,
  onSelectArticle,
  onOpenSubscriberModal,
  onGenerateCustomNewsletter,
  isGeneratingCustom,
  customEditionData,
}) => {
  const [selectedEditionId, setSelectedEditionId] = useState<string>('ed-weekly-104');
  const [activeViewMode, setActiveViewMode] = useState<'weekly' | 'daily' | 'personalized'>('weekly');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const currentEdition = editions.find((e) => e.id === selectedEditionId) || editions[0] || ({} as any);

  // Selected stories for this edition
  const bigStory = articles.find((a) => a.id === currentEdition?.bigStoryId) || articles[0] || ({} as any);
  const relatedStories = (articles || []).filter((a) => currentEdition?.storyIds?.includes(a.id));
  const relatedOpportunities = (opportunities || []).filter((o) => currentEdition?.opportunityIds?.includes(o.id));

  // Audio text synthesis for full newsletter
  const newsletterAudioText = currentEdition?.title
    ? `Welcome to ${currentEdition.title}. Today's big story: ${bigStory?.title || ''}. Summary: ${bigStory?.summary || ''}. In Nigerian mining and innovation: ${bigStory?.whyItMatters || ''}. Hausa summary: ${bigStory?.hausaSummary?.summary || ''}`
    : '';

  const handleCopyHtml = () => {
    const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${currentEdition.title}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c0a09; color: #f5f5f4; margin: 0; padding: 24px;">
  <div style="max-width: 680px; margin: 0 auto; background-color: #1c1917; border: 1px solid #292524; border-radius: 12px; padding: 32px;">
    <div style="border-bottom: 2px solid #10b981; padding-bottom: 16px; margin-bottom: 24px;">
      <h1 style="color: #10b981; margin: 0; font-size: 24px;">GAMJI INTELLIGENCE</h1>
      <p style="color: #a8a29e; margin: 4px 0 0 0; font-size: 14px;">${currentEdition.subtitle}</p>
      <p style="color: #78716c; margin: 2px 0 0 0; font-size: 12px;">${currentEdition.date}</p>
    </div>

    <div style="margin-bottom: 32px;">
      <span style="background: #064e3b; color: #6ee7b7; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">01 — THE BIG STORY</span>
      <h2 style="color: #fafaf9; font-size: 20px; margin: 12px 0 8px 0;">${bigStory.title}</h2>
      <p style="color: #d6d3d1; font-size: 15px; line-height: 1.6;">${bigStory.summary}</p>
      
      <div style="background: #292524; border-left: 4px solid #10b981; padding: 12px; margin: 16px 0; border-radius: 0 8px 8px 0;">
        <strong style="color: #10b981; display: block; font-size: 13px;">💡 WHY THIS MATTERS TO NIGERIA</strong>
        <p style="color: #e7e5e4; font-size: 13px; margin: 4px 0 0 0;">${bigStory.nigerianRelevance}</p>
      </div>

      ${bigStory.buildThis ? `
      <div style="background: #1e1b4b; border: 1px solid #4338ca; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <span style="color: #a5b4fc; font-size: 11px; font-weight: bold;">🛠️ BUILD THIS: STARTUP BLUEPRINT</span>
        <h3 style="color: #e0e7ff; margin: 6px 0; font-size: 16px;">${bigStory.buildThis.title}</h3>
        <p style="color: #c7d2fe; font-size: 13px; margin: 0 0 8px 0;">${bigStory.buildThis.problem}</p>
        <p style="color: #a5b4fc; font-size: 12px; margin: 0;"><strong>Tech Stack:</strong> ${bigStory.buildThis.techStack.join(', ')}</p>
      </div>` : ''}

      ${bigStory.hausaSummary ? `
      <div style="background: #022c22; border: 1px solid #065f46; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <span style="color: #34d399; font-size: 11px; font-weight: bold;">🇳🇬 SASHER KOYON FASAHA A HARSHEN HAUSA</span>
        <h4 style="color: #6ee7b7; margin: 6px 0; font-size: 15px;">${bigStory.hausaSummary.title}</h4>
        <p style="color: #a7f3d0; font-size: 13px; margin: 0;">${bigStory.hausaSummary.summary}</p>
      </div>` : ''}
    </div>

    <div style="border-top: 1px solid #292524; padding-top: 20px; text-align: center; color: #78716c; font-size: 12px;">
      <p>Delivered by Gamji Intelligence OS • Gamji Mines & Educational Services</p>
      <p><a href="https://gamji-intelligence.ng" style="color: #10b981;">Manage Subscription & Interests</a></p>
    </div>
  </div>
</body>
</html>
    `;
    navigator.clipboard.writeText(htmlEmail);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  const handleSimulateDispatch = () => {
    setDispatchStatus('sending');
    setTimeout(() => {
      setDispatchStatus('sent');
      setTimeout(() => setDispatchStatus('idle'), 4000);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Mode Switcher Bento Tile */}
      <div className="bento-card-gradient p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bento-pill-accent text-[11px] font-mono font-bold">
              FLAGSHIP DISTRIBUTION
            </span>
            <span className="text-white/40 text-xs font-mono">Resend API & Edge Webhooks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
            Gamji Newsletter Hub
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-xl">
            Publishing flagship weekly editions, daily digests, and dynamically personalized subscriber intelligence.
          </p>
        </div>

        {/* View mode toggle pill container */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.05] border border-white/10 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveViewMode('weekly')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeViewMode === 'weekly'
                ? 'bg-emerald-500 text-stone-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            Gamji Weekly
          </button>
          <button
            type="button"
            onClick={() => setActiveViewMode('daily')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeViewMode === 'daily'
                ? 'bg-emerald-500 text-stone-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            Gamji Daily
          </button>
          <button
            type="button"
            onClick={() => setActiveViewMode('personalized')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeViewMode === 'personalized'
                ? 'bg-emerald-500 text-stone-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Personalized</span>
          </button>
        </div>
      </div>

      {/* Main Newsletter Bento Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 cols: Publication View */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active View: Personalized Newsletter */}
          {activeViewMode === 'personalized' && (
            <div className="bento-card p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div>
                  <span className="bento-pill-accent text-[10px] font-mono">
                    1-of-1 DYNAMIC PERSONALIZATION
                  </span>
                  <h3 className="text-xl font-bold text-white font-display mt-1.5">
                    Intelligence Briefing for {subscriber.name}
                  </h3>
                  <p className="text-xs text-white/50 font-mono mt-0.5">
                    Profile: {subscriber.experienceLevel} • Language: {subscriber.language}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onGenerateCustomNewsletter}
                    disabled={isGeneratingCustom}
                    className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingCustom ? 'Compiling AI Feed...' : 'Re-Generate AI Edition'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenSubscriberModal}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-medium cursor-pointer"
                  >
                    Edit Interests
                  </button>
                </div>
              </div>

              {/* Active Selected Interests Chips */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bento-meta">Subscribed Verticals:</span>
                {(subscriber?.interests || []).map((interest) => (
                  <span
                    key={interest}
                    className="bento-pill text-[11px]"
                  >
                    {interest}
                  </span>
                ))}
              </div>

              {/* Content of custom edition */}
              {customEditionData ? (
                <div className="space-y-6 pt-2">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 leading-relaxed">
                    {customEditionData.welcomeMessage}
                  </div>

                  {customEditionData.customizedSections?.map((section: any, idx: number) => (
                    <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
                      <span className="bento-meta text-emerald-400">
                        SECTION 0{idx + 1} • {section.sectionTitle}
                      </span>
                      <h4 className="text-base font-bold text-white">{section.sectionTitle}</h4>
                      <p className="text-xs text-white/70 leading-relaxed">{section.summary}</p>
                      {section.opportunityAngle && (
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-amber-300">
                          <strong>Opportunity:</strong> {section.opportunityAngle}
                        </div>
                      )}
                    </div>
                  ))}

                  {customEditionData.buildChallengeOfTheWeek && (
                    <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2.5">
                      <span className="bento-meta text-indigo-300">
                        👨🏾‍💻 YOUR WEEKLY BUILD CHALLENGE
                      </span>
                      <h4 className="text-base font-bold text-indigo-100">
                        {customEditionData.buildChallengeOfTheWeek.title}
                      </h4>
                      <p className="text-xs text-indigo-200 leading-relaxed">
                        {customEditionData.buildChallengeOfTheWeek.problem}
                      </p>
                      <div className="text-[11px] font-mono text-indigo-300">
                        <strong>Architecture:</strong> {customEditionData.buildChallengeOfTheWeek.architecture}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-white/60 leading-relaxed">
                    Personalized edition compiled for your active profile. Articles are filtered from the live Gamji database to match your focus areas.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {articles.slice(0, 4).map((art) => (
                      <div
                        key={art.id}
                        onClick={() => onSelectArticle(art)}
                        className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all cursor-pointer space-y-2.5"
                      >
                        <span className="bento-meta text-emerald-400">{art.category}</span>
                        <h4 className="text-sm font-bold text-white hover:text-emerald-300 transition-colors">
                          {art.title}
                        </h4>
                        <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">{art.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Active View: GAMJI WEEKLY (Flagship 10-Section Structure) */}
          {activeViewMode === 'weekly' && (
            <div className="bento-card p-8 space-y-8">
              {/* Publication Header */}
              <div className="border-b border-white/10 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase">
                      GAMJI WEEKLY • EDITION #{currentEdition.editionNumber}
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="text-xs text-white/50 font-mono">{currentEdition.date}</span>
                  </div>
                  <AudioPlayer textToRead={newsletterAudioText} title={currentEdition.title} />
                </div>

                <h2 className="text-3xl font-bold text-white font-display tracking-tight">
                  Nigeria’s AI, Innovation, Education & Opportunity Intelligence
                </h2>
                <p className="text-sm text-white/60 leading-relaxed">
                  Curated and autonomously verified by Gamji Scout, Verify, and Brain Agents for Gamji Mines & Educational Services.
                </p>
              </div>

              {/* SECTION 01 — THE BIG STORY */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <span className="bento-pill-accent text-[10px]">
                    01 — THE BIG STORY
                  </span>
                  <span className="text-white/50 font-mono">Flagship Analysis</span>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-5">
                  <div className="flex flex-col md:flex-row gap-6">
                    {bigStory.imageUrl && (
                      <img
                        src={bigStory.imageUrl}
                        alt={bigStory.title}
                        className="w-full md:w-64 h-44 object-cover rounded-2xl border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="space-y-2.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="bento-pill text-[10px]">
                          {bigStory.category}
                        </span>
                        <span className="text-[10px] font-mono text-white/40">
                          {bigStory.readTimeMinutes} min read
                        </span>
                      </div>
                      <h3
                        onClick={() => onSelectArticle(bigStory)}
                        className="text-xl font-bold text-white hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        {bigStory.title}
                      </h3>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {bigStory.summary}
                      </p>
                    </div>
                  </div>

                  {/* Why it matters to Nigeria callout */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border-l-4 border-emerald-400 space-y-1">
                    <span className="text-[11px] font-bold text-emerald-400 font-mono flex items-center gap-1.5 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      WHY THIS MATTERS TO NIGERIA
                    </span>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {bigStory.nigerianRelevance}
                    </p>
                  </div>

                  {/* Possible Nigerian Applications */}
                  {bigStory?.possibleNigerianApplications && bigStory.possibleNigerianApplications.length > 0 && (
                    <div className="space-y-2">
                      <span className="bento-meta">
                        Target Applications:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
                        {bigStory.possibleNigerianApplications.map((app, i) => (
                          <li key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => onSelectArticle(bigStory)}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer pt-2"
                  >
                    <span>Read Full Intelligence Breakdown & Verification Matrix</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* SECTION 02 & 03 — AI ENGINEER'S DESK & NIGERIA INNOVATION WATCH */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 02 AI Engineer's Desk */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 flex flex-col justify-between hover:border-white/15 transition-all">
                  <div>
                    <div className="bento-meta text-cyan-400 mb-2">
                      02 — AI ENGINEER’S DESK
                    </div>
                    <h4 className="text-base font-bold text-white">
                      {articles[1]?.title || 'Hausa-LLaMA & Edge Quantization in Secondary Schools'}
                    </h4>
                    <p className="text-xs text-white/60 mt-2 line-clamp-3 leading-relaxed">
                      {articles[1]?.summary || 'Fine-tuning lightweight open weights models for offline deployment on low-cost single board computers.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectArticle(articles[1] || bigStory)}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer pt-3"
                  >
                    <span>View Engineering Architecture</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 03 Nigeria Innovation Watch */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 flex flex-col justify-between hover:border-white/15 transition-all">
                  <div>
                    <div className="bento-meta text-amber-400 mb-2">
                      03 — NIGERIA INNOVATION WATCH
                    </div>
                    <h4 className="text-base font-bold text-white">
                      {articles[3]?.title || 'AgriVision: Early Crop Pest Detection via WhatsApp'}
                    </h4>
                    <p className="text-xs text-white/60 mt-2 line-clamp-3 leading-relaxed">
                      {articles[3]?.summary || 'Delivering on-device computer vision diagnostics to smallholder tomato and grain farmers in Kano and Kaduna.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectArticle(articles[3] || bigStory)}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer pt-3"
                  >
                    <span>Inspect Innovation Case Study</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* SECTION 04 & 05 — MINING & EDUCATION INTELLIGENCE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 04 Mining Intelligence */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <div className="bento-meta text-emerald-400">
                    04 — MINING INTELLIGENCE
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                    <span className="bento-meta text-emerald-400 block mb-1">
                      MINERAL OF THE WEEK
                    </span>
                    <strong className="text-sm text-white">
                      Lithium (Spodumene / Lepidolite)
                    </strong>
                    <p className="text-white/70 text-xs mt-1.5 leading-relaxed">
                      Nasarawa, Kaduna, Kogi, and Ekiti pegmatites subject to mandatory local processing.
                    </p>
                  </div>
                </div>

                {/* 05 Education Intelligence */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <div className="bento-meta text-purple-400">
                    05 — EDUCATION INTELLIGENCE
                  </div>
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
                    <span className="bento-meta text-purple-300 block mb-1">
                      NITDA 3MTT COHORT 3
                    </span>
                    <strong className="text-sm text-white">
                      50,000 New Fellows in AI & Solid Mineral Geosciences
                    </strong>
                    <p className="text-white/70 text-xs mt-1.5 leading-relaxed">
                      Free laptops, monthly internet allowance, and direct internship placement.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 06 — OPPORTUNITY RADAR */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="bento-meta text-teal-400">
                    06 — OPPORTUNITY RADAR (TOP CALLS & GRANTS)
                  </div>
                  <span className="text-[11px] font-mono text-white/40">
                    {relatedOpportunities.length} Verified Calls
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {relatedOpportunities.map((opp, oppIdx) => (
                    <div key={`${opp.id}-${oppIdx}`} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 flex flex-col justify-between hover:border-white/15 transition-all">
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-1">
                          <span>{opp.category.toUpperCase()}</span>
                          <span className="text-white/40">Deadline: {opp.deadline}</span>
                        </div>
                        <h5 className="text-xs font-bold text-white line-clamp-2">{opp.title}</h5>
                        <p className="text-[11px] text-white/50 mt-1">{opp.organization}</p>
                      </div>
                      <a
                        href={opp.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 pt-2 border-t border-white/5"
                      >
                        <span>Apply on Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 08 & 10 — BUILD CHALLENGE & HAUSA TECH CORNER */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 08 Build of the Week */}
                {bigStory.buildThis && (
                  <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-3">
                    <div className="bento-meta text-indigo-300">
                      08 — BUILD OF THE WEEK (MVP BLUEPRINT)
                    </div>
                    <h4 className="text-base font-bold text-indigo-100">{bigStory.buildThis.title}</h4>
                    <p className="text-xs text-indigo-200 leading-relaxed">{bigStory.buildThis.problem}</p>
                    <div className="text-[11px] font-mono text-indigo-300 pt-1">
                      <strong>Stack:</strong> {bigStory.buildThis.techStack.join(' • ')}
                    </div>
                  </div>
                )}

                {/* 10 Hausa Tech Corner */}
                {bigStory.hausaSummary && (
                  <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
                    <div className="bento-meta text-emerald-300 flex items-center justify-between">
                      <span>10 — SASHER FASAHAR HAUSA</span>
                      <Languages className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-bold text-emerald-100">{bigStory.hausaSummary.title}</h4>
                    <p className="text-xs text-emerald-200/90 leading-relaxed">{bigStory.hausaSummary.summary}</p>
                    <p className="text-[11px] text-emerald-300/80 italic">{bigStory.hausaSummary.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Active View: GAMJI DAILY */}
          {activeViewMode === 'daily' && (
            <div className="bento-card p-8 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">🇳🇬 GAMJI DAILY</span>
                  <span className="text-white/20">•</span>
                  <span className="text-xs text-white/50 font-mono">Tuesday, September 1, 2026</span>
                </div>
                <h2 className="text-2xl font-bold text-white font-display mt-1">
                  5 Things Worth Knowing in Nigeria Today
                </h2>
              </div>

              <div className="space-y-4">
                {articles.slice(0, 5).map((art, idx) => (
                  <div
                    key={art.id}
                    onClick={() => onSelectArticle(art)}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all cursor-pointer flex items-start gap-4"
                  >
                    <span className="text-base font-mono font-bold text-emerald-400 shrink-0">
                      0{idx + 1}
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="bento-pill text-[10px]">
                          {art.category}
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">{art.source.name}</span>
                      </div>
                      <h4 className="text-base font-bold text-white hover:text-emerald-300 transition-colors">
                        {art.title}
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed">{art.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 col: Newsletter Actions & Dispatch Control */}
        <div className="space-y-5">
          {/* Dispatch Simulation Bento Card */}
          <div className="bento-card p-6 space-y-4">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Newsletter Dispatch Engine</span>
            </h4>

            <div className="space-y-2.5 text-xs text-white/50 font-mono">
              <div className="flex justify-between">
                <span>EDITION:</span>
                <span className="text-white">{currentEdition.id}</span>
              </div>
              <div className="flex justify-between">
                <span>SUBSCRIBERS:</span>
                <span className="text-emerald-400 font-bold tabular-nums">2,418 readers</span>
              </div>
              <div className="flex justify-between">
                <span>CHANNELS:</span>
                <span className="text-white/80">Email, RSS & Web</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSimulateDispatch}
              disabled={dispatchStatus !== 'idle'}
              className={`w-full py-3 rounded-full font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                dispatchStatus === 'sent'
                  ? 'bg-emerald-600 text-white'
                  : dispatchStatus === 'sending'
                  ? 'bg-white/10 text-white/50'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
              }`}
            >
              {dispatchStatus === 'sending' && <span>Dispatching to 2,418 Subscribers...</span>}
              {dispatchStatus === 'sent' && (
                <>
                  <Check className="w-4 h-4" />
                  <span>Dispatched Successfully!</span>
                </>
              )}
              {dispatchStatus === 'idle' && (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Edition Now</span>
                </>
              )}
            </button>
          </div>

          {/* Export & Developer Tools Bento Card */}
          <div className="bento-card p-6 space-y-3.5">
            <span className="bento-meta block">Export & Distribution</span>

            <button
              type="button"
              onClick={handleCopyHtml}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {copiedHtml ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">HTML Code Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Clean HTML Email</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
          </div>

          {/* Past Editions Archive Bento Card */}
          <div className="bento-card p-6 space-y-3.5">
            <span className="bento-meta block">Editions Archive</span>
            <div className="space-y-2">
              {editions.map((ed) => (
                <div
                  key={ed.id}
                  onClick={() => setSelectedEditionId(ed.id)}
                  className={`p-3.5 rounded-2xl border text-xs transition-all cursor-pointer ${
                    selectedEditionId === ed.id
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                      : 'bg-white/[0.02] border-white/5 text-white/50 hover:text-white hover:border-white/15'
                  }`}
                >
                  <div className="font-semibold text-white truncate">{ed.title}</div>
                  <div className="text-[10px] text-white/40 font-mono mt-1">{ed.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
