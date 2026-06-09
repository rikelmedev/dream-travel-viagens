import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Map, BookOpen, Settings,
  Plus, Trash2, Key, Loader2, X, Upload,
  Globe, FileText, Users, ToggleLeft, ToggleRight,
  LogOut, Eye, EyeOff, Copy, Check, Route, Pencil
} from 'lucide-react';
import { Button } from '@/components/painel/button';
import { toast } from 'sonner';
import { uploadImage } from '@/lib/supabase';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useLocation } from 'wouter';

// ── Types ──────────────────────────────────────────────────────────────────

interface Destination {
  id: number; title: string; location: string;
  image: string; price: string; rating: number; size: string;
}
interface Post {
  id: number; title: string; slug: string; cover_image: string | null;
  category: string | null; content: string; status: string | null;
  created_at: string | null;
}
interface VipCode {
  id: number; code: string; client_name: string;
  notes: string | null; is_active: boolean | null; created_at: string | null;
}
interface Stats {
  destinations: number; postsPublished: number;
  postsDraft: number; vipActive: number; vipTotal: number;
}
interface ItineraryDay { day: number; title: string; description: string; location: string; }
interface Itinerary {
  id: number; vip_code: string; destination: string; image_url: string | null;
  start_date: string | null; flight_detail: string | null; flight_sub: string | null;
  hotel_detail: string | null; hotel_sub: string | null;
  transfer_detail: string | null; transfer_sub: string | null;
  days: ItineraryDay[];
}

// ── Helpers ────────────────────────────────────────────────────────────────

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function formatPrice(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  return Number(digits).toLocaleString('pt-BR');
}

function generateCode(name: string) {
  const base = name.trim().split(' ')[0].toUpperCase().replace(/[^A-Z]/g, '');
  return `${base}${new Date().getFullYear()}`;
}

// ── Image Upload Button ────────────────────────────────────────────────────

