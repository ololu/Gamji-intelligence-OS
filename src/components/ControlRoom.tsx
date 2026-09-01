import React, { useState } from 'react';
import {
  Radio,
  Compass,
  ShieldCheck,
  Cpu,
  Tag,
  Image as ImageIcon,
  Pickaxe,
  Radar,
  Languages,
  Send,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Play,
  RotateCw,
  Plus,
  ExternalLink,
  Layers,
  Sparkles,
  Zap,
  Sliders,
  ChevronRight,
  Eye,
  Check,
  X,
} from 'lucide-react';
import {
  AgentStatus,
  AutopilotMode,
  IntelligenceArticle,
  SourceRegistryItem,
} from '../types';

interface ControlRoomProps {
  agents: AgentStatus[];
  sources: SourceRegistryItem[];
  articles: IntelligenceArticle[];
  autopilotMode: AutopilotMode;
  setAutopilotMode: (mode: AutopilotMode) => void;
  onRunScout: (category?: string, prompt?: string) => void;
  onApproveArticle: (id: string) => void;
  onRejectArticle: (id: string) => void;
  onSelectArticle: (article: IntelligenceArticle) => void;
  onAddSource: (newSource: Omit<SourceRegistryItem, 'id' | 'totalArticlesDiscovered' | 'lastScoutedAt'>) => void;
  isScouting: boolean;
}

