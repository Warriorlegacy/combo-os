'use client';

import React, { useState } from 'react';
import { Mic, MicOff, Play, CheckCircle2, Award, Sparkles, RefreshCw } from 'lucide-react';
import type { InterviewSession } from '@combo/shared-types';

const SAMPLE_QUESTIONS = [
  'How do you prevent hallucinations in high-stakes customer-facing LLM deployments?',
  'Explain how to design an architecture that costs $0 ongoing hosting fees using Cloudflare Pages, Workers, D1, and R2.',
  'Describe a failure mode in a production RAG system you solved with measurable evaluation benchmarks.'
];

export default function InterviewCoachPage() {
  const [selectedQuestion, setSelectedQuestion] = useState(SAMPLE_QUESTIONS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('We implemented strict retrieval-augmented generation with verified document citations, an automated confidence refusal gate below 0.65 similarity, and an offline golden benchmark test set measuring groundedness and refusal accuracy continuously.');
  const [session, setSession] = useState<InterviewSession | null>({
    id: 'int-1',
    role_target: 'Senior Generative AI & Systems Engineer',
    question: SAMPLE_QUESTIONS[0],
    user_answer_transcript: 'We implemented strict retrieval-augmented generation with verified document citations, an automated confidence refusal gate below 0.65 similarity, and an offline golden benchmark test set measuring groundedness and refusal accuracy continuously.',
    score_communication: 94,
    score_technical: 96,
    score_star_structure: 90,
    specific_feedback: 'Excellent use of concrete metrics (0.65 threshold) and clear explanation of refusal gating. Structured STAR response.',
    created_at: new Date().toISOString()
  });

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate listening
      setTimeout(() => {
        setIsRecording(false);
      }, 3500);
    } else {
      setIsRecording(false);
    }
  };

  const evaluateAnswer = () => {
    const wordCount = transcript.trim().split(/\s+/).length;
    const hasMetrics = /\d+%|\d+ms|\d+/.test(transcript);
    const scoreComm = Math.min(98, 70 + (wordCount > 15 ? 18 : 5));
    const scoreTech = Math.min(98, 75 + (hasMetrics ? 18 : 6));
    const scoreStar = Math.min(95, 78 + (hasMetrics ? 14 : 5));

    setSession({
      id: `int-${Date.now()}`,
      role_target: 'Generative AI Engineer',
      question: selectedQuestion,
      user_answer_transcript: transcript,
      score_communication: scoreComm,
      score_technical: scoreTech,
      score_star_structure: scoreStar,
      specific_feedback: hasMetrics
        ? 'Outstanding response! Quantifiable numbers give interviewers immediate proof of senior-level capability.'
        : 'Good technical overview, but include exact metrics (e.g. latency numbers, percent accuracy) to strengthen the impact.',
      created_at: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider">
          <span>Project #10 · High-Yield Production MVP</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1c1f1a] dark:text-[#e8eae3]">
          AI Interview Prep Coach (Mobile PWA)
        </h1>
        <p className="text-sm sm:text-base text-[#4c524a] dark:text-[#b3b8ac] max-w-2xl">
          Voice mock interviews for high-paying remote roles. Answer technical questions out loud, get evaluated on the STAR framework, and receive calibrated scoring before talking to real interviewers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Voice Interview Simulator */}
        <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-4">
          <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
            <span className="font-serif font-bold text-base">Mock Interview Terminal</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
              Web Speech PWA Active
            </span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#7a8074] uppercase">Select Target Question:</label>
            <div className="space-y-1.5">
              {SAMPLE_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedQuestion(q)}
                  className={`w-full p-2.5 rounded border text-left text-xs transition-colors ${
                    selectedQuestion === q
                      ? 'border-[#17603a] bg-[#e3efe4] dark:bg-[#1d2f22] font-semibold'
                      : 'border-[#dddccd] dark:border-[#31362d] hover:bg-[#efeee6] dark:hover:bg-[#1f231d]'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Microphone Trigger */}
          <div className="p-6 rounded-lg bg-[#f7f6f1] dark:bg-[#1f231d] border border-[#dddccd] dark:border-[#31362d] flex flex-col items-center justify-center space-y-3 text-center">
            <button
              onClick={toggleRecording}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse scale-110'
                  : 'bg-[#17603a] text-white hover:scale-105'
              }`}
            >
              {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
            </button>
            <div className="text-xs font-mono">
              {isRecording ? (
                <span className="text-rose-600 font-bold">Listening... Speak your answer now</span>
              ) : (
                <span className="text-[#7a8074]">Click mic to record spoken answer</span>
              )}
            </div>
          </div>

          {/* Transcript box */}
          <div className="space-y-1">
            <label className="block text-xs font-mono text-[#7a8074] uppercase">Spoken Answer Transcript:</label>
            <textarea
              rows={4}
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              className="w-full p-2.5 text-xs rounded border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] leading-relaxed"
            />
          </div>

          <button
            onClick={evaluateAnswer}
            className="w-full py-2.5 rounded bg-[#17603a] text-white dark:bg-[#6fce96] dark:text-[#111410] font-sans text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Score My Answer via STAR Framework
          </button>
        </div>

        {/* Right: Rubric Scoring & Feedback */}
        {session && (
          <div className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] space-y-5">
            <div className="flex items-center justify-between border-b border-[#dddccd] dark:border-[#31362d] pb-2">
              <span className="font-serif font-bold text-base">STAR Rubric Evaluation</span>
              <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-bold">✓ PASS</span>
            </div>

            {/* Score Meters */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded bg-[#f7f6f1] dark:bg-[#1f231d] border border-[#dddccd] dark:border-[#31362d] text-center">
                <div className="font-mono text-[10px] text-[#7a8074] uppercase">TECHNICAL</div>
                <div className="font-serif text-2xl font-bold text-[#17603a] dark:text-[#6fce96] mt-1">
                  {session.score_technical}%
                </div>
              </div>

              <div className="p-3 rounded bg-[#f7f6f1] dark:bg-[#1f231d] border border-[#dddccd] dark:border-[#31362d] text-center">
                <div className="font-mono text-[10px] text-[#7a8074] uppercase">COMMUNICATION</div>
                <div className="font-serif text-2xl font-bold text-[#1c1f1a] dark:text-[#e8eae3] mt-1">
                  {session.score_communication}%
                </div>
              </div>

              <div className="p-3 rounded bg-[#f7f6f1] dark:bg-[#1f231d] border border-[#dddccd] dark:border-[#31362d] text-center">
                <div className="font-mono text-[10px] text-[#7a8074] uppercase">STAR STRUCTURE</div>
                <div className="font-serif text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-1">
                  {session.score_star_structure}%
                </div>
              </div>
            </div>

            {/* Specific Actionable Feedback */}
            <div className="p-4 rounded bg-[#e3efe4] dark:bg-[#1d2f22] border border-[#17603a]/20 space-y-1.5 text-xs text-[#1c1f1a] dark:text-[#e8eae3]">
              <div className="font-serif font-bold flex items-center space-x-1.5 text-[#17603a] dark:text-[#6fce96]">
                <Sparkles className="w-4 h-4" />
                <span>Coach Feedback</span>
              </div>
              <p className="leading-relaxed">{session.specific_feedback}</p>
            </div>

            <div className="p-3 rounded border border-[#dddccd] dark:border-[#31362d] text-[11px] text-[#7a8074] space-y-1">
              <strong>STAR Framework Breakdown:</strong>
              <p>• <strong>Situation:</strong> Contextualize the challenge (e.g. client API limits)</p>
              <p>• <strong>Task:</strong> Your exact responsibility (e.g. edge fallback pipeline)</p>
              <p>• <strong>Action:</strong> What you built (e.g. Cloudflare D1 + Groq router)</p>
              <p>• <strong>Result:</strong> Quantified outcome (e.g. $0 hosting cost, 98% accuracy)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

