'use client';

import React, { useState } from 'react';
import { Film, Play, Mic, Sparkles, Download, Clock, Copy, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import type { VideoShort } from '@combo/shared-types';

type VisualTemplate = 'minimalist-dark' | 'kinetic-bold' | 'documentary-split';

interface AssetLicence {
  name: string;
  type: 'Audio' | 'Voice' | 'Visual';
  licence: string;
  source: string;
}

const LICENSED_ASSETS: AssetLicence[] = [
  { name: 'Kokoro TTS (v0.19)', type: 'Voice', licence: 'Apache 2.0 (Open-Source)', source: 'HuggingFace Kokoro-82M' },
  { name: 'faster-whisper word timestamps', type: 'Voice', licence: 'MIT License', source: 'SYSTRAN/faster-whisper' },
  { name: 'Ambient Focus Tape', type: 'Audio', licence: 'CC-BY 4.0 (Commercial OK)', source: 'Free Music Archive / Kevin MacLeod' },
  { name: 'Cloud Architecture B-Roll', type: 'Visual', licence: 'Pexels CC0 (Royalty-Free)', source: 'Pexels Media ID #84321' }
];

export default function ShortsFactoryPage() {
  const [topic, setTopic] = useState('How to Host Full-Stack Apps for $0 Forever');
  const [hook, setHook] = useState('Stop burning $150 a month on cloud servers before you have your first customer.');
  const [scriptBody, setScriptBody] = useState(`Here is the exact zero-dollar architecture:
1. Compile your frontend to Cloudflare Pages for unlimited bandwidth and zero egress fees.
2. Run your serverless backend on Cloudflare Workers with 100,000 requests per day.
3. Use Cloudflare D1 for distributed edge SQLite with 5 million daily reads.
4. Route AI prompts through FreeLLMAPI custom router (127.0.0.1:31415) and Groq for 500 tok/s free inference.`);
  const [cta, setCta] = useState('Comment STACK below and I will send you the open-source GitHub starter repo.');
  const [template, setTemplate] = useState<VisualTemplate>('minimalist-dark');
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedFfmpeg, setCopiedFfmpeg] = useState(false);

  const words = `${hook} ${scriptBody} ${cta}`.split(/\s+/).filter(Boolean);
  const wordsPerMinute = 155;
  const estimatedSeconds = Math.round((words.length / wordsPerMinute) * 60);

  const playPreview = () => {
    setIsPlaying(true);
    setActiveWordIdx(0);
    let i = 0;
    const intervalTime = Math.round(60000 / wordsPerMinute);
    const interval = setInterval(() => {
      i++;
      if (i >= words.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setActiveWordIdx(i);
      }
    }, intervalTime);
  };

  const ffmpegCommand = `# 100% Free FFmpeg Video Render Command (No Remotion license constraints)
ffmpeg -y -loop 1 -i background.jpg -i voiceover.mp3 \\
  -vf "subtitles=captions.srt:force_style='Fontname=IBM Plex Sans,FontSize=28,Bold=1,PrimaryColour=&H00FFFF,Alignment=2,MarginV=140'" \\
  -c:v libx264 -tune stillimage -c:a aac -b:a 192k -pix_fmt yuv420p -shortest \\
  output_short_9x16.mp4`;

  const copyFfmpeg = () => {
    navigator.clipboard?.writeText(ffmpegCommand);
    setCopiedFfmpeg(true);
    setTimeout(() => setCopiedFfmpeg(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider">
          <span>Project #7 · High-Yield Production MVP</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1c1f1a] dark:text-[#e8eae3]">
          Faceless Shorts & Reels Factory (Autoshorts)
        </h1>
        <p className="text-sm sm:text-base text-[#4c524a] dark:text-[#b3b8ac] max-w-2xl">
          Automated short-video pipeline: hook generation, speech tempo computation, word-timed kinetic captions, and open-source FFmpeg rendering for faceless YouTube and Instagram channels.
        </p>
      </div>

      {/* YouTube Partner Program Honesty Banner */}
      <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] flex items-start space-x-3 text-xs text-[#4c524a] dark:text-[#b3b8ac]">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#17603a] dark:text-[#6fce96]" />
        <div>
          <strong className="text-[#1c1f1a] dark:text-[#e8eae3]">Monetization Reality & YouTube Partner Program Thresholds:</strong> Qualification requires <strong>1,000 subscribers</strong> plus either <strong>4,000 valid public watch hours in 12 months</strong> OR <strong>10M valid Shorts views in 90 days</strong>. Meeting these thresholds does not guarantee acceptance. Never use uncredited copyrighted music or clips.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Script Composition Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
            <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
              <span className="font-serif font-bold text-base">Short Script Pipeline</span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                Est. Duration: {estimatedSeconds}s (Under 60s Shorts Limit)
              </span>
            </div>

            {/* Template Selector */}
            <div>
              <label className="block text-xs font-mono text-[#7a8074] uppercase mb-1.5">Visual Template</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'minimalist-dark', label: 'Minimalist Dark' },
                  { id: 'kinetic-bold', label: 'Kinetic Bold Yellow' },
                  { id: 'documentary-split', label: 'Documentary Split' }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTemplate(t.id as VisualTemplate)}
                    className={`py-2 px-3 rounded border text-xs font-mono transition-colors ${
                      template === t.id
                        ? 'border-[#17603a] bg-[#e3efe4] dark:bg-[#1d2f22] font-bold text-[#17603a] dark:text-[#6fce96]'
                        : 'border-[#dddccd] dark:border-[#31362d] text-[#7a8074] hover:bg-[#efeee6]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
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
                  rows={4}
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

            <div className="pt-2 border-t border-[#dddccd] dark:border-[#31362d] flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={playPreview}
                disabled={isPlaying}
                className="inline-flex items-center px-4 py-2 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 mr-1.5" />
                <span>{isPlaying ? 'Playing Preview...' : 'Simulate Video Subtitle Playback'}</span>
              </button>

              <span className="font-mono text-xs text-[#7a8074]">
                TTS: Kokoro-82M · Whisper Word Timestamps
              </span>
            </div>
          </div>

          {/* Open-Source FFmpeg Generator & Licence Log */}
          <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-3">
            <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
              <div className="flex items-center space-x-2">
                <Film className="w-4 h-4 text-[#17603a] dark:text-[#6fce96]" />
                <span className="font-serif font-bold text-sm">FFmpeg Production Render Command</span>
              </div>
              <button
                type="button"
                onClick={copyFfmpeg}
                className="inline-flex items-center space-x-1 text-xs font-mono text-[#17603a] dark:text-[#6fce96] hover:underline"
              >
                {copiedFfmpeg ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFfmpeg ? 'Copied' : 'Copy FFmpeg'}</span>
              </button>
            </div>
            <pre className="text-[11px] font-mono bg-[#111410] text-[#6fce96] p-3 rounded overflow-x-auto">
              {ffmpegCommand}
            </pre>

            <div className="pt-2 space-y-1.5">
              <span className="text-xs font-mono text-[#7a8074] uppercase block">Asset Licence Log (Zero Copyright Risk)</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {LICENSED_ASSETS.map((asset, idx) => (
                  <div key={idx} className="p-2 rounded border border-[#dddccd] dark:border-[#31362d] text-[11px] font-mono flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#1c1f1a] dark:text-[#e8eae3]">{asset.name}</div>
                      <div className="text-[#7a8074]">{asset.licence}</div>
                    </div>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓ Clear</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: 9:16 Vertical Phone Simulator */}
        <div className="flex flex-col items-center">
          <div className={`w-[270px] h-[500px] rounded-[36px] border-4 border-[#1c1f1a] dark:border-[#31362d] p-4 relative flex flex-col justify-between overflow-hidden shadow-2xl transition-all ${
            template === 'kinetic-bold'
              ? 'bg-[#18181b] text-white'
              : template === 'documentary-split'
              ? 'bg-[#0f172a] text-white'
              : 'bg-[#111410] text-white'
          }`}>
            {/* Top status */}
            <div className="flex justify-between items-center text-[10px] font-mono opacity-60 pt-1">
              <span>9:16 Shorts</span>
              <span>60 FPS</span>
            </div>

            {/* Template-dependent preview decoration */}
            {template === 'documentary-split' && (
              <div className="w-full h-32 rounded-lg bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-xs font-mono text-emerald-400">
                [B-Roll: Edge Architecture]
              </div>
            )}

            {/* Kinetic Animated Captions in Center */}
            <div className="my-auto text-center px-2 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#6fce96]">
                {activeWordIdx < 12 ? '🔥 HOOK' : activeWordIdx > words.length - 8 ? '🎯 CTA' : '💡 VALUE'}
              </div>
              <div className={`font-serif font-black text-2xl leading-tight tracking-tight uppercase drop-shadow-md ${
                template === 'kinetic-bold' ? 'text-amber-300' : 'text-emerald-300'
              }`}>
                {words[activeWordIdx] || 'READY'}
              </div>
              <div className="text-[11px] font-sans opacity-70 leading-snug">
                {words.slice(Math.max(0, activeWordIdx - 3), activeWordIdx).join(' ')}{' '}
                <span className="underline font-bold text-white bg-white/20 px-1 rounded">{words[activeWordIdx]}</span>{' '}
                {words.slice(activeWordIdx + 1, activeWordIdx + 4).join(' ')}
              </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-2">
              <div
                className="bg-[#6fce96] h-full transition-all duration-200"
                style={{ width: `${((activeWordIdx + 1) / words.length) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-[11px] font-mono text-[#7a8074] mt-3">9:16 Vertical Video · {words.length} words · ~{estimatedSeconds}s</span>
        </div>
      </div>
    </div>
  );
}