export const ControlRoom: React.FC<ControlRoomProps> = ({
  agents,
  sources,
  articles,
  autopilotMode,
  setAutopilotMode,
  onRunScout,
  onApproveArticle,
  onRejectArticle,
  onSelectArticle,
  onAddSource,
  isScouting,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Artificial Intelligence');
  const [customPrompt, setCustomPrompt] = useState('');
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'sources' | 'quality-gate'>('overview');

  // New source form state
  const [sourceName, setSourceName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourceFeedUrl, setSourceFeedUrl] = useState('');
  const [sourceCategory, setSourceCategory] = useState<any>('Mining & Minerals');
  const [sourceTrust, setSourceTrust] = useState<'high' | 'medium' | 'experimental'>('high');
  const [sourceFreq, setSourceFreq] = useState(6);

  // Sleep timeline steps
  const sleepTimeline = [
    { time: '11:30 PM', agent: 'Gamji Scout', action: 'Discovers 43 raw feeds & preprints across MSMD, ArXiv & NITDA', status: 'completed' },
    { time: '12:00 AM', agent: 'Deduplicator', action: 'Eliminates 18 duplicate wire articles using cosine similarity hashes', status: 'completed' },
    { time: '12:15 AM', agent: 'Gamji Auto-Tagger', action: 'Classifies 25 items across controlled 20-vertical Nigerian taxonomy', status: 'completed' },
    { time: '12:30 AM', agent: 'Gamji Verify', action: 'Evaluates source authenticity, official gazette checks & corroboration', status: 'completed' },
    { time: '01:00 AM', agent: 'Gamji Brain', action: 'Synthesizes "Why it matters to Nigeria" & drafts "Build This" MVP concepts', status: 'completed' },
    { time: '01:30 AM', agent: 'Image Curator', action: 'Pairs high-resolution licensed geological & technological editorial media', status: 'completed' },
    { time: '02:15 AM', agent: 'Hausa Translator', action: 'Translates technical briefings into natural Hausa (Koyon Fasaha)', status: 'completed' },
    { time: '03:00 AM', agent: 'Quality Gate', action: 'Scores confidence (96/100), checks risk levels, auto-approves verified items', status: 'completed' },
    { time: '06:00 AM', agent: 'Newsletter Dispatcher', action: 'Compiles GAMJI DAILY & personalized editions for 2,418 subscribers', status: 'running' },
  ];

  const pendingArticles = articles.filter((a) => a.qualityGate.status === 'review_required');
  const publishedArticles = articles.filter((a) => a.qualityGate.status === 'published');

  const getAgentIcon = (name: string) => {
    switch (name) {
      case 'Compass': return Compass;
      case 'ShieldCheck': return ShieldCheck;
      case 'Cpu': return Cpu;
      case 'Tag': return Tag;
      case 'Image': return ImageIcon;
      case 'Pickaxe': return Pickaxe;
      case 'Radar': return Radar;
      case 'Languages': return Languages;
      case 'Send': return Send;
      default: return Sparkles;
    }
  };

  const handleSourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceName || !sourceUrl) return;
    onAddSource({
      name: sourceName,
      url: sourceUrl,
      feedUrl: sourceFeedUrl || sourceUrl,
      category: sourceCategory,
      country: 'Nigeria',
      trustLevel: sourceTrust,
      updateFrequencyHours: Number(sourceFreq),
      status: 'active',
    });
    setSourceName('');
    setSourceUrl('');
    setSourceFeedUrl('');
    setShowAddSourceModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Autopilot Intelligence Status Bento Tile */}
      <div className="bento-card-gradient p-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-56 h-56 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                AUTONOMOUS OS ONLINE
              </span>
              <span className="text-white/40 text-xs font-mono">Edge Cloudflare & Worker Cron</span>
            </div>
            <h2 className="text-3xl font-bold text-white font-display tracking-tight">
              Gamji Intelligence Control Room
            </h2>
            <p className="text-white/60 text-sm mt-1.5 max-w-2xl leading-relaxed">
              Real-time monitoring of 9 autonomous AI agents discovering, verifying, translating, and distributing Nigeria’s knowledge, mining, and educational opportunities.
            </p>
          </div>

          {/* Autopilot Mode Selector Bento Pill Card */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col gap-2.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/50 flex items-center justify-between">
              <span>Operating Mode</span>
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {(['manual', 'assisted', 'trusted', 'autopilot'] as AutopilotMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setAutopilotMode(mode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    autopilotMode === mode
                      ? 'bg-emerald-500 text-stone-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                      : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-white/40 max-w-xs">
              {autopilotMode === 'manual' && 'Manual: No story or newsletter publishes without human sign-off.'}
              {autopilotMode === 'assisted' && 'Assisted: AI prepares drafts and tags; you one-click approve.'}
              {autopilotMode === 'trusted' && 'Trusted: Stories with >92% confidence auto-publish.'}
              {autopilotMode === 'autopilot' && 'Autopilot: Full 24/7 autonomous discovery, verification, and dispatch.'}
            </p>
          </div>
        </div>

        {/* Live Counters Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mt-8 pt-6 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="bento-meta">Sources Ingested</span>
            <div className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">{sources.length} <span className="text-xs text-white/40 font-normal">active</span></div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="bento-meta">Active Agents</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-1 tabular-nums">9 <span className="text-xs text-emerald-500/70 font-normal">running</span></div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="bento-meta">Articles Today</span>
            <div className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">{articles.length + 81}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="bento-meta">AI Verified</span>
            <div className="text-2xl font-bold text-emerald-300 font-mono mt-1 tabular-nums">97.4%</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="bento-meta">Awaiting Review</span>
            <div className="text-2xl font-bold text-amber-400 font-mono mt-1 tabular-nums">{pendingArticles.length}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="bento-meta">Subscribers</span>
            <div className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">2,418</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="bento-meta">Opportunities</span>
            <div className="text-2xl font-bold text-teal-400 font-mono mt-1 tabular-nums">37 <span className="text-xs text-teal-500/70 font-normal">live</span></div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bento Segmented Bar */}
      <div className="flex items-center gap-2 bg-white/[0.02] p-1.5 rounded-2xl border border-white/5 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-white/15 text-white border border-white/15 shadow-sm'
              : 'text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          24h Autonomous Pipeline & Timeline
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('agents')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'agents'
              ? 'bg-white/15 text-white border border-white/15 shadow-sm'
              : 'text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          Agents Matrix (9 Active)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('sources')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'sources'
              ? 'bg-white/15 text-white border border-white/15 shadow-sm'
              : 'text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          Source Registry ({sources.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('quality-gate')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'quality-gate'
              ? 'bg-white/15 text-white border border-white/15 shadow-sm'
              : 'text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>Quality Gate</span>
          {pendingArticles.length > 0 && (
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
              {pendingArticles.length}
            </span>
          )}
        </button>
      </div>

      {/* Tab: Overview (Interactive Bento Timeline + Quick Scout Launcher) */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: "What happens while you sleep?" Timeline Bento Card */}
          <div className="lg:col-span-2 bento-card p-7">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="bento-meta block mb-1">Autonomous Execution Schedule</span>
                <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span>24h Edge Intelligence Cycle</span>
                </h3>
              </div>
              <span className="bento-pill-accent font-mono text-[11px]">
                Active Cycle: 06:00 WAT
              </span>
            </div>

            <div className="relative pl-6 border-l-2 border-white/10 space-y-4">
              {sleepTimeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline bullet */}
                  <div className="absolute -left-[31px] top-2 h-3.5 w-3.5 rounded-full bg-[#050505] border-2 border-emerald-400 group-hover:scale-125 transition-transform" />
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-emerald-400 font-bold tabular-nums">{item.time}</span>
                      <span className="bento-pill text-[10px] font-mono">
                        {item.agent}
                      </span>
                    </div>
                    <p className="text-xs text-white/80 mt-1.5 font-medium leading-relaxed">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Instant Scout Trigger Bento Box */}
          <div className="bento-card p-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="bento-meta block">On-Demand Dispatch</span>
                  <h3 className="text-base font-bold text-white font-display">
                    Trigger AI Scout
                  </h3>
                </div>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-1.5">
                    Focus Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Artificial Intelligence" className="bg-[#111]">Artificial Intelligence</option>
                    <option value="Mining & Minerals" className="bg-[#111]">Mining & Minerals (Solid Minerals)</option>
                    <option value="Education & EdTech" className="bg-[#111]">Education & EdTech</option>
                    <option value="Agriculture & AgriTech" className="bg-[#111]">Agriculture & AgriTech</option>
                    <option value="Renewable Energy" className="bg-[#111]">Renewable Energy</option>
                    <option value="Research & Science" className="bg-[#111]">Research & Science (ABU, UNILAG)</option>
                    <option value="Hausa Tech" className="bg-[#111]">Hausa Tech (Koyon Fasaha)</option>
                    <option value="Scholarships & Grants" className="bg-[#111]">Scholarships & Grants</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/50 mb-1.5">
                    Custom Prompt (Optional)
                  </label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g. Lithium pegmatites discovery in Kaduna and Nasarawa state with local processing requirements..."
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/25 focus:border-emerald-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={() => onRunScout(selectedCategory, customPrompt)}
                disabled={isScouting}
                className={`w-full py-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isScouting
                    ? 'bg-white/10 text-white/50 cursor-not-allowed'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                }`}
              >
                {isScouting ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-stone-950" />
                    <span>Scouting Pipeline Active...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Launch AI Scout Pipeline</span>
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-white/10 text-[11px] text-white/50 space-y-2 font-mono">
                <div className="flex items-center justify-between">
                  <span>MODEL:</span>
                  <span className="text-white/80">Gemini 3.7 Flash</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>CORROBORATION:</span>
                  <span className="text-emerald-400">Multi-Source Gazette</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>TAXONOMY:</span>
                  <span className="text-white/80">Controlled 20-Vertical</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Agents Matrix Bento Grid */}
      {activeTab === 'agents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => {
            const Icon = getAgentIcon(agent.iconName);
            return (
              <div
                key={agent.id}
                className="bento-card p-6 flex flex-col justify-between hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-mono px-3 py-1 rounded-full flex items-center gap-1.5 ${
                        agent.status === 'active' || agent.status === 'running'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-white/5 text-white/50 border border-white/10'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          agent.status === 'running'
                            ? 'bg-emerald-400 animate-ping'
                            : agent.status === 'active'
                            ? 'bg-emerald-500'
                            : 'bg-stone-500'
                        }`}
                      />
                      {agent.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white font-display">{agent.name}</h4>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">{agent.code}</span>
                  <p className="text-xs text-white/60 leading-relaxed">{agent.role}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 text-[11px] space-y-2">
                  <div className="text-white/80 font-mono text-[10px] truncate">
                    <span className="text-white/40">TASK: </span>
                    {agent.currentTask || 'Idle'}
                  </div>
                  <div className="flex items-center justify-between text-white/50 text-[10px] font-mono">
                    <span>PROCESSED: <strong className="text-white tabular-nums">{agent.itemsProcessedToday}</strong></span>
                    <span>{agent.lastActivity}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: Source Registry Bento Card */}
      {activeTab === 'sources' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="bento-meta block">Trusted Endpoints</span>
              <h3 className="text-lg font-bold text-white font-display">Gamji Source Registry</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAddSourceModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Source</span>
            </button>
          </div>

          <div className="bento-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.02] text-white/40 font-mono uppercase text-[10px] tracking-widest border-b border-white/10">
                  <tr>
                    <th className="p-4">Source Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Trust Level</th>
                    <th className="p-4">Frequency</th>
                    <th className="p-4">Items Found</th>
                    <th className="p-4">Last Scouted</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/70">
                  {sources.map((src) => (
                    <tr key={src.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <span>{src.name}</span>
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-emerald-400 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        <span className="text-[10px] text-white/40 font-mono">{src.country}</span>
                      </td>
                      <td className="p-4">
                        <span className="bento-pill text-[10px]">
                          {src.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono ${
                            src.trustLevel === 'high'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {src.trustLevel.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-white/50">Every {src.updateFrequencyHours}h</td>
                      <td className="p-4 font-mono text-white font-bold tabular-nums">{src.totalArticlesDiscovered}</td>
                      <td className="p-4 text-white/50">{src.lastScoutedAt}</td>
                      <td className="p-4 text-right">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30 font-semibold">
                          ACTIVE
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Quality Gate */}
      {activeTab === 'quality-gate' && (
        <div className="space-y-4">
          <div>
            <span className="bento-meta block">Verification Sentinel</span>
            <h3 className="text-lg font-bold text-white font-display">Gamji Quality Gate</h3>
          </div>

          {pendingArticles.length === 0 ? (
            <div className="bento-card p-10 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-white font-display">Quality Gate Clear</h4>
              <p className="text-xs text-white/50 max-w-md mx-auto leading-relaxed">
                All discovered articles have passed confidence and gazette verification thresholds and are automatically published to the Newsletter Hub.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingArticles.map((art) => (
                <div
                  key={art.id}
                  className="bento-card p-6 border-amber-500/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                        REVIEW REQUIRED
                      </span>
                      <span className="text-xs font-mono text-white/50">{art.category}</span>
                    </div>
                    <h4 className="text-base font-bold text-white">{art.title}</h4>
                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">{art.summary}</p>
                    <div className="flex items-center gap-4 text-[11px] font-mono text-white/40 pt-1">
                      <span>CONFIDENCE: <strong className="text-emerald-400 tabular-nums">{art.verification.confidenceScore}%</strong></span>
                      <span>SOURCE TRUST: <strong className="text-white/80 tabular-nums">{art.verification.sourceTrust}%</strong></span>
                      <span>RISK: <strong className="text-amber-400 uppercase">{art.qualityGate.riskLevel}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onSelectArticle(art)}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onApproveArticle(art.id)}
                      className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRejectArticle(art.id)}
                      className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 border border-white/10 text-xs cursor-pointer transition-colors"
                      title="Reject"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal: Add Source Bento Modal */}
      {showAddSourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/80 backdrop-blur-md">
          <div className="w-full max-w-lg bento-card p-8 bg-[#111] border-white/15 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="bento-meta block">Crawler Configuration</span>
                <h3 className="text-lg font-bold text-white font-display">
                  Register Source Endpoint
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddSourceModal(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSourceSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-white/70 font-medium mb-1.5">Source Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nigerian Geological Survey Agency (NGSA)"
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white/70 font-medium mb-1.5">Website URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://ngsa.gov.ng"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white/70 font-medium mb-1.5">RSS / API Feed URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://ngsa.gov.ng/feed"
                  value={sourceFeedUrl}
                  onChange={(e) => setSourceFeedUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-medium mb-1.5">Category</label>
                  <select
                    value={sourceCategory}
                    onChange={(e) => setSourceCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Mining & Minerals" className="bg-[#111]">Mining & Minerals</option>
                    <option value="Artificial Intelligence" className="bg-[#111]">Artificial Intelligence</option>
                    <option value="AI Engineering" className="bg-[#111]">AI Engineering</option>
                    <option value="Education & EdTech" className="bg-[#111]">Education & EdTech</option>
                    <option value="Agriculture & AgriTech" className="bg-[#111]">Agriculture & AgriTech</option>
                    <option value="Research & Science" className="bg-[#111]">Research & Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 font-medium mb-1.5">Trust Level</label>
                  <select
                    value={sourceTrust}
                    onChange={(e) => setSourceTrust(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="high" className="bg-[#111]">High (Official Govt / University)</option>
                    <option value="medium" className="bg-[#111]">Medium (Reputable Media)</option>
                    <option value="experimental" className="bg-[#111]">Experimental</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddSourceModal(false)}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold shadow-md"
                >
                  Add Source to Registry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
