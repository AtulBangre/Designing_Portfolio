'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Briefcase,
  Star,
  MessageSquare,
  HelpCircle,
  Phone,
  LogOut,
  Save,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  FileText,
  ExternalLink,
} from 'lucide-react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type SectionKey = 'overview' | 'projects' | 'experience' | 'hero' | 'about' | 'services' | 'skills' | 'testimonials' | 'faq' | 'contact';

interface NavItem {
  key: SectionKey;
  label: string;
  icon: React.ElementType;
}

// ─────────────────────────────────────────────
// Sidebar nav items
// ─────────────────────────────────────────────
const navItems: NavItem[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'projects', label: 'Projects', icon: Briefcase },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'hero', label: 'Hero Section', icon: Sparkles },
  { key: 'about', label: 'About', icon: User },
  { key: 'services', label: 'Services', icon: Briefcase },
  { key: 'skills', label: 'Skills', icon: Star },
  { key: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { key: 'faq', label: 'FAQ', icon: HelpCircle },
  { key: 'contact', label: 'Contact', icon: Phone },
];

// ─────────────────────────────────────────────
// Reusable form components
// ─────────────────────────────────────────────
function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-600">{hint}</p>}
    </div>
  );
}

const inputCls =
  'w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all resize-none';

function SaveBar({ onSave, saving, saved }: { onSave: () => void; saving: boolean; saved: boolean }) {
  return (
    <div className="sticky bottom-0 left-0 right-0 p-4 bg-[#0d0d14]/90 backdrop-blur-md border-t border-white/5 flex justify-end">
      <button
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-blue-500 transition-all shadow-lg shadow-violet-500/20 disabled:opacity-40"
      >
        {saving ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Saving…
          </>
        ) : saved ? (
          <>
            <CheckCircle2 size={16} />
            Saved!
          </>
        ) : (
          <>
            <Save size={16} />
            Save Changes
          </>
        )}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Section editors
// ─────────────────────────────────────────────
function OverviewPanel() {
  const sections = [
    { label: 'Hero Section', file: 'data/hero.ts', status: 'Active' },
    { label: 'About', file: 'data/about.ts', status: 'Active' },
    { label: 'Services', file: 'data/services.ts', status: 'Active' },
    { label: 'Skills', file: 'data/skills.ts', status: 'Active' },
    { label: 'Projects', file: 'data/projects/*.ts', status: 'Active' },
    { label: 'Testimonials', file: 'data/testimonials.ts', status: 'Active' },
    { label: 'FAQ', file: 'data/faq.ts', status: 'Active' },
    { label: 'Contact', file: 'data/contact.ts', status: 'Active' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: '7' },
          { label: 'Services Listed', value: '7' },
          { label: 'Testimonials', value: '6' },
          { label: 'FAQ Entries', value: '8' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 flex flex-col gap-1"
          >
            <span className="text-2xl font-bold text-white">{stat.value}</span>
            <span className="text-xs text-gray-500">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/8">
          <h3 className="text-sm font-semibold text-white">Content Sections</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            All content is stored in TypeScript data files. Edit directly or use the section editors in the sidebar.
          </p>
        </div>
        <div className="divide-y divide-white/5">
          {sections.map((s) => (
            <div key={s.label} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3">
                <FileText size={14} className="text-gray-500" />
                <span className="text-sm text-gray-300">{s.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">{s.file}</code>
                <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-5">
        <p className="text-sm text-violet-300 font-medium mb-1">How to Edit Content</p>
        <p className="text-xs text-gray-400 leading-relaxed">
          Use the section editors on the left to make quick changes through this dashboard. For bulk edits, advanced formatting, or project pages, directly edit the{' '}
          <code className="text-violet-300">data/*.ts</code> files in VS Code — changes appear instantly via Next.js hot reload.
        </p>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-xs text-violet-400 hover:text-violet-300 transition-colors"
        >
          <ExternalLink size={12} />
          Preview portfolio →
        </a>
      </div>
    </div>
  );
}


function ComingSoonPanel({ section }: { section: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
        <FileText size={28} className="text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-white">{section} Editor</h3>
      <p className="text-sm text-gray-400 max-w-sm">
        For now, edit this section directly in{' '}
        <code className="text-violet-300">data/{section.toLowerCase().replace(' ', '-')}.ts</code> in VS Code.
        Changes appear instantly with Next.js hot reload.
      </p>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
      >
        <ExternalLink size={14} />
        Preview site
      </a>
    </div>
  );
}

import ProjectsPanel from '@/components/admin/ProjectsPanel';
import ExperiencePanel from '@/components/admin/ExperiencePanel';
import SkillsPanel from '@/components/admin/SkillsPanel';
import { HeroPanel, AboutPanel, ContactPanel } from '@/components/admin/SiteSettingsPanels';

// ─────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────
export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionKey>('overview');
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
    router.refresh();
  };

  const renderPanel = () => {
    switch (activeSection) {
      case 'overview':    return <OverviewPanel />;
      case 'projects':    return <ProjectsPanel />;
      case 'experience':  return <ExperiencePanel />;
      case 'hero':        return <HeroPanel />;
      case 'about':       return <AboutPanel />;
      case 'contact':     return <ContactPanel />;
      case 'services':    return <ComingSoonPanel section="Services" />;
      case 'skills':      return <SkillsPanel />;
      case 'testimonials':return <ComingSoonPanel section="Testimonials" />;
      case 'faq':         return <ComingSoonPanel section="FAQ" />;
      default:            return <OverviewPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex text-white" style={{ fontFamily: 'var(--font-sans, system-ui)' }}>
      
      {/* ── Sidebar ── */}
      <aside className="w-64 shrink-0 flex flex-col border-r border-white/8 bg-[#0d0d14]">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">Portfolio CMS</p>
              <p className="text-[10px] text-gray-500">Atul Bangre</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                  active
                    ? 'bg-violet-500/15 text-violet-300 border border-violet-500/20'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight size={14} className="text-violet-400" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-white/8 flex flex-col gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all"
          >
            <ExternalLink size={16} />
            View Portfolio
          </a>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all disabled:opacity-50"
          >
            <LogOut size={16} />
            {loggingOut ? 'Signing out…' : 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <div className="px-6 py-4 border-b border-white/8 bg-[#0d0d14] flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-base font-semibold text-white">
              {navItems.find((n) => n.key === activeSection)?.label ?? 'Dashboard'}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Portfolio content management
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              ● Live
            </span>
          </div>
        </div>

        {/* Panel */}
        <div className="flex-1 overflow-y-auto">
          {renderPanel()}
        </div>
      </main>
    </div>
  );
}
