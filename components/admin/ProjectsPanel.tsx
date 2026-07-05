'use client';
import React, { useEffect, useState } from 'react';
import { Project } from '@/types';
import { Edit, Plus, Trash2, Check, X } from 'lucide-react';

export default function ProjectsPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Project>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/projects');
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  const handleEdit = (project: Project) => {
    setEditingId((project as any)._id);
    setForm(project);
  };

  const handleCreateNew = () => {
    setEditingId('new');
    setForm({
      title: '',
      slug: '',
      category: '',
      description: '',
      coverImage: '',
      projectUrl: '',
      year: new Date().getFullYear(),
      client: '',
      featured: false,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  const handleSave = async () => {
    setSaving(true);
    const method = editingId === 'new' ? 'POST' : 'PUT';
    const url = editingId === 'new' ? '/api/admin/projects' : `/api/admin/projects/${editingId}`;
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    
    setSaving(false);
    setEditingId(null);
    fetchProjects();
  };

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500/60';

  if (loading) return <div className="p-8 text-gray-400">Loading projects...</div>;

  if (editingId) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{editingId === 'new' ? 'Create Project' : 'Edit Project'}</h2>
            <button onClick={() => setEditingId(null)} className="p-2 bg-white/5 rounded hover:bg-white/10"><X size={16}/></button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Title</label>
              <input className={inputCls} value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Slug (URL)</label>
              <input className={inputCls} value={form.slug || ''} onChange={e => setForm({...form, slug: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Category</label>
              <input className={inputCls} value={form.category || ''} onChange={e => setForm({...form, category: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Year</label>
              <input className={inputCls} type="number" value={form.year || ''} onChange={e => setForm({...form, year: Number(e.target.value)})} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-400 mb-1">External Link (Behance / Live Site)</label>
              <input className={inputCls} placeholder="https://behance.net/..." value={form.projectUrl || ''} onChange={e => setForm({...form, projectUrl: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-400 mb-1">Cover Image URL</label>
              <input className={inputCls} value={form.coverImage || ''} onChange={e => setForm({...form, coverImage: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-400 mb-1">Description</label>
              <textarea className={inputCls} rows={4} value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.featured || false} onChange={e => setForm({...form, featured: e.target.checked})} id="featured" />
              <label htmlFor="featured" className="text-sm">Featured Project</label>
            </div>
          </div>
        </div>
        
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-[#0d0d14]/90 border-t border-white/5 flex justify-end">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500">
            {saving ? 'Saving...' : <><Check size={16}/> Save Project</>}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Manage Projects</h2>
        <button onClick={handleCreateNew} className="flex items-center gap-2 px-4 py-2 bg-violet-600 rounded-lg text-sm font-medium hover:bg-violet-500">
          <Plus size={16} /> New Project
        </button>
      </div>
      
      <div className="grid gap-3">
        {projects.map((p: any) => (
          <div key={p._id} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/10 rounded-xl">
            <div>
              <h3 className="font-medium text-white flex items-center gap-2">
                {p.title}
                {p.featured && <span className="text-[10px] uppercase tracking-wider bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded">Featured</span>}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{p.category} • {p.year}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="p-2 hover:bg-white/10 rounded text-gray-300"><Edit size={16}/></button>
              <button onClick={() => handleDelete(p._id)} className="p-2 hover:bg-red-500/20 rounded text-red-400"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
