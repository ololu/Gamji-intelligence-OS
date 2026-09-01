import React, { useState } from 'react';
import {
  Radar,
  Calendar,
  DollarSign,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Filter,
  Search,
  Award,
  Clock,
  Plus,
} from 'lucide-react';
import { OpportunityItem, SubscriberProfile } from '../types';

interface OpportunityRadarProps {
  opportunities: OpportunityItem[];
  subscriber: SubscriberProfile;
  onAddOpportunity: (opp: OpportunityItem) => void;
}

export const OpportunityRadar: React.FC<OpportunityRadarProps> = ({
  opportunities,
  subscriber,
  onAddOpportunity,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New opportunity state
  const [oppTitle, setOppTitle] = useState('');
  const [oppOrg, setOppOrg] = useState('');
  const [oppCat, setOppCat] = useState<any>('scholarship');
  const [oppAudience, setOppAudience] = useState('');
  const [oppDeadline, setOppDeadline] = useState('2026-10-31');
  const [oppFunding, setOppFunding] = useState('');
  const [oppUrl, setOppUrl] = useState('');
  const [oppDesc, setOppDesc] = useState('');

  const categories = [
    { id: 'all', label: 'All Opportunities' },
    { id: 'scholarship', label: 'Scholarships' },
    { id: 'grant', label: 'Research & Startup Grants' },
    { id: 'competition', label: 'Hackathons & Contests' },
    { id: 'fellowship', label: 'Fellowships' },
  ];

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesCat = filterCategory === 'all' || opp.category === filterCategory;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const getDaysRemaining = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr);
    const today = new Date('2026-09-01');
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oppTitle || !oppOrg || !oppUrl) return;
    const newOpp: OpportunityItem = {
      id: `opp-${Date.now()}`,
      title: oppTitle,
      organization: oppOrg,
      category: oppCat,
      targetAudience: oppAudience || 'Nigerian students and researchers',
      eligibility: ['Nigerian citizen', 'STEM / Mining / Tech background'],
      deadline: oppDeadline,
      fundingAmount: oppFunding || 'Full Support',
      country: 'Nigeria',
      applicationUrl: oppUrl,
      verified: true,
      matchScore: 92,
      tags: ['#Opportunity', `#${oppCat}`, '#GamjiRadar'],
      description: oppDesc || 'Verified educational or startup opportunity for Nigerian innovators.',
    };
    onAddOpportunity(newOpp);
    setShowAddModal(false);
    setOppTitle('');
    setOppOrg('');
    setOppUrl('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner Bento Tile */}
      <div className="bento-card-gradient p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-teal-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bento-pill-accent text-[11px] font-mono font-bold">
              GAMJI OPPORTUNITY RADAR
            </span>
            <span className="text-white/40 text-xs font-mono">37 Live Harvested Calls</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
            Nigerian & African Innovation Opportunities
          </h2>
          <p className="text-xs sm:text-sm text-white/60 max-w-2xl mt-1 leading-relaxed">
            Automated intelligence tracking of verified scholarships, research fellowships, startup grants, and engineering competitions with direct application links.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-full bg-teal-400 hover:bg-teal-300 text-stone-950 font-bold text-xs flex items-center gap-2 self-start md:self-auto cursor-pointer shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Submit / Extract Opportunity</span>
        </button>
      </div>

      {/* Filter & Search Controls Bento Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/10 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-teal-400 text-stone-950 font-bold shadow-[0_0_12px_rgba(45,212,191,0.3)]'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search PTDF, NITDA, Google..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-white/30 focus:border-teal-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Opportunities Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOpportunities.map((opp, oppIdx) => {
          const daysLeft = getDaysRemaining(opp.deadline);
          return (
            <div
              key={`${opp.id}-${oppIdx}`}
              className="bento-card p-6 flex flex-col justify-between space-y-4 hover:border-teal-500/40 transition-all group"
            >
              <div className="space-y-3.5">
                {/* Header metadata */}
                <div className="flex items-center justify-between text-xs">
                  <span className="bento-pill text-[10px] uppercase font-mono">
                    {opp.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className={daysLeft < 15 ? 'text-amber-400 font-bold' : 'text-white/40'}>
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Closing today'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors font-display">
                    {opp.title}
                  </h3>
                  <p className="text-xs text-white/50 mt-1 font-medium">{opp.organization}</p>
                </div>

                <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
                  {opp.description}
                </p>

                {/* Funding / Value Callout */}
                {opp.fundingAmount && (
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-xs">
                    <span className="bento-meta block mb-0.5">SUPPORT & VALUE</span>
                    <strong className="text-emerald-400 font-mono text-xs">
                      {opp.fundingAmount}
                    </strong>
                  </div>
                )}

                {/* Eligibility bullet points */}
                <div className="space-y-1.5 text-[11px] text-white/60">
                  <span className="bento-meta block">Eligibility:</span>
                  {(opp.eligibility || []).slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-teal-400 font-bold">•</span>
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                  {opp.matchScore}% Match
                </span>
                <a
                  href={opp.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-teal-400 hover:bg-teal-300 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Opportunity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg p-7 rounded-[32px] bg-[#111111] border border-white/15 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white font-display">
                Add Opportunity to Radar
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="bento-meta block mb-1.5">Opportunity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TETFund National Research Grant 2026"
                  value={oppTitle}
                  onChange={(e) => setOppTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:border-teal-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="bento-meta block mb-1.5">Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TETFund / NITDA"
                    value={oppOrg}
                    onChange={(e) => setOppOrg(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:border-teal-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="bento-meta block mb-1.5">Category</label>
                  <select
                    value={oppCat}
                    onChange={(e) => setOppCat(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-white focus:border-teal-400 focus:outline-none"
                  >
                    <option value="scholarship">Scholarship</option>
                    <option value="grant">Grant</option>
                    <option value="fellowship">Fellowship</option>
                    <option value="competition">Competition / Hackathon</option>
                    <option value="training">Training</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="bento-meta block mb-1.5">Application Deadline</label>
                  <input
                    type="date"
                    required
                    value={oppDeadline}
                    onChange={(e) => setOppDeadline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:border-teal-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="bento-meta block mb-1.5">Funding / Value</label>
                  <input
                    type="text"
                    placeholder="e.g. ₦15,000,000 or Full Tuition"
                    value={oppFunding}
                    onChange={(e) => setOppFunding(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:border-teal-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="bento-meta block mb-1.5">Application URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={oppUrl}
                  onChange={(e) => setOppUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:border-teal-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="bento-meta block mb-1.5">Description</label>
                <textarea
                  rows={2}
                  placeholder="Summary of eligibility and benefits..."
                  value={oppDesc}
                  onChange={(e) => setOppDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:border-teal-400 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-teal-400 hover:bg-teal-300 text-stone-950 font-bold text-xs cursor-pointer shadow-md"
                >
                  Publish to Radar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
