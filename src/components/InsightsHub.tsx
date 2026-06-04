"use client";

import React, { useState } from "react";
import { BLOG_POSTS, BlogPost } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, ArrowRight, User2, X } from "lucide-react";

const CATEGORIES = [
  "All Insights",
  "Funding",
  "Trade Finance",
  "MSME Growth",
  "Government Schemes",
  "Startup Finance",
  "Industry Insights"
];

export default function InsightsHub() {
  const [activeCategory, setActiveCategory] = useState("All Insights");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Filter posts
  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (activeCategory === "All Insights") return true;
    return post.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="insights" className="py-24 bg-navy-dark relative border-t border-gold-premium/10">
      {/* Background radial overlay */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-navy-royal/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full w-fit">
              Intellectual Capital
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white">
              The Insights Hub
            </h2>
            <div className="h-[3px] w-16 bg-gold-premium rounded mt-1" />
          </div>
          <p className="text-silver-soft/75 text-sm md:text-base max-w-md leading-relaxed">
            Technical analysis, private credit bulletins, and regulatory scheme breakdowns compiled by our structuring directors.
          </p>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 select-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4.5 py-2 rounded text-xs font-medium tracking-wide whitespace-nowrap transition-colors duration-200 ${
                activeCategory === cat
                  ? "bg-gold-gradient text-navy-dark font-semibold shadow-gold-glow"
                  : "bg-navy-royal/30 text-silver-soft/80 border border-gold-premium/10 hover:border-gold-premium/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid feed */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.article
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                key={post.id}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-gold-premium/35 hover:-translate-y-1 transition-all duration-300 relative group h-full shadow-lg"
              >
                <div>
                  {/* Meta header */}
                  <div className="flex justify-between items-center text-[10px] text-silver-soft/50 font-mono mb-4">
                    <span className="text-gold-champagne font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedPost(post)}
                    className="font-display font-semibold text-white text-lg tracking-wide mb-3 leading-snug group-hover:text-gold-champagne cursor-pointer transition-colors"
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-silver-soft/75 text-xs leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author Block & Read Link */}
                <div className="border-t border-gold-premium/10 pt-4 flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-navy-royal flex items-center justify-center text-gold-premium">
                      <User2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-[11px] font-semibold text-white">
                        {post.author}
                      </span>
                      <span className="text-[9px] font-mono text-silver-soft/40 uppercase tracking-widest mt-0.5">
                        {post.authorRole}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-xs font-semibold text-gold-champagne hover:text-gold-premium transition-colors flex items-center gap-1 group-hover:gap-1.5 duration-200"
                  >
                    Read
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Blog Detail modal overlay */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-navy-dark/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="glass-panel w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl p-6 md:p-8 shadow-2xl relative z-10 flex flex-col gap-5 text-left"
            >
              {/* Close handles */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-silver-soft/50 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[9px] font-mono tracking-widest text-gold-champagne uppercase font-bold px-2 py-0.5 rounded bg-gold-premium/10 border border-gold-premium/20 w-fit block mb-3">
                  {selectedPost.category}
                </span>
                <h3 className="font-display font-bold text-white text-xl md:text-2xl mt-0.5 pr-8 leading-tight">
                  {selectedPost.title}
                </h3>
                
                {/* Meta details */}
                <div className="flex items-center gap-3 text-[10px] text-silver-soft/50 font-mono mt-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedPost.readTime}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="text-silver-soft/90 text-sm leading-relaxed space-y-4 border-t border-b border-gold-premium/15 py-5 my-1">
                {selectedPost.content.split("\n\n").map((para, pi) => (
                  <p key={pi}>{para}</p>
                ))}
              </div>

              {/* Author footer info */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-navy-royal flex items-center justify-center text-gold-premium">
                  <User2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">
                    {selectedPost.author}
                  </span>
                  <span className="text-[10px] font-mono text-silver-soft/40 uppercase tracking-widest">
                    {selectedPost.authorRole} – Ascendra Structuring Desk
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
