'use client';
import React, { useEffect, useState } from 'react';
import { CheckCircle2, Save } from 'lucide-react';

const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all resize-none';

function FormField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-600">{hint}</p>}
    </div>
  );
}

function SaveBar({ onSave, saving, saved }: { onSave: () => void; saving: boolean; saved: boolean }) {
  return (
    <div className="sticky bottom-0 left-0 right-0 p-4 bg-[#0d0d14]/90 backdrop-blur-md border-t border-white/5 flex justify-end">
      <button onClick={onSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-blue-500 transition-all shadow-lg shadow-violet-500/20 disabled:opacity-40">
        {saving ? 'Saving...' : saved ? <><CheckCircle2 size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
      </button>
    </div>
  );
}

export function HeroPanel() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    fetch('/api/admin/settings').then(res => res.json()).then(data => setForm(data.hero || {}));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const existing = await fetch('/api/admin/settings').then(res => res.json());
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...existing, hero: form })
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col gap-5 p-6 overflow-y-auto">
        <FormField label="Subtitle / Title Badge" hint="Displayed in the small pill badge above the heading">
          <input className={inputCls} value={form.subtitle || ''} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
        </FormField>
        <FormField label="Main Tagline (Heading)" hint="The large h1 headline">
          <textarea className={inputCls} rows={3} value={form.tagline || ''} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
        </FormField>
        <FormField label="Description" hint="2–3 sentences explaining your core value proposition">
          <textarea className={inputCls} rows={4} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Primary CTA Button">
            <input className={inputCls} value={form.ctaTextPrimary || ''} onChange={(e) => setForm({ ...form, ctaTextPrimary: e.target.value })} />
          </FormField>
          <FormField label="Secondary CTA Button">
            <input className={inputCls} value={form.ctaTextSecondary || ''} onChange={(e) => setForm({ ...form, ctaTextSecondary: e.target.value })} />
          </FormField>
        </div>
      </div>
      <SaveBar onSave={handleSave} saving={saving} saved={saved} />
    </div>
  );
}

export function AboutPanel() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<any>({});
  const [resumeName, setResumeName] = useState<string>('');
  const [resumeBase64, setResumeBase64] = useState<string>('');

  useEffect(() => {
    fetch('/api/admin/settings').then(res => res.json()).then(data => {
      setForm(data.about || {});
      setResumeName(data.resumeFileName || '');
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const existing = await fetch('/api/admin/settings').then(res => res.json());
    
    const updatePayload: any = { ...existing, about: form };
    if (resumeBase64) {
      updatePayload.resumeFileData = resumeBase64;
      updatePayload.resumeFileName = resumeName;
    }

    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload)
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col gap-5 p-6 overflow-y-auto">
        <FormField label="Bio / About Text" hint="Your main about paragraph displayed in the About section">
          <textarea className={inputCls} rows={6} value={form.bio || ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        </FormField>
        <FormField label="Years of Experience">
          <input className={inputCls} type="number" min="0" value={form.yearsOfExperience || ''} onChange={(e) => setForm({ ...form, yearsOfExperience: Number(e.target.value) })} />
        </FormField>
        
        <div className="mt-4 border-t border-white/10 pt-6">
          <FormField label="Upload Resume (PDF)" hint="This resume will be available for public download.">
            <div className="flex items-center gap-4 mt-2">
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-500/20 file:text-violet-400 hover:file:bg-violet-500/30" />
              {resumeName && <span className="text-sm text-emerald-400">Current: {resumeName}</span>}
            </div>
          </FormField>
        </div>
      </div>
      <SaveBar onSave={handleSave} saving={saving} saved={saved} />
    </div>
  );
}

export function ContactPanel() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    fetch('/api/admin/settings').then(res => res.json()).then(data => setForm(data.contact || {}));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const existing = await fetch('/api/admin/settings').then(res => res.json());
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...existing, contact: form })
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col gap-5 p-6 overflow-y-auto">
        <FormField label="Email Address">
          <input className={inputCls} type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </FormField>
        <FormField label="Phone / WhatsApp">
          <input className={inputCls} value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </FormField>
        <FormField label="Location">
          <input className={inputCls} value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        </FormField>
        <FormField label="Availability Note">
          <textarea className={inputCls} rows={3} value={form.availability || ''} onChange={(e) => setForm({ ...form, availability: e.target.value })} />
        </FormField>
      </div>
      <SaveBar onSave={handleSave} saving={saving} saved={saved} />
    </div>
  );
}
