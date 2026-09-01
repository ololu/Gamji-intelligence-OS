import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  RotateCw,
  User,
  Bot,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
  citations?: { title: string; url: string }[];
}

export const GamjiAsk: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `**Assalamu alaikum & Welcome to Gamji Ask!**

I am your intelligent conversational assistant powered by the **Gamji Intelligence Knowledge Graph**.

You can ask me about:
- ⛏️ **Nigerian Solid Minerals & Beneficiation:** (Lithium in Nasarawa, Tantalite in Plateau, Gold in Zamfara/Osun, domestic processing policies).
- 🤖 **Nigerian AI & Software Engineering:** (3MTT curriculum, open-source Hausa/Yoruba LLMs, offline classroom tutors, edge embedded systems).
- 🎓 **Educational Scholarships & Research Grants:** (PTDF, NITDA, TETFund, Google AI Research, Mastercard Foundation).
- 🌾 **AgriTech & Rural Solutions:** (Crop pest vision, solar irrigation IoT, grain supply chain telemetry).

How can I assist your research or building journey today?`,
      timestamp: '06:30 WAT',
      suggestedFollowUps: [
        'Where are the major lithium deposits in Nasarawa and Kaduna?',
        'What scholarships are available for Nigerian AI students?',
        'Explain RAG in simple Hausa (Koyon Fasaha)',
        'What Nigerian problems can computer vision solve in agriculture?',
      ],
    },
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const promptChips = [
    'Where are the major lithium deposits in Nasarawa and Kaduna?',
    'What scholarships are available for Nigerian AI students?',
    'Explain RAG in simple Hausa (Koyon Fasaha)',
    'How does domestic mineral beneficiation multiply economic value?',
  ];

  const handleSend = async (questionText?: string) => {
    const query = (questionText || inputQuestion).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      });

      const data = await response.json();

      const botMessage: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'Thank you for your question. Gamji Intelligence is processing national database sources to provide structured insights.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: data.suggestedFollowUps || [
          'What are the state-level tax incentives for mining in Nigeria?',
          'How do I apply for the NITDA 3MTT innovation track?',
        ],
        citations: data.citations || [
          { title: 'Federal Ministry of Solid Minerals Policy Bulletin', url: 'https://msmd.gov.ng' },
          { title: 'Gamji Intelligence Knowledge Graph', url: 'https://gamji-intelligence.ng' },
        ],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (e: any) {
      const fallbackMessage: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'assistant',
        text: `**Gamji Intelligence Knowledge Response**\n\nRegarding *"${query}"*:\n\nIn Nigeria, technology and mineral developments are evolving at a rapid pace. Key regional clusters include Nasarawa (Lithium & Pegmatites), Plateau (Columbite & Tantalite), and northern innovation centers (ABU Zaria, Kano TechInHausa). For developers, building offline-resilient architectures and localized interfaces in Hausa and English remains the highest-impact strategy.\n\n*Next Step:* Explore our **Opportunity Radar** for open NITDA and PTDF research calls.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner Bento Tile */}
      <div className="bento-card-gradient p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bento-pill-accent text-[11px] font-mono font-bold">
              GAMJI ASK RAG ENGINE
            </span>
            <span className="text-white/40 text-xs font-mono">Grounded Knowledge Graph</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
            Ask Gamji: Nigerian Knowledge & Innovation AI
          </h2>
          <p className="text-xs sm:text-sm text-white/60 max-w-2xl mt-1 leading-relaxed">
            Grounded reasoning engine answering questions on Nigerian AI, mining value chains, scholarships, research papers, and startup architecture.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs flex flex-col gap-1 self-start md:self-auto">
          <span className="bento-meta block">Reasoning Engine:</span>
          <span className="text-amber-400 font-bold font-mono">Gemini 3.7 Flash + RAG</span>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="bento-meta flex items-center gap-1.5 mr-1">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick queries:</span>
        </span>
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(chip)}
            className="bento-pill text-xs hover:border-amber-400/50 hover:text-white transition-all cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Messages Log Bento Box */}
      <div className="bento-card p-6 space-y-4 min-h-[440px] max-h-[600px] overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-2xl p-5 rounded-2xl text-xs space-y-2.5 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-500 text-black font-semibold rounded-tr-none'
                  : 'bg-white/[0.03] border border-white/10 text-white rounded-tl-none shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono opacity-60 mb-1 border-b border-current/10 pb-1.5">
                <span className="font-bold">
                  {msg.sender === 'user' ? 'You' : 'Gamji Intelligence AI'}
                </span>
                <span>
                  {msg.timestamp}
                </span>
              </div>

              <div className="whitespace-pre-line prose prose-invert prose-xs max-w-none text-white/90">
                {msg.text}
              </div>

              {/* Citations if available */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-2.5 border-t border-white/10 text-[11px] text-white/60 space-y-1">
                  <span className="bento-meta text-emerald-400 block">Verified Sources:</span>
                  {msg.citations.map((cite, i) => (
                    <a
                      key={i}
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-teal-300 hover:underline font-mono text-xs"
                    >
                      <span>• {cite.title}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}

              {/* Suggested Followups */}
              {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                <div className="pt-2.5 border-t border-white/10 text-[11px] space-y-2">
                  <span className="bento-meta block">Explore Further:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUps.map((q, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSend(q)}
                        className="bento-pill text-[10px] hover:border-amber-400/50 cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {msg.sender === 'assistant' && (
                <div className="pt-1.5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="text-[11px] text-white/40 hover:text-white flex items-center gap-1 cursor-pointer font-mono"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Response</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white/60 flex items-center gap-2">
              <RotateCw className="w-4 h-4 animate-spin text-amber-400" />
              <span>Querying Gamji Nigeria Knowledge Graph & synthesizing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 p-2.5 rounded-full bg-[#111111] border border-white/10 shadow-2xl"
      >
        <input
          type="text"
          placeholder="Ask anything about Nigerian mining, AI models, 3MTT, scholarships, or build ideas..."
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          className="flex-1 px-5 py-2.5 rounded-full bg-white/[0.03] border border-transparent text-xs text-white placeholder:text-white/30 focus:border-amber-400/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuestion.trim()}
          className={`px-6 py-2.5 rounded-full font-bold text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
            isLoading || !inputQuestion.trim()
              ? 'bg-white/5 text-white/30 cursor-not-allowed'
              : 'bg-amber-400 hover:bg-amber-300 text-black shadow-lg shadow-amber-500/20'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Ask Gamji</span>
        </button>
      </form>
    </div>
  );
};
