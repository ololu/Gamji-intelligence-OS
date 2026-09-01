import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  Pickaxe,
  Calendar,
  Filter,
  DollarSign,
  MapPin,
  Flame,
  ArrowUpRight,
  Layers,
  Search,
  Sparkles,
  Info,
  Download,
  CheckCircle2,
  Cpu,
  Globe,
} from 'lucide-react';
import { OpportunityItem } from '../types';

interface MarketTrendsProps {
  opportunities?: OpportunityItem[];
  onSelectOpportunity?: (opp: OpportunityItem) => void;
}

// Historical and projected frequency time-series for Nigerian Mined Mineral Opportunities
const HISTORICAL_FREQUENCY_DATA = [
  { period: 'Q1 2024', lithium: 4, tin: 6, gold: 8, tantalite: 3, leadZinc: 5, total: 26, dealValueM: 45, beneficiationShare: 18 },
  { period: 'Q2 2024', lithium: 7, tin: 8, gold: 9, tantalite: 4, leadZinc: 6, total: 34, dealValueM: 78, beneficiationShare: 24 },
  { period: 'Q3 2024', lithium: 12, tin: 9, gold: 11, tantalite: 6, leadZinc: 7, total: 45, dealValueM: 115, beneficiationShare: 32 },
  { period: 'Q4 2024', lithium: 18, tin: 11, gold: 12, tantalite: 8, leadZinc: 8, total: 57, dealValueM: 160, beneficiationShare: 41 },
  { period: 'Q1 2025', lithium: 24, tin: 14, gold: 14, tantalite: 11, leadZinc: 9, total: 72, dealValueM: 230, beneficiationShare: 52 },
  { period: 'Q2 2025', lithium: 31, tin: 16, gold: 16, tantalite: 13, leadZinc: 11, total: 87, dealValueM: 310, beneficiationShare: 59 },
  { period: 'Q3 2025', lithium: 39, tin: 19, gold: 18, tantalite: 15, leadZinc: 12, total: 103, dealValueM: 420, beneficiationShare: 66 },
  { period: 'Q4 2025', lithium: 48, tin: 22, gold: 21, tantalite: 18, leadZinc: 14, total: 123, dealValueM: 540, beneficiationShare: 73 },
  { period: 'Q1 2026', lithium: 56, tin: 25, gold: 23, tantalite: 21, leadZinc: 16, total: 141, dealValueM: 680, beneficiationShare: 79 },
  { period: 'Q2 2026 (Est)', lithium: 65, tin: 28, gold: 26, tantalite: 24, leadZinc: 18, total: 161, dealValueM: 810, beneficiationShare: 84 },
];

const STATE_DISTRIBUTION_DATA = [
  { state: 'Nasarawa', count: 48, topMineral: 'Lithium & Barite', share: 29.8, investmentM: 340, color: '#10b981' },
  { state: 'Kaduna', count: 36, topMineral: 'Lithium, Gold & Nickel', share: 22.4, investmentM: 280, color: '#06b6d4' },
  { state: 'Plateau', count: 26, topMineral: 'Tin (Cassiterite) & Columbite', share: 16.1, investmentM: 145, color: '#8b5cf6' },
  { state: 'Kogi', count: 20, topMineral: 'Iron Ore & Coal', share: 12.4, investmentM: 120, color: '#f59e0b' },
  { state: 'Niger', count: 14, topMineral: 'Gold & Lithium', share: 8.7, investmentM: 85, color: '#ec4899' },
  { state: 'Zamfara', count: 10, topMineral: 'Gold & Lead-Zinc', share: 6.2, investmentM: 55, color: '#6366f1' },
  { state: 'Oyo / Osun', count: 7, topMineral: 'Lithium & Gemstones', share: 4.4, investmentM: 40, color: '#14b8a6' },
];

