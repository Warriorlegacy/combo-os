'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Play, CheckCircle2, Award, Sparkles, RefreshCw, Clock, AlertCircle, Quote } from 'lucide-react';
import type { InterviewSession } from '@combo/shared-types';

interface TrackQuestion {
  track: string;
  question: string;
  expectedKeywords: string[];
}

const TRACK_QUESTIONS: TrackQuestion[] = [
  {
    track: 'Generative AI & LLM Systems',
    question: 'How do you prevent hallucinations in high-stakes customer-facing LLM deployments?',
    expectedKeywords: ['groundedness', 'refusal gate', 'citations', 'confidence threshold', 'golden benchmark', 'evaluations']
  },
  {
    track: 'Full-Stack & Edge Infrastructure',
    question: 'Explain how to design an architecture that costs $0 ongoing hosting fees using Cloudflare Pages, Workers, D1, and R2.',
    expectedKeywords: ['Cloudflare Pages', 'Workers isolates', 'D1 SQLite', 'R2 object storage', 'zero egress', 'static export']
  },
  {
    track: 'AI Architecture & Evaluation',
    question: 'Describe a failure mode in a production RAG system you solved with measurable evaluation benchmarks.',
    expectedKeywords: ['out-of-domain', 'precision', 'false positive', 'chunking', 'grounded retrieval', 'latency']
  }
];

interface RubricCriterion {
  name: string;
  score: number;
  maxScore: number;
  evidence: string;
  feedback: string;
}