function ImageUploadField({
  label, value, onChange, folder
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: 'destinations' | 'blog';
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
      toast.success('Imagem carregada com sucesso');
    } catch (err: any) {
      toast.error('Erro ao fazer upload: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="w-full border-2 border-dashed border-gray-200 rounded-xl p-4 cursor-pointer hover:border-[#C18D41]/50 transition-colors group"
      >
        {value ? (
          <div className="flex items-center gap-3">
            <img src={value} alt="preview" className="w-16 h-12 object-cover rounded-lg" />
            <span className="text-xs text-gray-500 truncate flex-1">{value.split('/').pop()}</span>
            <span className="text-[10px] text-[#C18D41] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Alterar</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-3 gap-2">
            {uploading
              ? <Loader2 className="w-5 h-5 animate-spin text-[#C18D41]" />
              : <Upload className="w-5 h-5 text-gray-300 group-hover:text-[#C18D41] transition-colors" />
            }
            <span className="text-xs text-gray-400">{uploading ? 'A carregar...' : 'Clique para selecionar imagem'}</span>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function AdminPanel() {
  const { logout } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');

  const [stats, setStats] = useState<Stats | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [vipCodes, setVipCodes] = useState<VipCode[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modals
  const [showDestModal, setShowDestModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showVipModal, setShowVipModal] = useState(false);
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState<Itinerary | null>(null);

  // Forms
  const DEST_EMPTY = { title: '', location: '', description: '', image: '', price: '', rating: 5.0, category: 'praia', size: 'medium' };
  const POST_EMPTY = { title: '', slug: '', excerpt: '', cover_image: '', category: 'Viagem', location: '', content: '', status: 'draft', featured: false };
  const VIP_EMPTY = { code: '', client_name: '', notes: '' };
  const ITIN_EMPTY = {
    vip_code: '', destination: '', image_url: '', start_date: '',
    flight_detail: '', flight_sub: '', hotel_detail: '', hotel_sub: '',
    transfer_detail: '', transfer_sub: '', days: [] as ItineraryDay[],
  };

  const [destForm, setDestForm] = useState(DEST_EMPTY);
  const [postForm, setPostForm] = useState(POST_EMPTY);
  const [vipForm, setVipForm] = useState(VIP_EMPTY);
  const [itinForm, setItinForm] = useState(ITIN_EMPTY);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const sidebarLinks = [
    { id: 'dashboard', label: 'Visao Geral', icon: LayoutDashboard },
    { id: 'destinations', label: 'Catalogo', icon: Map },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'vip', label: 'Acessos VIP', icon: Key },
    { id: 'itineraries', label: 'Roteiros VIP', icon: Route },
    { id: 'settings', label: 'Configuracoes', icon: Settings },
  ];

  // ── Loaders ──────────────────────────────────────────────────────────────

  const loadStats = async () => {
    const res = await fetch('/api/stats');
    const data = await res.json();
    setStats(data);
  };

  const loadDestinations = async () => {
    setIsLoading(true);
    const res = await fetch('/api/destinations');
    setDestinations(Array.isArray(await res.json()) ? await (await fetch('/api/destinations')).json() : []);
    setIsLoading(false);
  };

  const loadPosts = async () => {
    setIsLoading(true);
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setIsLoading(false);
  };

  const loadVipCodes = async () => {
    setIsLoading(true);
    const res = await fetch('/api/vip-codes');
    const data = await res.json();
    setVipCodes(Array.isArray(data) ? data : []);
    setIsLoading(false);
  };

  const loadItineraries = async () => {
    setIsLoading(true);
    const res = await fetch('/api/itineraries');
    const data = await res.json();
    setItineraries(Array.isArray(data) ? data : []);
    setIsLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'dashboard') loadStats();
    if (activeTab === 'destinations') loadDestinations();
    if (activeTab === 'blog') loadPosts();
    if (activeTab === 'vip') loadVipCodes();
    if (activeTab === 'itineraries') loadItineraries();
  }, [activeTab]);

  // ── Actions: Destinations ─────────────────────────────────────────────────

  const createDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...destForm, rating: Number(destForm.rating) }),
      });
      if (!res.ok) { toast.error('Erro ao criar destino'); return; }
      const created = await res.json();
      setDestinations(prev => [...prev, created]);
      toast.success('Destino criado');
      setShowDestModal(false);
      setDestForm(DEST_EMPTY);
      loadStats();
    } finally { setSaving(false); }
  };

  const deleteDestination = async (id: number) => {
    await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
    setDestinations(prev => prev.filter(d => d.id !== id));
    toast.success('Destino removido');
    loadStats();
  };

  // ── Actions: Posts ────────────────────────────────────────────────────────

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...postForm, slug: postForm.slug || slugify(postForm.title) };
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) { toast.error('Erro ao criar post'); return; }
      const created = await res.json();
      setPosts(prev => [...prev, created]);
      toast.success('Post criado');
      setShowPostModal(false);
      setPostForm(POST_EMPTY);
      loadStats();
    } finally { setSaving(false); }
  };

  const togglePostStatus = async (post: Post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    const res = await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    const updated = await res.json();
    setPosts(prev => prev.map(p => p.id === post.id ? updated : p));
    toast.success(newStatus === 'published' ? 'Post publicado' : 'Movido para rascunho');
    loadStats();
  };

  const deletePost = async (id: number) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts(prev => prev.filter(p => p.id !== id));
    toast.success('Post removido');
    loadStats();
  };

  // ── Actions: VIP ─────────────────────────────────────────────────────────

  const createVipCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/vip-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vipForm),
      });
      if (!res.ok) { toast.error('Erro ao criar codigo'); return; }
      const created = await res.json();
      setVipCodes(prev => [...prev, created]);
      toast.success('Codigo VIP criado');
      setShowVipModal(false);
      setVipForm(VIP_EMPTY);
      loadStats();
    } finally { setSaving(false); }
  };

  const toggleVipCode = async (id: number) => {
    const res = await fetch(`/api/vip-codes/${id}/toggle`, { method: 'PATCH' });
    const updated = await res.json();
    setVipCodes(prev => prev.map(v => v.id === id ? updated : v));
    toast.success(updated.is_active ? 'Codigo ativado' : 'Codigo desativado');
    loadStats();
  };

  const deleteVipCode = async (id: number) => {
    await fetch(`/api/vip-codes/${id}`, { method: 'DELETE' });
    setVipCodes(prev => prev.filter(v => v.id !== id));
    toast.success('Codigo removido');
    loadStats();
  };

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // ── Actions: Itineraries ──────────────────────────────────────────────────

  const openNewItinerary = () => {
    setEditingItinerary(null);
    setItinForm(ITIN_EMPTY);
    setShowItineraryModal(true);
  };

  const openEditItinerary = (itin: Itinerary) => {
    setEditingItinerary(itin);
    setItinForm({
      vip_code: itin.vip_code, destination: itin.destination,
      image_url: itin.image_url || '', start_date: itin.start_date || '',
      flight_detail: itin.flight_detail || '', flight_sub: itin.flight_sub || '',
      hotel_detail: itin.hotel_detail || '', hotel_sub: itin.hotel_sub || '',
      transfer_detail: itin.transfer_detail || '', transfer_sub: itin.transfer_sub || '',
      days: itin.days || [],
    });
    setShowItineraryModal(true);
  };

  const saveItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...itinForm, vip_code: itinForm.vip_code.toUpperCase() };
      let res: Response;
      if (editingItinerary) {
        res = await fetch(`/api/itineraries/${editingItinerary.vip_code}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/itineraries', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
        });
      }
      if (!res.ok) { const e = await res.json(); toast.error(e.error || 'Erro ao salvar roteiro'); return; }
      toast.success(editingItinerary ? 'Roteiro atualizado' : 'Roteiro criado');
      setShowItineraryModal(false);
      loadItineraries();
    } catch { toast.error('Erro de ligacao'); }
    finally { setSaving(false); }
  };

  const deleteItinerary = async (vip_code: string) => {
    if (!confirm(`Remover roteiro de ${vip_code}?`)) return;
    await fetch(`/api/itineraries/${vip_code}`, { method: 'DELETE' });
    setItineraries(prev => prev.filter(i => i.vip_code !== vip_code));
    toast.success('Roteiro removido');
  };

  const addDay = () => {
    const nextDay = (itinForm.days.length > 0 ? Math.max(...itinForm.days.map(d => d.day)) : 0) + 1;
    setItinForm(f => ({ ...f, days: [...f.days, { day: nextDay, title: '', description: '', location: '' }] }));
  };

  const updateDay = (index: number, field: keyof ItineraryDay, value: string | number) => {
    setItinForm(f => {
      const days = [...f.days];
      days[index] = { ...days[index], [field]: value };
      return { ...f, days };
    });
  };

  const removeDay = (index: number) => {
    setItinForm(f => ({ ...f, days: f.days.filter((_, i) => i !== index) }));
  };

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex h-screen bg-[#FAF9F6] font-sans overflow-hidden">

      {/* Sidebar */}
      <aside className="w-72 bg-[#05070a] hidden md:flex flex-col">
        <div className="p-8 flex-1">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-[#C18D41] rounded-xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg shadow-[#C18D41]/20">D</div>
            <div>
              <h1 className="font-serif font-bold text-white text-xl">Dream Travel</h1>
              <p className="text-[9px] text-[#C18D41] font-bold uppercase tracking-[0.3em] mt-1">Control Room</p>
            </div>
          </div>
          <nav className="space-y-2">
            {sidebarLinks.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-8 border-t border-white/5">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-white/30 hover:text-white hover:bg-white/5 transition-all font-bold text-[10px] uppercase tracking-widest">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-10 lg:p-16">

          {/* Header */}
          <header className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-bold font-serif text-[#05070a]">
              {sidebarLinks.find(l => l.id === activeTab)?.label}
            </h2>
            {activeTab === 'destinations' && (
              <Button onClick={() => setShowDestModal(true)} className="bg-[#05070a] hover:bg-[#C18D41] text-white rounded-2xl px-6 h-12">
                <Plus className="w-4 h-4 mr-2" /> Novo Destino
              </Button>
            )}
            {activeTab === 'blog' && (
              <Button onClick={() => setShowPostModal(true)} className="bg-[#05070a] hover:bg-[#C18D41] text-white rounded-2xl px-6 h-12">
                <Plus className="w-4 h-4 mr-2" /> Novo Post
              </Button>
            )}
            {activeTab === 'vip' && (
              <Button onClick={() => setShowVipModal(true)} className="bg-[#05070a] hover:bg-[#C18D41] text-white rounded-2xl px-6 h-12">
                <Plus className="w-4 h-4 mr-2" /> Novo Acesso
              </Button>
            )}
            {activeTab === 'itineraries' && (
              <Button onClick={openNewItinerary} className="bg-[#05070a] hover:bg-[#C18D41] text-white rounded-2xl px-6 h-12">
                <Plus className="w-4 h-4 mr-2" /> Novo Roteiro
              </Button>
            )}
          </header>

          <AnimatePresence mode="wait">

            {/* ── DASHBOARD ── */}
            {activeTab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {!stats ? (
                  <div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-gray-300" /></div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Destinos', value: stats.destinations, icon: Globe, color: 'text-blue-500', bg: 'bg-blue-50' },
                      { label: 'Posts Publicados', value: stats.postsPublished, icon: Eye, color: 'text-green-500', bg: 'bg-green-50' },
                      { label: 'Rascunhos', value: stats.postsDraft, icon: FileText, color: 'text-amber-500', bg: 'bg-amber-50' },
                      { label: 'Acessos VIP Ativos', value: stats.vipActive, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
                    ].map(({ label, value, icon: Icon, color, bg }) => (
                      <div key={label} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-5`}>
                          <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <p className="text-4xl font-serif font-bold text-[#05070a]">{value}</p>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-2">{label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── CATALOGO ── */}
            {activeTab === 'destinations' && (
              <motion.div key="destinations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {isLoading ? (
                  <div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-gray-300" /></div>
                ) : destinations.length === 0 ? (
                  <EmptyState icon={Map} label="Nenhum destino cadastrado" onAdd={() => setShowDestModal(true)} />
                ) : (
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="p-6 text-left text-xs text-gray-400 font-bold uppercase tracking-widest">Destino</th>
                          <th className="p-6 text-left text-xs text-gray-400 font-bold uppercase tracking-widest">Local</th>
                          <th className="p-6 text-left text-xs text-gray-400 font-bold uppercase tracking-widest">Preco</th>
                          <th className="p-6 text-left text-xs text-gray-400 font-bold uppercase tracking-widest">Rating</th>
                          <th className="p-6" />
                        </tr>
                      </thead>
                      <tbody>
                        {destinations.map(dest => (
                          <tr key={dest.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                            <td className="p-6">
                              <div className="flex items-center gap-4">
                                <img src={dest.image} alt={dest.title} className="w-12 h-10 object-cover rounded-xl bg-gray-100" />
                                <span className="font-bold text-[#05070a]">{dest.title}</span>
                              </div>
                            </td>
                            <td className="p-6 text-gray-500 text-sm">{dest.location}</td>
                            <td className="p-6 text-gray-500 text-sm">R$ {dest.price}</td>
                            <td className="p-6 text-gray-500 text-sm">{dest.rating}</td>
                            <td className="p-6 text-right">
                              <button onClick={() => deleteDestination(dest.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── BLOG ── */}
            {activeTab === 'blog' && (
              <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {isLoading ? (
                  <div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-gray-300" /></div>
                ) : posts.length === 0 ? (
                  <EmptyState icon={BookOpen} label="Nenhum post criado" onAdd={() => setShowPostModal(true)} />
                ) : (
                  <div className="space-y-3">
                    {posts.map(post => (
                      <div key={post.id} className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-5 hover:shadow-sm transition-shadow">
                        {post.cover_image
                          ? <img src={post.cover_image} alt={post.title} className="w-16 h-12 object-cover rounded-xl flex-shrink-0" />
                          : <div className="w-16 h-12 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center"><BookOpen className="w-4 h-4 text-gray-300" /></div>
                        }
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-[#05070a] truncate">{post.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{post.category} · {post.created_at ? new Date(post.created_at).toLocaleDateString('pt-BR') : ''}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${post.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                            {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                          </span>
                          <button onClick={() => togglePostStatus(post)} title={post.status === 'published' ? 'Mover para rascunho' : 'Publicar'}
                            className="text-gray-400 hover:text-[#C18D41] p-2 rounded-xl hover:bg-[#C18D41]/10 transition-colors">
                            {post.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button onClick={() => deletePost(post.id)} className="text-red-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── VIP ── */}
            {activeTab === 'vip' && (
              <motion.div key="vip" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {isLoading ? (
                  <div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-gray-300" /></div>
                ) : vipCodes.length === 0 ? (
                  <EmptyState icon={Key} label="Nenhum acesso VIP criado" onAdd={() => setShowVipModal(true)} />
                ) : (
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="p-6 text-left text-xs text-gray-400 font-bold uppercase tracking-widest">Cliente</th>
                          <th className="p-6 text-left text-xs text-gray-400 font-bold uppercase tracking-widest">Codigo</th>
                          <th className="p-6 text-left text-xs text-gray-400 font-bold uppercase tracking-widest">Notas</th>
                          <th className="p-6 text-left text-xs text-gray-400 font-bold uppercase tracking-widest">Status</th>
                          <th className="p-6" />
                        </tr>
                      </thead>
                      <tbody>
                        {vipCodes.map(vip => (
                          <tr key={vip.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                            <td className="p-6 font-bold text-[#05070a]">{vip.client_name}</td>
                            <td className="p-6">
                              <div className="flex items-center gap-2">
                                <code className="bg-gray-100 text-[#05070a] font-mono text-sm px-3 py-1 rounded-lg">{vip.code}</code>
                                <button onClick={() => copyCode(vip.id, vip.code)} className="text-gray-400 hover:text-[#C18D41] transition-colors p-1">
                                  {copied === vip.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            </td>
                            <td className="p-6 text-gray-400 text-sm">{vip.notes || '—'}</td>
                            <td className="p-6">
                              <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${vip.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                {vip.is_active ? 'Ativo' : 'Inativo'}
                              </span>
                            </td>
                            <td className="p-6">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => toggleVipCode(vip.id)} title={vip.is_active ? 'Desativar' : 'Ativar'}
                                  className="text-gray-400 hover:text-[#C18D41] p-2 rounded-xl hover:bg-[#C18D41]/10 transition-colors">
                                  {vip.is_active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                                </button>
                                <button onClick={() => deleteVipCode(vip.id)} className="text-red-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── Itineraries ── */}
            {activeTab === 'itineraries' && (
              <motion.div key="itineraries" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {isLoading ? (
                  <div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-gray-300" /></div>
                ) : itineraries.length === 0 ? (
                  <EmptyState icon={Route} label="Nenhum roteiro criado" onAdd={openNewItinerary} />
                ) : (
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="p-6 text-left text-xs text-gray-400 font-bold uppercase tracking-widest">Cliente (Codigo VIP)</th>
                          <th className="p-6 text-left text-xs text-gray-400 font-bold uppercase tracking-widest">Destino</th>
                          <th className="p-6 text-left text-xs text-gray-400 font-bold uppercase tracking-widest">Partida</th>
                          <th className="p-6 text-left text-xs text-gray-400 font-bold uppercase tracking-widest">Dias</th>
                          <th className="p-6" />
                        </tr>
                      </thead>
                      <tbody>
                        {itineraries.map(itin => (
                          <tr key={itin.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                            <td className="p-6">
                              <code className="bg-gray-100 text-[#05070a] font-mono text-sm px-3 py-1 rounded-lg">{itin.vip_code}</code>
                            </td>
                            <td className="p-6 font-bold text-[#05070a]">{itin.destination}</td>
                            <td className="p-6 text-gray-400 text-sm">{itin.start_date || '—'}</td>
                            <td className="p-6 text-gray-400 text-sm">{itin.days?.length || 0} dias</td>
                            <td className="p-6">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => openEditItinerary(itin)} className="text-gray-400 hover:text-[#C18D41] p-2 rounded-xl hover:bg-[#C18D41]/10 transition-colors">
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => deleteItinerary(itin.vip_code)} className="text-red-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* ── Modal: Novo Destino ── */}
      <Modal open={showDestModal} onClose={() => setShowDestModal(false)} title="Novo Destino" wide>
        <form onSubmit={createDestination} className="space-y-5">
          <ImageUploadField label="Foto do Destino" value={destForm.image} folder="destinations"
            onChange={url => setDestForm(f => ({ ...f, image: url }))} />
          <Field label="Nome do Destino" required value={destForm.title} onChange={v => setDestForm(f => ({ ...f, title: v }))} placeholder="Ex: Atol de Baa" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Pais / Regiao" required value={destForm.location} onChange={v => setDestForm(f => ({ ...f, location: v }))} placeholder="Ex: Maldivas" />
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Preco (R$)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">R$</span>
                <input
                  required
                  value={destForm.price}
                  onChange={e => setDestForm(f => ({ ...f, price: formatPrice(e.target.value) }))}
                  placeholder="0"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 bg-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Descricao Curta</label>
            <textarea rows={3} value={destForm.description}
              onChange={e => setDestForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Ex: Paraiso isolado no Oceano Indico, com lagoas cristalinas e recifes de coral intocados."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40 resize-none" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Rating (1-5)" required type="number" value={String(destForm.rating)} onChange={v => setDestForm(f => ({ ...f, rating: parseFloat(v) }))} placeholder="Ex: 4.9" />
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Categoria</label>
              <select value={destForm.category} onChange={e => setDestForm(f => ({ ...f, category: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40">
                <option value="praia">Refugios Costeiros</option>
                <option value="montanha">Retiros Alpinos</option>
                <option value="cidade">Imersao Urbana</option>
                <option value="aventura">Jornadas Epicas</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Tamanho do Card</label>
              <select value={destForm.size} onChange={e => setDestForm(f => ({ ...f, size: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40">
                <option value="small">Pequeno (1x1)</option>
                <option value="medium">Medio (2x1)</option>
                <option value="large">Grande (2x2)</option>
              </select>
            </div>
          </div>
          <SubmitButton saving={saving} label="Criar Destino" />
        </form>
      </Modal>

      {/* ── Modal: Novo Post ── */}
      <Modal open={showPostModal} onClose={() => setShowPostModal(false)} title="Novo Post" wide>
        <form onSubmit={createPost} className="space-y-5">
          <ImageUploadField label="Imagem de Capa" value={postForm.cover_image} folder="blog"
            onChange={url => setPostForm(f => ({ ...f, cover_image: url }))} />
          <Field label="Titulo do Post" required value={postForm.title}
            onChange={v => setPostForm(f => ({ ...f, title: v, slug: slugify(v) }))} placeholder="Ex: O Segredo Bem Guardado da Costa Amalfitana" />
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Resumo (aparece no card)</label>
            <textarea rows={2} value={postForm.excerpt}
              onChange={e => setPostForm(f => ({ ...f, excerpt: e.target.value }))}
              placeholder="Ex: Longe das multidoes de Positano, descobri uma vila onde o tempo parou..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40 resize-none" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Categoria</label>
              <select value={postForm.category} onChange={e => setPostForm(f => ({ ...f, category: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40">
                <option value="Viagem">Viagem</option>
                <option value="Luxo">Luxo</option>
                <option value="Aventura">Aventura</option>
                <option value="Gastronomia">Gastronomia</option>
                <option value="Dicas">Dicas</option>
              </select>
            </div>
            <Field label="Localizacao" value={postForm.location} onChange={v => setPostForm(f => ({ ...f, location: v }))} placeholder="Ex: Italia" />
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Status</label>
              <select value={postForm.status} onChange={e => setPostForm(f => ({ ...f, status: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40">
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[#C18D41]/5 rounded-xl border border-[#C18D41]/20">
            <input type="checkbox" id="featured" checked={postForm.featured}
              onChange={e => setPostForm(f => ({ ...f, featured: e.target.checked }))}
              className="w-4 h-4 accent-[#C18D41]" />
            <label htmlFor="featured" className="text-xs font-bold uppercase tracking-widest text-gray-600 cursor-pointer">
              Destacar este post na pagina do Blog
            </label>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Conteudo completo</label>
            <textarea required rows={10} value={postForm.content}
              onChange={e => setPostForm(f => ({ ...f, content: e.target.value }))}
              placeholder="Escreva o relato completo aqui..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40 resize-none" />
          </div>
          <SubmitButton saving={saving} label="Criar Post" />
        </form>
      </Modal>

      {/* ── Modal: Novo Acesso VIP ── */}
      <Modal open={showVipModal} onClose={() => setShowVipModal(false)} title="Novo Acesso VIP">
        <form onSubmit={createVipCode} className="space-y-5">
          <Field label="Nome do Cliente" required value={vipForm.client_name}
            onChange={v => setVipForm(f => ({ ...f, client_name: v }))}
            placeholder="Ex: Joana Silva" />
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Codigo de Acesso</label>
            <div className="flex gap-2">
              <input
                required
                value={vipForm.code}
                onChange={e => setVipForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                placeholder="Ex: JOANA2026"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40 font-mono tracking-widest"
              />
              <button
                type="button"
                onClick={() => setVipForm(f => ({ ...f, code: generateCode(f.client_name || 'VIP') }))}
                className="px-4 py-3 bg-[#C18D41]/10 hover:bg-[#C18D41]/20 text-[#C18D41] rounded-xl text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap"
              >
                Gerar
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">
              Clique em Gerar para criar automaticamente com base no nome, ou escreva um codigo personalizado.
            </p>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Notas pessoais (opcional)</label>
            <textarea rows={3} value={vipForm.notes}
              onChange={e => setVipForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Ex: Pacote lua de mel, valido ate dezembro"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40 resize-none" />
          </div>
          <SubmitButton saving={saving} label="Criar Acesso VIP" />
        </form>
      </Modal>

      {/* ── Modal: Roteiro VIP ── */}
      <Modal open={showItineraryModal} onClose={() => setShowItineraryModal(false)} title={editingItinerary ? `Roteiro — ${editingItinerary.vip_code}` : 'Novo Roteiro VIP'} wide>
        <form onSubmit={saveItinerary} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Codigo VIP do Cliente" required value={itinForm.vip_code} onChange={v => setItinForm(f => ({ ...f, vip_code: v.toUpperCase() }))} placeholder="Ex: JOANA2026" disabled={!!editingItinerary} />
            <Field label="Destino" required value={itinForm.destination} onChange={v => setItinForm(f => ({ ...f, destination: v }))} placeholder="Ex: Costa Amalfitana" />
          </div>
          <Field label="Data de Partida" value={itinForm.start_date} onChange={v => setItinForm(f => ({ ...f, start_date: v }))} placeholder="Ex: 15 de Junho, 2026" />
          <Field label="URL da Imagem de Capa (opcional)" value={itinForm.image_url} onChange={v => setItinForm(f => ({ ...f, image_url: v }))} placeholder="https://..." />

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Logistica</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Voo — Companhia/Numero" value={itinForm.flight_detail} onChange={v => setItinForm(f => ({ ...f, flight_detail: v }))} placeholder="Ex: TAP TP123" />
              <Field label="Voo — Detalhe" value={itinForm.flight_sub} onChange={v => setItinForm(f => ({ ...f, flight_sub: v }))} placeholder="Ex: Gate B5" />
              <Field label="Hotel — Nome" value={itinForm.hotel_detail} onChange={v => setItinForm(f => ({ ...f, hotel_detail: v }))} placeholder="Ex: Belmond Hotel Caruso" />
              <Field label="Hotel — Quarto" value={itinForm.hotel_sub} onChange={v => setItinForm(f => ({ ...f, hotel_sub: v }))} placeholder="Ex: Suite Panoramica" />
              <Field label="Transfer — Veiculo" value={itinForm.transfer_detail} onChange={v => setItinForm(f => ({ ...f, transfer_detail: v }))} placeholder="Ex: Mercedes Classe S" />
              <Field label="Transfer — Tipo" value={itinForm.transfer_sub} onChange={v => setItinForm(f => ({ ...f, transfer_sub: v }))} placeholder="Ex: Motorista Particular" />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cronograma</p>
              <button type="button" onClick={addDay} className="text-[10px] text-[#C18D41] font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
                <Plus className="w-3 h-3" /> Adicionar Dia
              </button>
            </div>
            <div className="space-y-4">
              {itinForm.days.map((day, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C18D41] uppercase tracking-widest">Dia {day.day}</span>
                    <button type="button" onClick={() => removeDay(idx)} className="text-red-400 hover:text-red-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <Field label="Titulo do Dia" value={day.title} onChange={v => updateDay(idx, 'title', v)} placeholder="Ex: Chegada e Imersao" />
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Descricao</label>
                    <textarea
                      rows={2}
                      value={day.description}
                      onChange={e => updateDay(idx, 'description', e.target.value)}
                      placeholder="Descricao das atividades do dia..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#C18D41]/20 resize-none"
                    />
                  </div>
                  <Field label="Localizacao" value={day.location} onChange={v => updateDay(idx, 'location', v)} placeholder="Ex: Positano, Italia" />
                </div>
              ))}
              {itinForm.days.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">Nenhum dia adicionado ainda.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="ghost" onClick={() => setShowItineraryModal(false)}>Cancelar</Button>
            <Button type="submit" disabled={saving} className="bg-[#C18D41] text-white">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingItinerary ? 'Salvar Alteracoes' : 'Criar Roteiro')}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

// ── Shared Sub-components ──────────────────────────────────────────────────

function Modal({ open, onClose, title, children, wide }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}>
          <motion.div
            className={`bg-white rounded-3xl shadow-2xl w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} p-10 relative max-h-[90vh] overflow-y-auto`}
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl font-bold text-[#05070a] mb-8">{title}</h3>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value, onChange, placeholder, required, type, disabled }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; type?: string; disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">{label}</label>
      <input type={type || 'text'} required={required} value={value} disabled={disabled}
        onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40 disabled:bg-gray-50 disabled:text-gray-400" />
    </div>
  );
}

function SubmitButton({ saving, label }: { saving: boolean; label: string }) {
  return (
    <Button type="submit" disabled={saving}
      className="w-full bg-[#05070a] hover:bg-[#C18D41] text-white rounded-2xl h-12 mt-2 transition-colors">
      {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
      {saving ? 'A guardar...' : label}
    </Button>
  );
}

function EmptyState({ icon: Icon, label, onAdd }: { icon: any; label: string; onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
      <Icon className="w-10 h-10 opacity-20" />
      <p className="text-sm font-medium">{label}</p>
      <Button onClick={onAdd} variant="outline" className="mt-2 rounded-2xl">
        <Plus className="w-4 h-4 mr-2" /> Adicionar
      </Button>
    </div>
  );
}
