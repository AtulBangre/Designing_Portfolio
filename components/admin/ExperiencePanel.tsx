'use client';
import React, { useEffect, useState } from 'react';
import { ExperienceItem } from '@/types';
import { Edit, Plus, Trash2, Check, X } from 'lucide-react';

export default function ExperiencePanel() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<ExperienceItem>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/experience');
    const data = await res.json();
    setExperiences(data);
    setLoading(false);
  };

  const handleEdit = (exp: ExperienceItem) => {
    setEditingId((exp as any)._id);
    setForm(exp);
  };

  const handleCreateNew = () => {
    setEditingId('new');
    setForm({
      role: '',
      company: '',
      duration: '',
      description: [''],
      skillsLearned: [''],
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    await fetch(`/api/admin/experience/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleSave = async () => {
    setSaving(true);
    const method = editingId === 'new' ? 'POST' : 'PUT';
    const url = editingId === 'new' ? '/api/admin/experience' : `/api/admin/experience/${editingId}`;
    
    // Convert array inputs
    const payload = {
      ...form,
      description: typeof form.description === 'string' ? (form.description as string).split('\n').filter(Boolean) : form.description,
      skillsLearned: typeof form.skillsLearned === 'string' ? (form.skillsLearned as string).split(',').map(s => s.trim()).filter(Boolean) : form.skillsLearned,
    };

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    setSaving(false);
    setEditingId(null);
    fetchData();
  };

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500/60';

  if (loading) return <div className="p-8 text-gray-400">Loading experience...</div>;

  if (editingId) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{editingId === 'new' ? 'Add Experience' : 'Edit Experience'}</h2>
            <button onClick={() => setEditingId(null)} className="p-2 bg-white/5 rounded hover:bg-white/10"><X size={16}/></button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Role / Job Title</label>
              <input className={inputCls} value={form.role || ''} onChange={e => setForm({...form, role: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Company</label>
              <input className={inputCls} value={form.company || ''} onChange={e => setForm({...form, company: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-400 mb-1">Duration (e.g., "Jan 2022 - Present")</label>
              <input className={inputCls} value={form.duration || ''} onChange={e => setForm({...form, duration: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-400 mb-1">Description (One bullet point per line)</label>
              <textarea 
                className={inputCls} 
                rows={5} 
                value={Array.isArray(form.description) ? form.description.join('\n') : form.description || ''} 
                onChange={e => setForm({...form, description: e.target.value as any})} 
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-400 mb-1">Skills Learned (Comma separated)</label>
              <input 
                className={inputCls} 
                value={Array.isArray(form.skillsLearned) ? form.skillsLearned.join(', ') : form.skillsLearned || ''} 
                onChange={e => setForm({...form, skillsLearned: e.target.value as any})} 
              />
            </div>
          </div>
        </div>
        
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-[#0d0d14]/90 border-t border-white/5 flex justify-end">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500">
            {saving ? 'Saving...' : <><Check size={16}/> Save Experience</>}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Manage Experience</h2>
        <button onClick={handleCreateNew} className="flex items-center gap-2 px-4 py-2 bg-violet-600 rounded-lg text-sm font-medium hover:bg-violet-500">
          <Plus size={16} /> Add Experience
        </button>
      </div>
      
      <div className="grid gap-3">
        {experiences.map((exp: any) => (
          <div key={exp._id} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/10 rounded-xl">
            <div>
              <h3 className="font-medium text-white">{exp.role}</h3>
              <p className="text-xs text-gray-500 mt-1">{exp.company} • {exp.duration}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(exp)} className="p-2 hover:bg-white/10 rounded text-gray-300"><Edit size={16}/></button>
              <button onClick={() => handleDelete(exp._id)} className="p-2 hover:bg-red-500/20 rounded text-red-400"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
