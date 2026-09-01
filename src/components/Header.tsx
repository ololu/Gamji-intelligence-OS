import React from 'react';
import {
  Compass,
  Cpu,
  Pickaxe,
  Radar,
  GraduationCap,
  Sparkles,
  Layers,
  Languages,
  Radio,
  Send,
  Zap,
  Users,
  Clock,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { AutopilotMode, SubscriberProfile } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRunScout?: () => void;
  isScouting?: boolean;
  subscriber?: SubscriberProfile;
  onOpenSubscriberModal?: () => void;
  autopilotMode?: AutopilotMode;
  articleCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onRunScout,
  isScouting = false,
  subscriber,
  onOpenSubscriberModal,
  autopilotMode = 'autopilot',
  articleCount = 42,
}) => {
  const tabs = [
    { id: 'control-room', label: 'Control Room', icon: Radio, badge: '9 Active' },
    { id: 'newsletter', label: 'Newsletters', altId: 'newsletters', icon: Send, badge: 'Daily & Weekly' },
    { id: 'opportunity-radar', label: 'Opportunity Radar', altId: 'opportunities', icon: Radar, badge: '37 Live' },
    { id: 'market-trends', label: 'Market Trends', altId: 'trends', icon: TrendingUp, badge: 'Recharts' },
    { id: 'mineral-map', label: 'Mineral Deposit Map', altId: 'mines-map', icon: Globe, badge: 'D3 Spatial' },
    { id: 'mines', label: 'Mines Intelligence', icon: Pickaxe, badge: 'Solid Minerals' },
    { id: 'ai-engineer', label: "AI Engineer's Desk", icon: Cpu, badge: 'MVP Blueprints' },
    { id: 'hausa-tech', label: 'Hausa Tech', icon: Languages, badge: 'Koyon Fasaha' },
    { id: 'ask-gamji', label: 'Gamji Ask', altId: 'gamji-ask', icon: Sparkles, badge: 'RAG' },
    { id: 'build-lab', label: 'Build Lab', icon: Layers, badge: 'Incubator' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl">
      {/* Top Bento System Telemetry Bar */}
      <div className="border-b border-white/5 bg-white/[0.02] px-4 py-2 text-xs text-white/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>AUTONOMOUS ENGINE ONLINE</span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="text-xs text-white/50 hidden md:inline font-sans">
              Gamji Mines & Educational Services · Nigeria
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <div className="hidden lg:flex items-center gap-2 text-white/40">
              <Clock className="w-3.5 h-3.5 text-white/30" />
              <span>WAT: <strong className="text-white/80 tabular-nums">06:29 AM</strong></span>
            </div>
            
            <div className="bg-white/5 px-3 py-1 rounded-full border border-white/10 text-white/70 flex items-center gap-1.5">
              <span className="text-white/40 uppercase tracking-widest text-[9px]">MODE:</span>
              <span className="text-emerald-400 font-semibold uppercase">{autopilotMode}</span>
            </div>

            {onOpenSubscriberModal && (
              <button
                type="button"
                onClick={onOpenSubscriberModal}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white/90 transition-colors cursor-pointer"
              >
                <Users className="w-3 h-3 text-emerald-400" />
                <span className="font-sans text-xs">Profile: {subscriber?.name?.split(' ')[0] || 'Subscriber'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Brand & Action Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center justify-between">
          <div
            onClick={() => setActiveTab('control-room')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 p-1 flex items-center justify-center transition-transform group-hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <span className="font-mono font-black text-emerald-400 text-base tracking-tighter">
                GM
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white font-display">
                  GAMJI<span className="text-emerald-400">OS</span>
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/10">
                  v4.2.0 Edge
                </span>
              </div>
              <p className="text-[11px] text-white/40 uppercase tracking-widest font-mono">
                Nigeria Knowledge & Mining Intelligence
              </p>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            {onRunScout && (
              <button
                type="button"
                onClick={onRunScout}
                disabled={isScouting}
                className="p-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-semibold transition-all cursor-pointer"
              >
                <Zap className={`w-4 h-4 ${isScouting ? 'animate-spin' : 'fill-current'}`} />
              </button>
            )}
          </div>
        </div>

        {/* Action Bento Pills */}
        <div className="hidden md:flex items-center gap-3">
          {onRunScout && (
            <button
              type="button"
              onClick={onRunScout}
              disabled={isScouting}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-semibold text-xs transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer disabled:opacity-50"
            >
              <Zap className={`w-3.5 h-3.5 ${isScouting ? 'animate-spin' : 'fill-current'}`} />
              <span>{isScouting ? 'Scouting Feeds...' : 'Trigger AI Scout'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('ask-gamji')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white/90 border border-white/10 text-xs font-medium transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Ask Gamji RAG</span>
          </button>
        </div>
      </div>

      {/* Bento Pill Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3">
        <nav className="flex space-x-1.5 overflow-x-auto no-scrollbar py-1 text-xs font-medium bg-white/[0.02] p-1.5 rounded-2xl border border-white/5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id || (tab.altId && activeTab === tab.altId);
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/15 text-white border border-white/20 shadow-sm font-semibold'
                    : 'text-white/50 hover:text-white/90 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-white/40'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/5 text-white/40'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

