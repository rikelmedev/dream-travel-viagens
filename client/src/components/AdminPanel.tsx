import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Map, BookOpen, Settings,
  Plus, Trash2, Key, Loader2, X
} from 'lucide-react';
import { Button } from '@/components/painel/button';
import { toast } from 'sonner';

interface Destination {
  id: number;
  title: string;
  location: string;
  image: string;
  price: string;
  rating: number;
  size: string;
}

const EMPTY_FORM = {
  title: '',
  location: '',
  image: '',
  price: '',
  rating: 5.0,
  size: 'medium',
};

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const sidebarLinks = [
    { id: 'dashboard', label: 'Visao Geral', icon: LayoutDashboard },
    { id: 'vip', label: 'Acessos VIP', icon: Key },
    { id: 'destinations', label: 'Catalogo', icon: Map },
    { id: 'journal', label: 'Journal (Blog)', icon: BookOpen },
    { id: 'settings', label: 'Configuracoes', icon: Settings },
  ];

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/destinations');
      const data = await res.json();
      setDestinations(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Erro ao conectar com servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const removeDestination = async (id: number) => {
    try {
      await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
      setDestinations((prev) => prev.filter((d) => d.id !== id));
      toast.success('Registo eliminado');
    } catch {
      toast.error('Falha ao eliminar');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating: Number(form.rating) }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error('Erro: ' + JSON.stringify(err.error));
        return;
      }

      const created: Destination = await res.json();
      setDestinations((prev) => [...prev, created]);
      toast.success('Destino criado com sucesso');
      setShowModal(false);
      setForm(EMPTY_FORM);
    } catch {
      toast.error('Falha ao criar destino');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'destinations') loadData();
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-[#FAF9F6] font-sans selection:bg-[#C18D41]/20 overflow-hidden">

      {/* Sidebar */}
      <aside className="w-72 bg-[#05070a] border-r border-white/5 hidden md:flex flex-col relative overflow-hidden">
        <div className="p-8 pb-4 relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-[#C18D41] rounded-xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg shadow-[#C18D41]/20">
              D
            </div>
            <div>
              <h1 className="font-serif font-bold text-white text-xl">Dream Travel</h1>
              <p className="text-[9px] text-[#C18D41] font-bold uppercase tracking-[0.3em] mt-2">Control Room</p>
            </div>
          </div>
          <nav className="space-y-3">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-[10px] uppercase tracking-widest ${
                    activeTab === link.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {link.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-16">
          <header className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-bold font-serif text-[#05070a]">
              {sidebarLinks.find((l) => l.id === activeTab)?.label}
            </h2>
            {activeTab === 'destinations' && (
              <Button
                onClick={() => setShowModal(true)}
                className="bg-[#05070a] hover:bg-[#C18D41] text-white rounded-2xl px-6 h-12"
              >
                <Plus className="w-4 h-4 mr-2" /> Novo Destino
              </Button>
            )}
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'destinations' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {isLoading ? (
                  <div className="flex justify-center p-20">
                    <Loader2 className="animate-spin w-8 h-8" />
                  </div>
                ) : destinations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
                    <Map className="w-10 h-10 opacity-30" />
                    <p className="text-sm font-medium">Nenhum destino cadastrado ainda.</p>
                    <Button
                      onClick={() => setShowModal(true)}
                      variant="outline"
                      className="mt-2 rounded-2xl"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Adicionar primeiro destino
                    </Button>
                  </div>
                ) : (
                  <table className="w-full bg-white rounded-2xl shadow-sm border border-gray-100">
                    <thead>
                      <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-widest">
                        <th className="p-6 text-left font-semibold">Destino</th>
                        <th className="p-6 text-left font-semibold">Localizacao</th>
                        <th className="p-6 text-left font-semibold">Preco</th>
                        <th className="p-6 text-left font-semibold">Rating</th>
                        <th className="p-6 text-left font-semibold">Tamanho</th>
                        <th className="p-6" />
                      </tr>
                    </thead>
                    <tbody>
                      {destinations.map((dest) => (
                        <tr key={dest.id} className="border-b border-gray-50 last:border-0">
                          <td className="p-6 font-bold text-[#05070a]">{dest.title}</td>
                          <td className="p-6 text-gray-500">{dest.location}</td>
                          <td className="p-6 text-gray-500">€ {dest.price}</td>
                          <td className="p-6 text-gray-500">{dest.rating}</td>
                          <td className="p-6 text-gray-500 capitalize">{dest.size}</td>
                          <td className="p-6 text-right">
                            <button
                              onClick={() => removeDestination(dest.id)}
                              className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modal de criacao */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10 relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-2xl font-bold text-[#05070a] mb-8">Novo Destino</h3>

              <form onSubmit={handleCreate} className="space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Titulo</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Ex: Atol de Baa"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Localizacao</label>
                  <input
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Ex: Maldivas"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">URL da Imagem</label>
                  <input
                    required
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="Ex: /images/maldivas.jpg"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Preco (EUR)</label>
                    <input
                      required
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="Ex: 8.500"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Rating</label>
                    <input
                      required
                      type="number"
                      min={1}
                      max={5}
                      step={0.1}
                      value={form.rating}
                      onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Tamanho do Card</label>
                  <select
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40 bg-white"
                  >
                    <option value="small">Pequeno</option>
                    <option value="medium">Medio</option>
                    <option value="large">Grande</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#05070a] hover:bg-[#C18D41] text-white rounded-2xl h-12 mt-2 transition-colors"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                  {saving ? 'A guardar...' : 'Criar Destino'}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
