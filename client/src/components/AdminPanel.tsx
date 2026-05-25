import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Map, BookOpen, Settings, LogOut, 
  Plus, Edit2, Trash2, Eye, Key, MapPin, Search, Loader2
} from 'lucide-react';
import { Button } from '@/components/painel/button';
import { useLocation } from 'wouter';
import { toast } from 'sonner';

export default function AdminPanel() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sidebarLinks = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'vip', label: 'Acessos VIP', icon: Key },
    { id: 'destinations', label: 'Catálogo', icon: Map },
    { id: 'journal', label: 'Journal (Blog)', icon: BookOpen },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/destinations');
      const data = await res.json();
      setDestinations(data);
    } catch (error) {
      toast.error("Erro ao conectar com servidor");
    } finally {
      setIsLoading(false);
    }
  };

  const removeDestination = async (id: number) => {
    try {
      await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
      setDestinations(destinations.filter((d: any) => d.id !== id));
      toast.success("Registo eliminado");
    } catch (error) {
      toast.error("Falha ao eliminar");
    }
  };

  useEffect(() => {
    if (activeTab === 'destinations') {
      loadData();
    }
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-[#FAF9F6] font-sans selection:bg-[#C18D41]/20 overflow-hidden">
      <aside className="w-72 bg-[#05070a] border-r border-white/5 flex flex-col hidden md:flex relative overflow-hidden">
        <div className="p-8 pb-4 relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-[#C18D41] rounded-xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg shadow-[#C18D41]/20">D</div>
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
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-[10px] uppercase tracking-widest ${activeTab === link.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                >
                  <Icon className="w-4 h-4" /> {link.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-16">
          <header className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-bold font-serif text-[#05070a]">
              {sidebarLinks.find(l => l.id === activeTab)?.label}
            </h2>
            <Button className="bg-[#05070a] hover:bg-[#C18D41] text-white rounded-2xl px-6 h-12">
              <Plus className="w-4 h-4 mr-2" /> Criar Registo
            </Button>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'destinations' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {isLoading ? <div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8" /></div> : (
                  <table className="w-full bg-white rounded-2xl shadow-sm border border-gray-100">
                    <tbody>
                      {destinations.map((dest: any) => (
                        <tr key={dest.id} className="border-b border-gray-50 last:border-0">
                          <td className="p-6 font-bold">{dest.title}</td>
                          <td className="p-6 text-gray-500">{dest.location}</td>
                          <td className="p-6 text-right">
                            <button onClick={() => removeDestination(dest.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
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
    </div>
  );
}