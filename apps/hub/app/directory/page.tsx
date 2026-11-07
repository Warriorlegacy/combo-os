'use client';

import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Check, X, Shield, Download, Sparkles, Filter } from 'lucide-react';
import { seedTools } from '../../../worker-api/src/db/seed-data';

export default function DirectoryPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [commercialOnly, setCommercialOnly] = useState(false);
  const [noCcOnly, setNoCcOnly] = useState(false);

  const categories = ['All', 'Frontend', 'Compute', 'Database', 'Storage', 'AI & ML', 'Dev Tools', 'Media'];

  const filteredTools = useMemo(() => {
    return seedTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.free_tier.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesCommercial = !commercialOnly || tool.commercial_ok;
      const matchesNoCc = !noCcOnly || !tool.cc_required;

      return matchesSearch && matchesCategory && matchesCommercial && matchesNoCc;
    });
  }, [search, selectedCategory, commercialOnly, noCcOnly]);

  const exportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredTools, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `free-stack-tools-${selectedCategory.toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#17603a] dark:text-[#6fce96] uppercase tracking-wider">
          <span>Tabworthy & Free-for-Dev Engine</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1c1f1a] dark:text-[#e8eae3]">
          Curated Free Developer Stack & Hidden Gems
        </h1>
        <p className="text-sm sm:text-base text-[#4c524a] dark:text-[#b3b8ac] max-w-2xl">
          Hand-picked tools with perpetual free tiers for hosting, storage, AI, and developer leverage. Every quota verified—zero credit card surprises.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-4 p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d]">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#7a8074] dark:text-[#828a7d]" />
            <input
              type="text"
              placeholder="Search 504+ tools, free quotas, database types..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-md border border-[#dddccd] dark:border-[#31362d] bg-[#f7f6f1] dark:bg-[#1f231d] text-[#1c1f1a] dark:text-[#e8eae3] focus:outline-none focus:ring-1 focus:ring-[#17603a]"
            />
          </div>
          <button
            onClick={exportJson}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-mono rounded border border-[#dddccd] dark:border-[#31362d] bg-[#fffef9] dark:bg-[#181b16] hover:bg-[#efeee6] dark:hover:bg-[#1f231d] transition-colors"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            <span>Export JSON</span>
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1c1f1a] text-[#fffef9] dark:bg-[#e8eae3] dark:text-[#111410] font-semibold'
                  : 'bg-[#efeee6] dark:bg-[#1f231d] text-[#4c524a] dark:text-[#b3b8ac] hover:bg-[#dddccd] dark:hover:bg-[#31362d]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-sans text-[#4c524a] dark:text-[#b3b8ac]">
          <label className="flex items-center space-x-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={commercialOnly}
              onChange={(e) => setCommercialOnly(e.target.checked)}
              className="rounded border-[#dddccd] text-[#17603a] focus:ring-[#17603a]"
            />
            <span>Commercial Use Approved Only</span>
          </label>
          <label className="flex items-center space-x-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={noCcOnly}
              onChange={(e) => setNoCcOnly(e.target.checked)}
              className="rounded border-[#dddccd] text-[#17603a] focus:ring-[#17603a]"
            />
            <span>No Credit Card Required</span>
          </label>
          <span className="font-mono text-xs text-[#7a8074] dark:text-[#828a7d] ml-auto">
            Showing {filteredTools.length} of {seedTools.length} curated services
          </span>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="p-5 rounded-lg bg-[#fffef9] dark:bg-[#181b16] border border-[#dddccd] dark:border-[#31362d] flex flex-col justify-between space-y-4 hover:border-[#17603a] transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[11px] text-[#17603a] dark:text-[#6fce96] uppercase font-semibold">
                    {tool.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#1c1f1a] dark:text-[#e8eae3] mt-0.5">
                    {tool.name}
                  </h3>
                </div>
                <div className="flex items-center space-x-1 font-mono text-xs px-2 py-0.5 rounded bg-[#e3efe4] dark:bg-[#1d2f22] text-[#17603a] dark:text-[#6fce96]">
                  <Sparkles className="w-3 h-3" />
                  <span>{tool.unslop_score}/10</span>
                </div>
              </div>

              <p className="text-xs text-[#4c524a] dark:text-[#b3b8ac] leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#dddccd] dark:border-[#31362d]">
              <div>
                <div className="font-mono text-[10px] text-[#7a8074] dark:text-[#828a7d] uppercase">FREE TIER QUOTA</div>
                <div className="text-xs font-mono font-medium text-[#1c1f1a] dark:text-[#e8eae3] mt-0.5">
                  {tool.free_tier}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-2 text-[11px] font-mono">
                  {tool.commercial_ok ? (
                    <span className="text-emerald-700 dark:text-emerald-400">✓ Commercial OK</span>
                  ) : (
                    <span className="text-amber-700 dark:text-amber-400">Personal Only</span>
                  )}
                  <span>•</span>
                  {tool.cc_required ? (
                    <span className="text-amber-700 dark:text-amber-400">CC Req</span>
                  ) : (
                    <span className="text-blue-700 dark:text-blue-400">No CC</span>
                  )}
                </div>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-sans text-[#17603a] dark:text-[#6fce96] hover:underline"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

