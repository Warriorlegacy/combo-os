'use client';

import React, { useState } from 'react';
import { Film, Play, Mic, Sparkles, Download, Clock } from 'lucide-react';
import type { VideoShort } from '@combo/shared-types';

export default function ShortsFactoryPage() {
  const [topic, setTopic] = useState('How to Host Full-Stack Apps for $0 Forever');
  const [hook, setHook] = useState('Stop burning $150 a month on cloud servers before you have your first customer.');
  const [scriptBody, setScriptBody] = useState(`Here is the exact zero-dollar architecture:
1. Compile your frontend to Cloudflare Pages for unlimited bandwidth and zero egress fees.
2. Run your serverless backend on Cloudflare Workers with 100,000 requests per day.
3. Use Cloudflare D1 for distributed edge SQLite with 5 million daily reads.
4. Route AI prompts through Cloudflare Workers AI and Groq for 500 tokens-per-second free inference.`);
  const [cta, setCta] = useState('Comment STACK below and I will send you the open-source GitHub starter repo.');
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const words = `${hook} ${scriptBody} ${cta}`.split(/\s+/);
  const estimatedSeconds = Math.round(words.length / 2.6); // ~150-160 WPM typical shorts pacing

  const playPreview = () => {
    setIsPlaying(true);
    setActiveWordIdx(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= words.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setActiveWordIdx(i);
      }
    }, 250);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider">
          <span>Project #7 · High-Yield Production MVP</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1c1f1a] dark:text-[#e8eae3]">
          Faceless Shorts & Reels Factory
        </h1>
        <p className="text-sm sm:text-base text-[#4c524a] dark:text-[#b3b8ac] max-w-2xl">
          High-retention short video pipeline. Automatically formats hooks, computes speech tempo, generates word-by-word kinetic captions, and exports Remotion/MoviePy render code.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Script Composition Form */}
        <div className="lg:col-span-2 p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
          <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
            <span className="font-serif font-bold text-base">Short Script Pipeline</span>
            <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
              Est. Duration: {estimatedSeconds}s (Optimal for Shorts/Reels)
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-[#7a8074] uppercase mb-1">1. 3-Second Hook (Retention Anchor)</label>
              <input
                type="text"
                value={hook}
                onChange={e => setHook(e.target.value)}
                className="w-full p-2.5 text-xs rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#7a8074] uppercase mb-1">2. Core Value Narrative</label>
              <textarea
                rows={5}
                value={scriptBody}
                onChange={e => setScriptBody(e.target.value)}
                className="w-full p-2.5 text-xs rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] leading-relaxed font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#7a8074] uppercase mb-1">3. Call to Action (CTA)</label>
              <input
                type="text"
                value={cta}
                onChange={e => setCta(e.target.value)}
                className="w-full p-2.5 text-xs rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d]"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-[#dddccd] dark:border-[#31362d] flex items-center justify-between">
            <button
              onClick={playPreview}
              disabled={isPlaying}
              className="inline-flex items-center px-4 py-2 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 mr-1.5" />
              <span>{isPlaying ? 'Playing Preview...' : 'Simulate Video Subtitle Playback'}</span>
            </button>

            <span className="font-mono text-xs text-[#7a8074]">
              Edge-TTS: Kokoro & Microsoft En-US Free
            </span>
          </div>
        </div>

        {/* Right: 9:16 Vertical Phone Simulator */}
        <div className="flex flex-col items-center">
          <div className="w-[260px] h-[480px] rounded-[32px] border-4 border-[#1c1f1a] dark:border-[#31362d] bg-[#111410] text-white p-4 relative flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Top status */}
            <div className="flex justify-between items-center text-[10px] font-mono opacity-60 pt-1">
              <span>9:16 Shorts</span>
              <span>60 FPS</span>
            </div>

            {/* Kinetic Animated Captions in Center */}
            <div className="my-auto text-center px-3 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#6fce96]">
                {activeWordIdx < 12 ? '🔥 HOOK' : activeWordIdx > words.length - 8 ? '🎯 CTA' : '💡 VALUE'}
              </div>
              <div className="font-serif font-black text-xl leading-tight tracking-tight uppercase text-yellow-300 drop-shadow-md">
                {words[activeWordIdx] || 'READY'}
              </div>
              <div className="text-[11px] font-sans opacity-70 leading-snug">
                {words.slice(Math.max(0, activeWordIdx - 3), activeWordIdx).join(' ')}{' '}
                <span className="underline font-bold text-white">{words[activeWordIdx]}</span>{' '}
                {words.slice(activeWordIdx + 1, activeWordIdx + 4).join(' ')}
              </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mb-2">
              <div
                className="bg-[#6fce96] h-full transition-all duration-200"
                style={{ width: `${((activeWordIdx + 1) / words.length) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-[11px] font-mono text-[#7a8074] mt-3">9:16 TikTok / Reels / Shorts Preview</span>
        </div>
      </div>
    </div>
  );
}