export default function InterviewCoachPage() {
  const [selectedTrackIdx, setSelectedTrackIdx] = useState(0);
  const [customQuestion, setCustomQuestion] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [transcript, setTranscript] = useState(
    'We implemented strict retrieval-augmented generation with verified document citations, an automated confidence refusal gate below 0.65 similarity, and an offline golden benchmark test set measuring groundedness and refusal accuracy continuously.'
  );

  const [rubricScores, setRubricScores] = useState<RubricCriterion[]>([
    {
      name: 'STAR Framework & Structure',
      score: 92,
      maxScore: 100,
      evidence: '"We implemented strict retrieval-augmented generation... and an offline golden benchmark..."',
      feedback: 'Clear Situation-Task-Action-Result flow with decisive implementation steps.'
    },
    {
      name: 'Technical Specificity & Depth',
      score: 96,
      maxScore: 100,
      evidence: '"below 0.65 similarity... verified document citations..."',
      feedback: 'Directly references threshold gating and retrieval verification.'
    },
    {
      name: 'Metric-Driven Evidence',
      score: 94,
      maxScore: 100,
      evidence: '"below 0.65 similarity... measuring groundedness and refusal accuracy continuously"',
      feedback: 'Cites concrete numerical guardrails rather than vague generalities.'
    },
    {
      name: 'Communication & Conciseness',
      score: 90,
      maxScore: 100,
      evidence: 'Complete answer delivered in 34 focused words without filler.',
      feedback: 'Pacing is crisp, professional, and authoritative.'
    }
  ]);

  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);

  const activeQuestion = customQuestion.trim() || TRACK_QUESTIONS[selectedTrackIdx].question;
  const activeExpected = TRACK_QUESTIONS[selectedTrackIdx]?.expectedKeywords || ['architecture', 'metrics', 'scale'];

  // Check Web Speech API support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let current = '';
          for (let i = 0; i < event.results.length; i++) {
            current += event.results[i][0].transcript + ' ';
          }
          setTranscript(current.trim());
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // Timer loop
  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(prev => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      if (isRecording) toggleRecording();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, isRecording]);

  const toggleRecording = () => {
    if (!isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {}
      }
      setIsRecording(true);
      setIsTimerRunning(true);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setIsRecording(false);
      setIsTimerRunning(false);
    }
  };

  const evaluateAnswer = () => {
    const text = transcript.trim();
    const words = text.split(/\s+/).filter(Boolean);
    const hasNumbers = /\d+%|\d+\.\d+|\d+ms|\d+/.test(text);
    const lower = text.toLowerCase();

    // Check keywords
    const missing = activeExpected.filter(kw => !lower.includes(kw.toLowerCase()));
    setMissingKeywords(missing);

    // Compute rubric criteria
    const starScore = Math.min(98, 70 + (words.length > 20 ? 15 : 5) + (hasNumbers ? 10 : 0));
    const techScore = Math.min(98, 65 + ((activeExpected.length - missing.length) * 6));
    const metricScore = hasNumbers ? 94 : 68;
    const commScore = Math.min(95, 75 + (words.length > 15 && words.length < 90 ? 18 : 5));

    // Extract quote snippet for evidence
    const snippetMatch = text.match(/[^.!?]+[.!?]/) || [text.slice(0, 80)];
    const evidenceQuote = `"${snippetMatch[0].trim()}"`;

    setRubricScores([
      {
        name: 'STAR Framework & Structure',
        score: starScore,
        maxScore: 100,
        evidence: evidenceQuote,
        feedback: starScore > 85 ? 'Solid action-driven framing with tangible outcome.' : 'Ensure you explicitly state the Situation, Task, Action taken, and measurable Result.'
      },
      {
        name: 'Technical Specificity & Depth',
        score: techScore,
        maxScore: 100,
        evidence: `Matches ${activeExpected.length - missing.length}/${activeExpected.length} domain keywords`,
        feedback: missing.length > 0 ? `Consider integrating key concepts: ${missing.slice(0, 3).join(', ')}.` : 'Comprehensive architectural depth demonstrated.'
      },
      {
        name: 'Metric-Driven Evidence',
        score: metricScore,
        maxScore: 100,
        evidence: hasNumbers ? 'Contains concrete thresholds/metrics' : 'No quantifiable numbers detected',
        feedback: hasNumbers ? 'Quantitative evidence confirms senior-level engineering rigor.' : 'Add quantifiable metrics (e.g. latency in ms, % accuracy, dollar savings) to substantiate claims.'
      },
      {
        name: 'Communication & Conciseness',
        score: commScore,
        maxScore: 100,
        evidence: `${words.length} words delivered`,
        feedback: 'Effective cadence and professional tone.'
      }
    ]);
  };

  const overallScore = Math.round(
    rubricScores.reduce((acc, c) => acc + c.score, 0) / rubricScores.length
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider">
          <span>Project #10 · High-Yield Production MVP</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1c1f1a] dark:text-[#e8eae3]">
          AI Interview Prep Coach (Mobile-First PWA)
        </h1>
        <p className="text-sm sm:text-base text-[#4c524a] dark:text-[#b3b8ac] max-w-2xl">
          Voice mock interviews for senior AI and full-stack roles. Speak your answer out loud, receive rubric-based scoring with quoted evidence, and refine STAR storytelling.
        </p>
      </div>

      {/* Ethical Guardrail Disclaimer */}
      <div className="p-4 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] flex items-start space-x-3 text-xs text-[#4c524a] dark:text-[#b3b8ac]">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
        <div>
          <strong className="text-[#1c1f1a] dark:text-[#e8eae3]">Ethical Guardrail:</strong> This tool evaluates interview communication structure and technical terminology. <strong>It does not predict hiring decisions</strong> or replace human evaluation.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Voice Interview Terminal */}
        <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
          <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
            <span className="font-serif font-bold text-base">Practice Terminal</span>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                {speechSupported ? 'Web Speech API Ready' : 'Typed Fallback Ready'}
              </span>
              <span className="font-mono text-xs text-[#7a8074]">
                <Clock className="w-3.5 h-3.5 inline mr-1" />
                {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Track Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-[#7a8074] uppercase">Target Track / Role</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {TRACK_QUESTIONS.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => { setSelectedTrackIdx(idx); setCustomQuestion(''); }}
                  className={`p-2 rounded border text-left text-xs font-mono transition-colors ${
                    selectedTrackIdx === idx && !customQuestion
                      ? 'border-[#17603a] bg-[#e3efe4] dark:bg-[#1d2f22] font-semibold text-[#17603a] dark:text-[#6fce96]'
                      : 'border-[#dddccd] dark:border-[#31362d] text-[#7a8074]'
                  }`}
                >
                  {t.track}
                </button>
              ))}
            </div>
          </div>

          {/* Current Question */}
          <div className="p-3.5 rounded bg-[#f7f6f1] dark:bg-[#1f231d] border border-[#dddccd] dark:border-[#31362d] space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-[#7a8074]">Interview Question Prompt:</div>
            <div className="font-serif font-semibold text-sm sm:text-base text-[#1c1f1a] dark:text-[#e8eae3]">
              "{activeQuestion}"
            </div>
          </div>

          {/* Answer Input (Spoken or Typed) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono text-[#7a8074] uppercase">Your Spoken / Typed Answer</label>
              <button
                type="button"
                onClick={toggleRecording}
                className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-mono font-semibold transition-colors ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-[#efeee6] dark:bg-[#1f231d] text-[#1c1f1a] dark:text-[#e8eae3] border border-[#dddccd] dark:border-[#31362d]'
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-red-600" />}
                <span>{isRecording ? 'Stop Recording' : 'Start Spoken Answer'}</span>
              </button>
            </div>

            <textarea
              rows={6}
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              placeholder="Answer out loud or type your technical response here..."
              className="w-full p-3 text-xs sm:text-sm rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] font-sans leading-relaxed text-[#1c1f1a] dark:text-[#e8eae3]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-mono text-[#7a8074]">
              {transcript.trim().split(/\s+/).filter(Boolean).length} words
            </span>
            <button
              onClick={evaluateAnswer}
              className="inline-flex items-center px-4 py-2 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <Award className="w-3.5 h-3.5 mr-1.5" />
              <span>Evaluate Rubric Scoring</span>
            </button>
          </div>
        </div>

        {/* Right: Rubric Feedback & Evidence */}
        <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-5">
          <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
            <span className="font-serif font-bold text-base">Rubric Evaluation</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-[#7a8074]">Composite Score:</span>
              <span className="font-mono text-base font-bold text-[#17603a] dark:text-[#6fce96]">
                {overallScore}/100
              </span>
            </div>
          </div>

          {/* Rubric Criteria List */}
          <div className="space-y-3.5">
            {rubricScores.map((criterion, idx) => (
              <div key={idx} className="p-3 rounded border border-[#dddccd] dark:border-[#31362d] space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-[#1c1f1a] dark:text-[#e8eae3]">{criterion.name}</span>
                  <span className="font-mono font-bold text-[#17603a] dark:text-[#6fce96]">{criterion.score}/100</span>
                </div>
                <div className="w-full bg-[#efeee6] dark:bg-[#1f231d] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#17603a] dark:bg-[#6fce96] h-full" style={{ width: `${criterion.score}%` }} />
                </div>
                <div className="flex items-start space-x-1.5 pt-1 text-[11px] font-mono text-[#7a8074]">
                  <Quote className="w-3 h-3 flex-shrink-0 mt-0.5 text-[#17603a] dark:text-[#6fce96]" />
                  <span>Evidence: <em className="text-[#1c1f1a] dark:text-[#e8eae3]">{criterion.evidence}</em></span>
                </div>
                <p className="text-[11px] text-[#4c524a] dark:text-[#b3b8ac] pt-0.5">{criterion.feedback}</p>
              </div>
            ))}
          </div>

          {/* Missing Keywords Section */}
          {missingKeywords.length > 0 && (
            <div className="p-3 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
              <span className="font-mono font-bold text-amber-900 dark:text-amber-200 uppercase text-[10px]">
                Recommended Domain Keywords to Include:
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {missingKeywords.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-200 font-mono text-[11px]">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
