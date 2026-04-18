import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Map, BookOpen, Settings, LogOut, 
  Plus, Edit2, Trash2, TrendingUp, Users, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarLinks = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'destinations', label: 'Roteiros & Destinos', icon: Map },
    { id: 'blog', label: 'Diário (Blog)', icon: BookOpen },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans selection:bg-primary/20">
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col hidden md:flex">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl">
              D
            </div>
            <div>
              <h1 className="font-serif font-bold text-slate-900 text-xl leading-none">Dream Travel</h1>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Workspace</p>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium text-sm ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8">
          <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-sm">
            <LogOut className="w-5 h-5" />
            Terminar Sessão
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8 md:p-12">
          
          <header className="flex justify-between items-center mb-12">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold font-serif text-slate-900">
                {sidebarLinks.find(l => l.id === activeTab)?.label}
              </h2>
              <p className="text-slate-500 mt-2">Bem-vinda de volta, Jackeline. Aqui está o resumo de hoje.</p>
            </motion.div>

            <div className="flex items-center gap-4">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 h-12 shadow-lg shadow-slate-900/10">
                <Plus className="w-4 h-4 mr-2" />
                Criar Novo
              </Button>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Cards de Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Visitas no Site', value: '12,450', icon: Eye, trend: '+14% este mês' },
                    { title: 'Roteiros Ativos', value: '24', icon: Map, trend: '3 adicionados' },
                    { title: 'Leitores do Blog', value: '3,210', icon: TrendingUp, trend: '+22% este mês' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                          <stat.icon className="w-6 h-6 text-slate-700" />
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                          {stat.trend}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm font-medium mb-1">{stat.title}</p>
                      <h3 className="text-4xl font-serif font-bold text-slate-900">{stat.value}</h3>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
                  <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-serif font-bold text-xl text-slate-900">Últimos Roteiros</h3>
                    <button className="text-sm font-bold text-primary hover:underline">Ver todos</button>
                  </div>
                  <div className="p-8">
                    <div className="space-y-4">
                      {['Maldivas Premium', 'Safari Lodge Kruger', 'Verão em Positano'].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-200 rounded-xl overflow-hidden">
                              <img src={`https://source.unsplash.com/random/100x100?travel&sig=${i}`} alt="Thumb" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{item}</p>
                              <p className="text-xs text-slate-500 mt-1">Atualizado há 2 dias</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-red-500 hover:border-red-200 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}