const VALUE_CHAIN_DISTRIBUTION = [
  { name: 'Domestic Beneficiation & Smelting', value: 42, color: '#10b981' },
  { name: 'Exploration & Concession Licenses', value: 24, color: '#06b6d4' },
  { name: 'Tech, Spectrometry & IoT Telemetry', value: 18, color: '#8b5cf6' },
  { name: 'Government Subsidies & SMDF Grants', value: 11, color: '#f59e0b' },
  { name: 'ESG & Artisanal Miner Cooperatives', value: 5, color: '#ec4899' },
];

const MINERAL_METRICS = [
  {
    name: 'Lithium (Spodumene/Pegmatite)',
    velocity: '+310% YoY',
    totalOpportunities: 84,
    avgGrantValue: '$1.4M',
    leadState: 'Nasarawa & Kaduna',
    color: '#10b981',
    description: 'Surging demand triggered by Nigerian export ban on raw ores and federal incentives for domestic cathode precursors.',
  },
  {
    name: 'Tin (Cassiterite)',
    velocity: '+85% YoY',
    totalOpportunities: 38,
    avgGrantValue: '$650K',
    leadState: 'Plateau & Bauchi',
    color: '#06b6d4',
    description: 'High-purity smelting facility tenders and sustainable alluvial reclamation initiatives in the Jos plateau basin.',
  },
  {
    name: 'Gold & Precious Metals',
    velocity: '+62% YoY',
    totalOpportunities: 32,
    avgGrantValue: '$900K',
    leadState: 'Zamfara, Niger, Kaduna',
    color: '#f59e0b',
    description: 'Formalization grants via Presidential Artisanal Gold Mining Development Initiative (PAGMI) and refinery concessions.',
  },
  {
    name: 'Tantalite & Columbite',
    velocity: '+140% YoY',
    totalOpportunities: 26,
    avgGrantValue: '$820K',
    leadState: 'Nasarawa, Kogi, Kwara',
    color: '#8b5cf6',
    description: 'Semiconductor electronics capacitor supply chain agreements and strategic defense mineral stockpile bids.',
  },
];

const OPPORTUNITY_FEED_DATA = [
  {
    id: 'mkt-opp-1',
    title: 'SMDF $25M Nasarawa Lithium Beneficiation Co-Investment Facility',
    mineral: 'Lithium',
    state: 'Nasarawa',
    type: 'Co-Investment Grant',
    value: '$25,000,000',
    deadline: 'Oct 30, 2026',
    status: 'Active',
    stage: 'Beneficiation',
  },
  {
    id: 'mkt-opp-2',
    title: 'Plateau Cassiterite & Tin Smelting Modernization Tech RFP',
    mineral: 'Tin',
    state: 'Plateau',
    type: 'Procurement / Tech RFP',
    value: '$4,200,000',
    deadline: 'Nov 15, 2026',
    status: 'Active',
    stage: 'Processing & Tech',
  },
  {
    id: 'mkt-opp-3',
    title: 'Federal Ministry of Solid Minerals Cadastre Concession Round 2026',
    mineral: 'Multi-Mineral',
    state: 'Kaduna, Niger, Kogi',
    type: 'Concession License Auction',
    value: 'Licensing Round',
    deadline: 'Dec 12, 2026',
    status: 'Upcoming',
    stage: 'Exploration',
  },
  {
    id: 'mkt-opp-4',
    title: 'PAGMI Artisanal Gold Traceability & IoT Assay Grant',
    mineral: 'Gold',
    state: 'Zamfara / Niger',
    type: 'Gov Innovation Grant',
    value: '$1,800,000',
    deadline: 'Oct 18, 2026',
    status: 'Active',
    stage: 'IoT & Traceability',
  },
  {
    id: 'mkt-opp-5',
    title: 'Tantalite Oxide Purity Beneficiation Pilot Cohort',
    mineral: 'Tantalite',
    state: 'Kogi / Kwara',
    type: 'Research & Scale Grant',
    value: '$3,500,000',
    deadline: 'Jan 10, 2027',
    status: 'Open',
    stage: 'Beneficiation',
  },
];

