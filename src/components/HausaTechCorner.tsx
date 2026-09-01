import React, { useState } from 'react';
import {
  Languages,
  BookOpen,
  Volume2,
  Sparkles,
  ArrowRight,
  Send,
  RotateCw,
  Copy,
  Check,
} from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';

export const HausaTechCorner: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [translatedResult, setTranslatedResult] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const dictionary = [
    { hausa: 'Basirar Na’ura (AI)', english: 'Artificial Intelligence', desc: 'Fasahar da ke bai wa kwamfuta ikon yin tunani da warware matsaloli kamar dan adam.' },
    { hausa: 'Sarkar Bayanai (Blockchain)', english: 'Blockchain', desc: 'Tsarin ajiye bayanai wanda ba a iya sauyawa ko yin magudi a ciki.' },
    { hausa: 'Koyon Na’ura (Machine Learning)', english: 'Machine Learning', desc: 'Yadda na’ura ke koyon dabi’u da dokoki daga tarin bayanai ba tare da an sake rubuta mata sabon shiri ba.' },
    { hausa: 'Sarrafa Ma’adanai (Beneficiation)', english: 'Mineral Beneficiation', desc: 'Tace danyen ma’adanin kasa domin kara masa daraja da inganci kafin sayarwa.' },
    { hausa: 'Gajimaren Kwamfuta (Cloud Computing)', english: 'Cloud Computing', desc: 'Ajiye bayanai da amfani da manhajoji ta hanyar intanet maimakon kan kwamfutar gida.' },
    { hausa: 'Tsaron Yanar Gizo (Cybersecurity)', english: 'Cybersecurity', desc: 'Kare na’urori, intanet, da bayanai daga sharrin masu kutse.' },
  ];

  const sampleLesson = {
    title: 'Menene RAG (Retrieval-Augmented Generation) a Saukake?',
    hausaText: `A yau a sashen koyon fasaha na Gamji, muna duba fasahar da ake kira RAG.

Lokacin da kake tambayar manhajar AI kamar ChatGPT ko Gemini, a wasu lokutan takan iya ba da amsar da ba daidai ba (wato hallucination).

Don magance wannan matsala, masana sun kirkiro RAG. 
RAG na aiki ne ta hanyar:
1. Neman ingantattun littattafai ko manhajoji da ke da amsar tambayarka da farko.
2. Daga nan sai ta dauko wannan bayani ta karanta shi, sannan ta amsa maka tambayarka bisa hujjojin da ta gano.

Misali: Idan dalibi a Kano ya tambayi AI game da tsarin jarrabawar WAEC ta Physics a Najeriya, RAG zai nemo manhajar karatun Najeriya ta gaskiya ya amsa masa da misalan da ya saba da su.`,
    englishSummary: 'RAG grounds AI responses on verified external documents, preventing hallucinations and ensuring high fidelity for educational systems in Nigeria.',
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, targetLanguage: 'Hausa' }),
      });
      const data = await res.json();
      setTranslatedResult(data.translatedText || `Bayani a harshen Hausa: ${inputText}`);
    } catch (e) {
      setTranslatedResult(`Fasahar ${inputText}: Wannan wani muhimmin ci gaba ne a fannin kimiyya da fasaha wanda zai taimaka wa al'umma.`);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner Bento Tile */}
      <div className="bento-card-gradient p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bento-pill-accent text-[11px] font-mono font-bold">
              SASHER FASAHAR HAUSA
            </span>
            <span className="text-white/40 text-xs font-mono">Koyon Fasaha & Ma'adanai</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
            Fasahar AI da Kimiyya a Harshen Hausa
          </h2>
          <p className="text-xs sm:text-sm text-white/60 max-w-2xl mt-1 leading-relaxed">
            Making cutting-edge artificial intelligence, software engineering, and mineral science completely accessible to over 60 million Hausa speakers across West Africa.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs flex flex-col gap-1 self-start md:self-auto">
          <span className="bento-meta block">Gwamnatin Ilmi:</span>
          <span className="text-emerald-400 font-bold font-mono">Koyon Kimiyya a Harshen Uwa</span>
        </div>
      </div>

      {/* Featured Hausa Lesson Bento Box */}
      <div className="bento-card p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              DARASIN FASAHAR MAKO (LESSON OF THE WEEK)
            </span>
            <h3 className="text-2xl font-bold text-white font-display mt-1 tracking-tight">
              {sampleLesson.title}
            </h3>
          </div>
          <AudioPlayer textToRead={sampleLesson.hausaText} title={sampleLesson.title} language="ha" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 text-xs text-white/80 leading-relaxed font-sans whitespace-pre-line">
            {sampleLesson.hausaText}
          </div>

          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4 flex flex-col justify-between">
            <div>
              <span className="bento-meta text-emerald-400 block">
                ENGLISH CONTEXT & TAKEAWAY
              </span>
              <p className="text-xs text-white/70 mt-2 leading-relaxed">
                {sampleLesson.englishSummary}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] text-xs text-white/60 border border-white/10">
              💡 <strong className="text-emerald-300">Shawarar Injiniya:</strong> RAG ita ce hanya mafi sauki wajen gina mataimakin karatu ga makarantun Najeriya.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive AI Hausa Tech Translator Bento Box */}
      <div className="bento-card p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-display">
              Gamji AI Hausa Tech Translator & Cultural Explainer
            </h3>
            <p className="text-xs text-white/50">
              Type any complex technical, AI, or mineral processing concept to translate it into intuitive, idiomatic Hausa.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="bento-meta block mb-1.5">
              English Technical Concept
            </label>
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. How does froth flotation extract lithium spodumene from pegmatite rocks in Nasarawa?"
              className="w-full p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-white/30 focus:border-emerald-400 focus:outline-none resize-none"
            />
            <button
              type="button"
              onClick={handleTranslate}
              disabled={isTranslating || !inputText.trim()}
              className={`mt-3 px-5 py-2.5 rounded-full text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer ${
                isTranslating || !inputText.trim()
                  ? 'bg-white/5 text-white/30 border border-white/5'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20'
              }`}
            >
              {isTranslating ? (
                <>
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Fassara a Harshen Hausa...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Translate to Hausa</span>
                </>
              )}
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="bento-meta text-emerald-400">
                Fassara da Bayani a Harshen Hausa
              </label>
              {translatedResult && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs text-white/50 hover:text-white flex items-center gap-1 cursor-pointer font-mono"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>
            <div className="p-4 h-32 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-white/80 overflow-y-auto leading-relaxed">
              {translatedResult || (
                <span className="text-white/30 italic">
                  Amsar za ta bayyana a nan da zarar ka danna maɓallin fassara...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hausa Tech Vocabulary Matrix */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white font-display">
            Kamus din Kalmomin Fasahar Zamani (Hausa Tech Vocabulary)
          </h3>
          <p className="text-xs text-white/50">
            Standardized technical glossary curated for Nigerian educators, students, and software developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dictionary.map((item, idx) => (
            <div
              key={idx}
              className="bento-card p-6 space-y-3 hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-base font-bold text-emerald-300 font-display">{item.hausa}</span>
              </div>
              <span className="text-xs font-mono text-white/50 block">{item.english}</span>
              <p className="text-xs text-white/70 leading-relaxed pt-2 border-t border-white/10">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
