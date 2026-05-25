import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Map, BookOpen, Settings, LogOut, 
  Plus, Edit2, Trash2, TrendingUp, Eye, Key, MapPin, Search
} from 'lucide-react';
import { Button } from '@/components/painel/button';
import { useLocation } from 'wouter';

export default function AdminPanel() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarLinks = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'vip', label: 'Acessos VIP', icon: Key },
    { id: 'destinations', label: 'Catálogo', icon: Map },
    { id: 'journal', label: 'Journal (Blog)', icon: BookOpen },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const handleLogout = () => {
    setLocation('/');
  };

  // Função para buscar dados do servidor
const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`/api/${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint}:`, error);
    return [];
  }
};
//Para a aba de destinos (que você chamou de 'packages' ou 'destinations')
useEffect(() => {
  if (activeTab === 'destinations') {
    fetchData('destinations').then(data => {
    });
  }
}, [activeTab]);

  return (
    <div className="flex h-screen bg-[#FAF9F6] font-sans selection:bg-[#C18D41]/20 overflow-hidden">
      
      {/* SIDEBAR EDITORIAL */}
      <aside className="w-72 bg-[#05070a] border-r border-white/5 flex flex-col hidden md:flex relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-[#C18D41]/10 blur-[80px] pointer-events-none" />

        <div className="p-8 pb-4 relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-[#C18D41] rounded-xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg shadow-[#C18D41]/20 border border-white/10">
              D
            </div>
            <div>
              <h1 className="font-serif font-bold text-white text-xl leading-none tracking-wide">Dream Travel</h1>
              <p className="text-[9px] text-[#C18D41] font-bold uppercase tracking-[0.3em] mt-2">Control Room</p>
            </div>
          </div>

          <nav className="space-y-3">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 font-bold text-[10px] uppercase tracking-widest ${
                    isActive 
                      ? 'bg-white/10 text-white border border-white/10 shadow-xl' 
                      : 'text-white/40 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C18D41]' : 'text-white/30'}`} />
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 relative z-10 border-t border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <img src="/images/jackeline-perfil.jpg" alt="Jackeline" className="w-10 h-10 rounded-full border border-white/20 object-cover" />
            <div className="text-left">
              <p className="text-white text-sm font-bold">Jackeline</p>
              <p className="text-white/40 text-[9px] uppercase tracking-widest">Curadora</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-colors font-bold text-[10px] uppercase tracking-widest">
            <LogOut className="w-4 h-4" />
            Terminar Sessão
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="max-w-6xl mx-auto p-8 md:p-12 lg:p-16">
          
          <header className="flex justify-between items-end mb-16">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 text-[#C18D41] mb-4">
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Gestão de Curadoria</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#05070a]">
                {sidebarLinks.find(l => l.id === activeTab)?.label}
              </h2>
            </motion.div>

            <div className="flex items-center gap-4">
              <Button className="bg-[#05070a] hover:bg-[#C18D41] text-white rounded-2xl px-6 h-12 shadow-lg shadow-[#05070a]/10 font-bold text-[10px] uppercase tracking-widest transition-all duration-500 group">
                <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-500" />
                Criar Registo
              </Button>
            </div>
          </header>

          <AnimatePresence mode="wait">
            
            {/* ABA: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Visitas no Site', value: '12.450', icon: Eye, trend: '+14% este mês' },
                    { title: 'Clientes VIP em Viagem', value: '04', icon: Key, trend: 'Suporte Ativo' },
                    { title: 'Leitores do Journal', value: '3.210', icon: BookOpen, trend: '+22% este mês' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20 relative overflow-hidden group hover:border-[#C18D41]/30 transition-colors">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <stat.icon className="w-24 h-24 text-[#05070a]" />
                      </div>
                      <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="w-12 h-12 bg-[#05070a] rounded-2xl flex items-center justify-center shadow-lg">
                          <stat.icon className="w-5 h-5 text-[#C18D41]" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#05070a] bg-gray-100 px-3 py-1.5 rounded-full">
                          {stat.trend}
                        </span>
                      </div>
                      <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2 relative z-10">{stat.title}</p>
                      <h3 className="text-5xl font-serif font-bold text-[#05070a] relative z-10">{stat.value}</h3>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ABA: ACESSOS VIP */}
            {activeTab === 'vip' && (
              <motion.div
                key="vip"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
                  <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-gray-200 w-96 shadow-sm">
                      <Search className="w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Procurar cliente ou destino..." className="border-none bg-transparent outline-none text-sm w-full" />
                    </div>
                  </div>
                  
                  <div className="p-0">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50 text-[9px] uppercase tracking-widest text-gray-400">
                          <th className="p-6 font-bold">Cliente</th>
                          <th className="p-6 font-bold">Destino</th>
                          <th className="p-6 font-bold">Código de Acesso</th>
                          <th className="p-6 font-bold">Status</th>
                          <th className="p-6 font-bold text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { client: 'Sr. e Sra. Fernandes', dest: 'Costa Amalfitana', code: 'DREAM2026', status: 'Em Viagem', color: 'text-emerald-600 bg-emerald-50' },
                          { client: 'Família Martins', dest: 'Zermatt, Suíça', code: 'ALPES24', status: 'Preparação', color: 'text-blue-600 bg-blue-50' },
                          { client: 'Isabella Costa', dest: 'Quioto, Japão', code: 'ZEN40', status: 'Concluído', color: 'text-gray-500 bg-gray-100' },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                            <td className="p-6 font-serif font-bold text-[#05070a] text-lg">{row.client}</td>
                            <td className="p-6 text-gray-500 text-sm flex items-center gap-2 mt-1"><MapPin className="w-3 h-3 text-[#C18D41]"/> {row.dest}</td>
                            <td className="p-6">
                              <span className="font-mono text-sm tracking-widest font-bold text-[#05070a] px-3 py-1.5 border border-gray-200 rounded-lg bg-white">{row.code}</span>
                            </td>
                            <td className="p-6">
                              <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${row.color}`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="p-6 text-right">
                              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#C18D41] hover:border-[#C18D41] transition-colors"><Edit2 className="w-3 h-3" /></button>
                                <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ABAS DESTINOS & JOURNAL */}
            {(activeTab === 'destinations' || activeTab === 'journal') && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20 p-16 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    {activeTab === 'destinations' ? <Map className="w-8 h-8 text-gray-300" /> : <BookOpen className="w-8 h-8 text-gray-300" />}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#05070a] mb-2">Gerir {activeTab === 'destinations' ? 'Catálogo' : 'Publicações'}</h3>
                  <p className="text-gray-400 font-light">Selecione "Criar Registo" no topo para adicionar novos itens a esta secção.</p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}