export const MarketTrends: React.FC<MarketTrendsProps> = ({ opportunities, onSelectOpportunity }) => {
  const [timeframe, setTimeframe] = useState<'all' | '1y' | '6m'>('all');
  const [selectedMineral, setSelectedMineral] = useState<string>('all');
  const [chartMetric, setChartMetric] = useState<'frequency' | 'dealValue' | 'beneficiation'>('frequency');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered time series based on timeframe
  const filteredTimeSeries = useMemo(() => {
    if (timeframe === '6m') {
      return HISTORICAL_FREQUENCY_DATA.slice(-4);
    }
    if (timeframe === '1y') {
      return HISTORICAL_FREQUENCY_DATA.slice(-6);
    }
    return HISTORICAL_FREQUENCY_DATA;
  }, [timeframe]);

  // Filtered opportunities feed
  const filteredFeed = useMemo(() => {
    return OPPORTUNITY_FEED_DATA.filter((item) => {
      const matchMineral =
        selectedMineral === 'all' || item.mineral.toLowerCase().includes(selectedMineral.toLowerCase());
      const matchQuery =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchMineral && matchQuery;
    });
  }, [selectedMineral, searchQuery]);

  // Custom Chart Tooltip in Bento style
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3.5 rounded-2xl bg-[#111111]/95 border border-white/15 shadow-2xl backdrop-blur-xl text-xs space-y-1.5 font-sans">
          <div className="font-mono font-bold text-white text-[11px] border-b border-white/10 pb-1 flex items-center justify-between gap-4">
            <span>{label}</span>
            <span className="text-emerald-400">Quarterly Matrix</span>
          </div>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 text-[11px]">
              <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="capitalize">{entry.name}:</span>
              </span>
              <span className="font-mono font-bold text-white">
                {chartMetric === 'dealValue' && entry.name === 'dealValueM' ? `$${entry.value}M` : `${entry.value}`}
                {chartMetric === 'beneficiation' && entry.name === 'beneficiationShare' ? '%' : ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header Bento Banner */}
      <div className="bento-card-gradient p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bento-pill-accent text-[11px] font-mono font-bold">
              SOLID MINERALS RADAR
            </span>
            <span className="text-white/40 text-xs font-mono">Real-Time Frequency Analysis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
            Nigerian Mined Minerals Market Trends
          </h2>
          <p className="text-xs sm:text-sm text-white/60 max-w-2xl mt-1.5 leading-relaxed">
            Autonomous intelligence tracking frequency, deal velocity, state-by-state concessions, and beneficiation grants across Nigeria&apos;s critical solid mineral deposits.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-xs flex flex-col gap-0.5">
            <span className="bento-meta">Active Index:</span>
            <span className="text-emerald-400 font-bold font-mono">161 Tracked Calls (2024-2026)</span>
          </div>
        </div>
      </div>

      {/* 4 Summary KPI Bento Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bento-card p-5 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="bento-meta">Total Tracked Calls</span>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Pickaxe className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            161 <span className="text-xs text-emerald-400 font-sans font-normal">+18.4% QoQ</span>
          </div>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Live RFPs, concession auctions, and venture co-investments verified across 36 states.
          </p>
        </div>

        <div className="bento-card p-5 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="bento-meta">Leading Velocity Mineral</span>
            <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            Lithium <span className="text-xs text-cyan-400 font-sans font-normal">+310% YoY</span>
          </div>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Spodumene and pegmatite processing hubs accelerating in Nasarawa, Kaduna, and Oyo.
          </p>
        </div>

        <div className="bento-card p-5 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="bento-meta">Domestic Beneficiation</span>
            <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            79% <span className="text-xs text-purple-400 font-sans font-normal">of 2026 Calls</span>
          </div>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Shift away from raw ore exports toward on-soil refining and value addition facilities.
          </p>
        </div>

        <div className="bento-card p-5 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="bento-meta">Est. Capital Deployed</span>
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            $680M <span className="text-xs text-amber-400 font-sans font-normal">SMDF & Private</span>
          </div>
          <p className="text-[11px] text-white/50 leading-relaxed">
            Combined value of sovereign facilities, diaspora syndicates, and concession bids.
          </p>
        </div>
      </div>

      {/* Main Interactive Frequency Chart Section */}
      <div className="bento-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="bento-meta block text-emerald-400">HISTORICAL FREQUENCY & VELOCITY</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5 tracking-tight">
              Mined Mineral Opportunities Frequency Over Time (2024–2026)
            </h3>
            <p className="text-xs text-white/50 mt-1">
              Quarterly breakdown of announced exploration rights, processing tenders, and commercial co-investment grants.
            </p>
          </div>

          {/* Chart Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Metric Mode Toggle */}
            <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono">
              <button
                type="button"
                onClick={() => setChartMetric('frequency')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  chartMetric === 'frequency'
                    ? 'bg-emerald-500 text-black font-bold shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Frequency (Count)
              </button>
              <button
                type="button"
                onClick={() => setChartMetric('dealValue')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  chartMetric === 'dealValue'
                    ? 'bg-emerald-500 text-black font-bold shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Deal Volume ($M)
              </button>
              <button
                type="button"
                onClick={() => setChartMetric('beneficiation')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  chartMetric === 'beneficiation'
                    ? 'bg-emerald-500 text-black font-bold shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Beneficiation %
              </button>
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono">
              <button
                type="button"
                onClick={() => setTimeframe('all')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  timeframe === 'all' ? 'bg-white/20 text-white font-bold' : 'text-white/50 hover:text-white'
                }`}
              >
                All (10Q)
              </button>
              <button
                type="button"
                onClick={() => setTimeframe('1y')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  timeframe === '1y' ? 'bg-white/20 text-white font-bold' : 'text-white/50 hover:text-white'
                }`}
              >
                Last 1.5Y
              </button>
              <button
                type="button"
                onClick={() => setTimeframe('6m')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  timeframe === '6m' ? 'bg-white/20 text-white font-bold' : 'text-white/50 hover:text-white'
                }`}
              >
                Recent 1Y
              </button>
            </div>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="h-[360px] sm:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartMetric === 'frequency' ? (
              <AreaChart data={filteredTimeSeries} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="lithiumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="tinGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="tantaliteGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis
                  dataKey="period"
                  stroke="#ffffff40"
                  tick={{ fill: '#ffffff60', fontSize: 11, fontFamily: 'monospace' }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#ffffff40"
                  tick={{ fill: '#ffffff60', fontSize: 11, fontFamily: 'monospace' }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: '16px', fontSize: '12px', fontFamily: 'monospace' }}
                  formatter={(value) => <span className="text-white/80 capitalize">{value}</span>}
                />
                <Area
                  type="monotone"
                  dataKey="lithium"
                  name="Lithium"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#lithiumGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="tin"
                  name="Tin (Cassiterite)"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#tinGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="gold"
                  name="Gold"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#goldGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="tantalite"
                  name="Tantalite"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#tantaliteGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="leadZinc"
                  name="Lead & Zinc"
                  stroke="#ec4899"
                  strokeWidth={1.5}
                  fillOpacity={0.1}
                  fill="#ec4899"
                />
              </AreaChart>
            ) : chartMetric === 'dealValue' ? (
              <BarChart data={filteredTimeSeries} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis
                  dataKey="period"
                  stroke="#ffffff40"
                  tick={{ fill: '#ffffff60', fontSize: 11, fontFamily: 'monospace' }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#ffffff40"
                  tick={{ fill: '#ffffff60', fontSize: 11, fontFamily: 'monospace' }}
                  tickLine={false}
                  tickFormatter={(val) => `$${val}M`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '12px', fontFamily: 'monospace' }} />
                <Bar dataKey="dealValueM" name="dealValueM" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={filteredTimeSeries} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis
                  dataKey="period"
                  stroke="#ffffff40"
                  tick={{ fill: '#ffffff60', fontSize: 11, fontFamily: 'monospace' }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#ffffff40"
                  tick={{ fill: '#ffffff60', fontSize: 11, fontFamily: 'monospace' }}
                  tickLine={false}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '12px', fontFamily: 'monospace' }} />
                <Line
                  type="monotone"
                  dataKey="beneficiationShare"
                  name="beneficiationShare"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 5 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2-Column Bento Grid: State Density & Value Chain Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: State Density Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 bento-card p-6 sm:p-8 space-y-6">
          <div>
            <span className="bento-meta block text-cyan-400">GEOGRAPHIC DISTRIBUTION</span>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display mt-0.5">
              Opportunity Density by Nigerian State
            </h3>
            <p className="text-xs text-white/50 mt-1">
              Top mineral belts attracting federal concessions, private smelters, and exploration syndicates.
            </p>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={STATE_DISTRIBUTION_DATA}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 25, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="#ffffff40"
                  tick={{ fill: '#ffffff60', fontSize: 11, fontFamily: 'monospace' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="state"
                  stroke="#ffffff40"
                  tick={{ fill: '#ffffff90', fontSize: 11, fontFamily: 'monospace' }}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value: any, name: any, item: any) => [
                    `${value} Opportunities (${item.payload.topMineral}) • $${item.payload.investmentM}M Est.`,
                    'Volume',
                  ]}
                  contentStyle={{
                    backgroundColor: '#111111',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '16px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {STATE_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Key State Insights Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
              <span className="bento-meta block text-emerald-400">#1 Nasarawa</span>
              <span className="font-mono font-bold text-white">48 Deals (29.8%)</span>
              <span className="text-[10px] text-white/40 block mt-0.5">Lithium Belt Hub</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
              <span className="bento-meta block text-cyan-400">#2 Kaduna</span>
              <span className="font-mono font-bold text-white">36 Deals (22.4%)</span>
              <span className="text-[10px] text-white/40 block mt-0.5">Integrated Smelters</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
              <span className="bento-meta block text-purple-400">#3 Plateau</span>
              <span className="font-mono font-bold text-white">26 Deals (16.1%)</span>
              <span className="text-[10px] text-white/40 block mt-0.5">Jos Cassiterite Basin</span>
            </div>
          </div>
        </div>

        {/* Right Column: Value Chain Breakdown Donut Chart (5 Cols) */}
        <div className="lg:col-span-5 bento-card p-6 sm:p-8 space-y-6">
          <div>
            <span className="bento-meta block text-purple-400">VALUE CHAIN ALLOCATION</span>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display mt-0.5">
              Opportunity Focus by Segment
            </h3>
            <p className="text-xs text-white/50 mt-1">
              Percentage share of calls across value chain stages.
            </p>
          </div>

          <div className="h-[220px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={VALUE_CHAIN_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {VALUE_CHAIN_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val}% Share`, 'Segment']}
                  contentStyle={{
                    backgroundColor: '#111111',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '16px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Items */}
          <div className="space-y-2 text-xs">
            {VALUE_CHAIN_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-white/80">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Mineral Profiles & Velocity Deep Dives */}
      <div className="space-y-4">
        <div>
          <span className="bento-meta block text-amber-400">STRATEGIC ASSET PROFILES</span>
          <h3 className="text-xl font-bold text-white font-display tracking-tight">
            Top 4 Velocity Solid Minerals in Nigeria
          </h3>
          <p className="text-xs text-white/50 mt-1">
            Granular breakdown of key mineral opportunities, average grant value, and regulatory policy drivers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MINERAL_METRICS.map((min, idx) => (
            <div key={idx} className="bento-card p-6 space-y-3.5 relative overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                    {min.leadState}
                  </span>
                  <h4 className="text-base font-bold text-white font-display mt-0.5" style={{ color: min.color }}>
                    {min.name}
                  </h4>
                </div>
                <span className="bento-pill-accent text-xs font-mono font-bold" style={{ color: min.color }}>
                  {min.velocity}
                </span>
              </div>

              <p className="text-xs text-white/70 leading-relaxed">
                {min.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="bento-meta block">Active Calls:</span>
                  <span className="font-mono font-bold text-white text-sm">{min.totalOpportunities} Opportunities</span>
                </div>
                <div>
                  <span className="bento-meta block">Average Facility:</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">{min.avgGrantValue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Opportunities Feed & Concession Registry */}
      <div className="bento-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="bento-meta block text-emerald-400">REGISTRY & APPLICATION RADAR</span>
            <h3 className="text-xl font-bold text-white font-display mt-0.5 tracking-tight">
              Verified Solid Mineral Opportunity Calls
            </h3>
            <p className="text-xs text-white/50 mt-1">
              Filterable feed of upcoming deadlines, RFP tenders, and government matching facilities.
            </p>
          </div>

          {/* Search & Mineral Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search state, RFP, mineral..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-white/30 focus:border-emerald-400 focus:outline-none w-48 sm:w-60"
              />
            </div>

            <select
              value={selectedMineral}
              onChange={(e) => setSelectedMineral(e.target.value)}
              className="px-4 py-2 rounded-full bg-[#161616] border border-white/10 text-xs text-white focus:border-emerald-400 focus:outline-none cursor-pointer"
            >
              <option value="all">All Minerals</option>
              <option value="lithium">Lithium</option>
              <option value="tin">Tin (Cassiterite)</option>
              <option value="gold">Gold</option>
              <option value="tantalite">Tantalite</option>
            </select>
          </div>
        </div>

        {/* Feed List */}
        <div className="space-y-3">
          {filteredFeed.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bento-pill-accent text-[10px] font-mono font-bold">
                    {item.mineral}
                  </span>
                  <span className="bento-pill text-[10px] font-mono">
                    <MapPin className="w-3 h-3 text-cyan-400 inline mr-1" />
                    {item.state}
                  </span>
                  <span className="bento-pill text-[10px] font-mono text-purple-300">
                    {item.stage}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-white/50 font-mono">
                  <span>Type: <strong className="text-white/80">{item.type}</strong></span>
                  <span>•</span>
                  <span>Deadline: <strong className="text-amber-400">{item.deadline}</strong></span>
                </div>
              </div>

              <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0">
                <div className="text-right">
                  <span className="bento-meta block">Facility Scale</span>
                  <span className="text-base font-bold font-mono text-emerald-400">{item.value}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectOpportunity) {
                      onSelectOpportunity({
                        id: item.id,
                        title: item.title,
                        category: 'Mining & Minerals',
                        type: 'Grant',
                        organization: 'Solid Minerals Development Fund (SMDF)',
                        deadline: item.deadline,
                        eligibility: [
                          `Registered Nigerian mining company in ${item.state}`,
                          'Valid Mining Lease (ML) or Small Scale Mining Lease (SSML)',
                          'Beneficiation / Processing feasibility plan',
                        ],
                        link: 'https://smdf.gov.ng',
                        description: `${item.title}. Stage: ${item.stage}. Facility volume: ${item.value}.`,
                        fundingAmount: item.value,
                        location: item.state,
                        featured: true,
                      });
                    }
                  }}
                  className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-emerald-400 hover:text-black text-white font-mono text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {filteredFeed.length === 0 && (
            <div className="p-8 text-center text-white/40 text-xs font-mono">
              No mineral opportunities matching &quot;{searchQuery}&quot; found. Try adjusting filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
