'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FaqItem } from '@/types';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';

interface FaqProps {
  faq: FaqItem[];
}

export const FAQ: React.FC<FaqProps> = ({ faq }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative overflow-hidden bg-muted-light/30 dark:bg-zinc-950/20 border-y border-border-line/40">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <SectionHeader 
          title="Frequently Asked Questions" 
          subtitle="FAQ" 
          description="Common questions about my designer client interactions, deliverable formats, and onboarding processes."
          centered
        />

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faq.map((item) => {
            const isOpen = openId === item.id;
            return (
              <Card 
                key={item.id} 
                variant="glass" 
                className="overflow-hidden border border-card-border/80 transition-all duration-300"
                hoverEffect={false}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-heading font-bold text-sm md:text-base text-primary select-none cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{item.question}</span>
                  <span className="p-1 rounded-lg bg-accent/5 dark:bg-accent/15 text-accent border border-accent/10 shrink-0">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                {/* Collapsible Panel Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' as const }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-muted-text font-sans leading-relaxed border-t border-border-line/40">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
