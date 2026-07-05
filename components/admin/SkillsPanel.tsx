'use client';
import React, { useEffect, useState } from 'react';
import { SkillCategory, SkillItem } from '@/types';
import { Edit, Plus, Trash2, Check, X } from 'lucide-react';

export default function SkillsPanel() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<SkillCategory>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/skills');
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  };

  const handleEdit = (cat: SkillCategory) => {
    setEditingId((cat as any)._id);
    setForm(cat);
  };

  const handleCreateNew = () => {
    setEditingId('new');
    setForm({
      title: '',
      skills: [{ name: '', level: 50 }],
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill category?')) return;
    await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleSave = async () => {
    setSaving(true);
    const method = editingId === 'new' ? 'POST' : 'PUT';
    const url = editingId === 'new' ? '/api/admin/skills' : `/api/admin/skills/${editingId}`;
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    
    setSaving(false);
    setEditingId(null);
    fetchData();
  };

  const addSkill = () => {
    setForm({ ...form, skills: [...(form.skills || []), { name: '', level: 50 }] });
  };

  const updateSkill = (index: number, field: keyof SkillItem, value: any) => {
    const newSkills = [...(form.skills || [])];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setForm({ ...form, skills: newSkills });
  };

  const removeSkill = (index: number) => {
    const newSkills = [...(form.skills || [])];
    newSkills.splice(index, 1);
    setForm({ ...form, skills: newSkills });
  };

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500/60';

  if (loading) return <div className="p-8 text-gray-400">Loading skills...</div>;

  if (editingId) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{editingId === 'new' ? 'Add Skill Category' : 'Edit Skill Category'}</h2>
            <button onClick={() => setEditingId(null)} className="p-2 bg-white/5 rounded hover:bg-white/10"><X size={16}/></button>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Category Title (e.g. "Software", "Tools")</label>
            <input className={inputCls} value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} />
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-gray-400">Skills / Tools</label>
              <button onClick={addSkill} className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"><Plus size={14}/> Add Tool</button>
            </div>
            
            <div className="space-y-3">
              {(form.skills || []).map((skill, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="flex-1">
                    <input placeholder="Tool Name" className={inputCls} value={skill.name} onChange={e => updateSkill(idx, 'name', e.target.value)} />
                  </div>
                  <div className="w-24">
                    <input type="number" min="0" max="100" placeholder="Level %" className={inputCls} value={skill.level} onChange={e => updateSkill(idx, 'level', Number(e.target.value))} />
                  </div>
                  <button onClick={() => removeSkill(idx)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-[#0d0d14]/90 border-t border-white/5 flex justify-end">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500">
            {saving ? 'Saving...' : <><Check size={16}/> Save Skills</>}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Manage Skills & Tools</h2>
        <button onClick={handleCreateNew} className="flex items-center gap-2 px-4 py-2 bg-violet-600 rounded-lg text-sm font-medium hover:bg-violet-500">
          <Plus size={16} /> Add Category
        </button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((cat: any) => (
          <div key={cat._id} className="p-5 bg-white/[0.03] border border-white/10 rounded-xl flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-white">{cat.title}</h3>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(cat)} className="p-1.5 hover:bg-white/10 rounded text-gray-300"><Edit size={14}/></button>
                <button onClick={() => handleDelete(cat._id)} className="p-1.5 hover:bg-red-500/20 rounded text-red-400"><Trash2 size={14}/></button>
              </div>
            </div>
            
            <div className="space-y-2 flex-1">
              {cat.skills.map((s: any, i: number) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{s.name}</span>
                  <span className="text-gray-500 text-xs bg-white/5 px-2 py-0.5 rounded">{s.level}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
