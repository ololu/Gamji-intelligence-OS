import React, { useState } from 'react';
import {
  X,
  UserCheck,
  Sparkles,
  Check,
  Mail,
  Languages,
  Sliders,
} from 'lucide-react';
import { SubscriberProfile } from '../types';

interface SubscriberModalProps {
  subscriber: SubscriberProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: SubscriberProfile) => void;
  onGenerateCustom: () => void;
}

export const SubscriberModal: React.FC<SubscriberModalProps> = ({
  subscriber,
  isOpen,
  onClose,
  onSave,
  onGenerateCustom,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(subscriber?.name || '');
  const [email, setEmail] = useState(subscriber?.email || '');
  const [experienceLevel, setExperienceLevel] = useState(subscriber?.experienceLevel || 'student');
  const [frequency, setFrequency] = useState(subscriber?.frequency || 'weekly');
  const [language, setLanguage] = useState(subscriber?.language || 'English');
  const [interests, setInterests] = useState<string[]>(subscriber?.interests || []);

  const availableInterests = [
    'Mining & Minerals',
    'Lithium & Beneficiation',
    'Artificial Intelligence',
    'AI Engineering',
    'Education & EdTech',
    'Scholarships & Grants',
    'Agriculture & AgriTech',
    'Renewable Energy',
    'Hausa Tech (Koyon Fasaha)',
    'Nigerian Research Papers',
    'Startup Build Challenges',
    'Solid Minerals Policy',
  ];

  const toggleInterest = (tag: string) => {
    if (interests.includes(tag)) {
      setInterests(interests.filter((t) => t !== tag));
    } else {
      setInterests([...interests, tag]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...subscriber,
      name,
      email,
      experienceLevel,
      frequency,
      language,
      interests,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-[32px] bg-[#111111] border border-white/10 shadow-2xl space-y-6 text-white relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bento-pill-accent text-[11px] font-mono font-bold">
              PREFERENCE ENGINE
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white font-display tracking-tight">
            Personalize Your Gamji Newsletter Feed
          </h3>
          <p className="text-xs text-white/60 mt-1">
            Configure your focus verticals and delivery preferences for autonomous 1-of-1 personalization.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="bento-meta block mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="bento-meta block mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="bento-meta block mb-1.5">Role / Persona</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-2xl bg-[#1a1a1a] border border-white/10 text-white focus:border-emerald-400 focus:outline-none cursor-pointer"
              >
                <option value="student">Student / 3MTT Fellow</option>
                <option value="developer">Developer / Engineer</option>
                <option value="founder">Founder / Builder</option>
                <option value="researcher">Researcher / Academic</option>
                <option value="mining_professional">Mining Professional / Investor</option>
              </select>
            </div>

            <div>
              <label className="bento-meta block mb-1.5">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-2xl bg-[#1a1a1a] border border-white/10 text-white focus:border-emerald-400 focus:outline-none cursor-pointer"
              >
                <option value="weekly">GAMJI WEEKLY (Flagship)</option>
                <option value="daily">GAMJI DAILY (5-Min Digest)</option>
                <option value="both">Both Daily & Weekly</option>
              </select>
            </div>

            <div>
              <label className="bento-meta block mb-1.5">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-2xl bg-[#1a1a1a] border border-white/10 text-white focus:border-emerald-400 focus:outline-none cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Hausa">Hausa (Koyon Fasaha)</option>
                <option value="Bilingual">Bilingual (English + Hausa)</option>
              </select>
            </div>
          </div>

          {/* Interests Pills */}
          <div>
            <label className="bento-meta block mb-2">
              Select Your Subscribed Verticals ({interests.length} selected):
            </label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map((interest) => {
                const isSelected = interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-400 text-black font-bold shadow-lg shadow-emerald-500/20'
                        : 'bg-white/[0.03] border border-white/10 text-white/60 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {isSelected ? `✓ ${interest}` : `+ ${interest}`}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                handleSave({ preventDefault: () => {} } as any);
                onGenerateCustom();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/50 font-bold font-mono flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Trigger AI Custom Edition</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 font-mono text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black font-bold font-mono text-xs shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
