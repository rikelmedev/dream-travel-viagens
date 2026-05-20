import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, Hotel, Car, Utensils, 
  MapPin, Clock, Calendar, MessageSquare, 
  ChevronDown, ExternalLink, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dados para o Roteiro VIP
const TRIP_DATA = {
  clientName: "Sr. e Sra. Fernandes",
  destination: "Costa Amalfitana",
  daysRemaining: 12,
  startDate: "15 de Junho, 2026",
  itinerary: [
    {
      day: 1,
      title: "Chegada e Imersão",
      description: "Recepção VIP no aeroporto de Nápoles e transfer privado em Maserati para o Hotel Caruso em Ravello. Jantar de boas-vindas com vista panorâmica.",
      location: "Ravello, Itália",
      type: "logistics"
    },
    {
      day: 2,
      title: "Navegação Privada",
      description: "Dia inteiro a bordo de um Iate Riva exclusivo pela costa. Paragem em enseadas secretas para mergulho e almoço privado em Conca dei Marini.",
      location: "Mar Tirreno",
      type: "experience"
    },
    {
      day: 3,
      title: "Gastronomia Michelin",
      description: "Manhã livre para compras em Positano com personal shopper. À noite, reserva confirmada na mesa do chef no Restaurante Don Alfonso 1890.",
      location: "Sant'Agata sui Due Golfi",
      type: "dining"
    }
  ]
};

export default function ClientDashboard() {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  return (
    <div className="min-h-screen bg-[#05070a] text-white pb-24">
      
      {/* 1. HERO HEADER */}
      <section className="relative h-[60vh] flex items-end p-8 md:p-20 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&q=80" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105"
          alt="Amalfi Coast"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/20 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <div className="flex items-center gap-3 text-[#C18D41] mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Roteiro Ativo</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-serif font-bold leading-tight">
                {TRIP_DATA.destination} <br />
                <span className="italic font-light text-[#C18D41]">{TRIP_DATA.clientName}</span>
              </h1>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Faltam</span>
              <span className="text-4xl font-serif text-[#C18D41]">{TRIP_DATA.daysRemaining} Dias</span>
              <div className="h-px w-full bg-white/10 my-4" />
              <span className="text-[10px] font-bold uppercase tracking-tighter text-white/60">{TRIP_DATA.startDate}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. LOGÍSTICA RÁPIDA */}
      <section className="py-12 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LogisticsCard icon={<Plane />} title="Voo VIP" detail="Lufthansa LH234" subDetail="Gate A12 - 10:45 AM" />
          <LogisticsCard icon={<Hotel />} title="Alojamento" detail="Belmond Hotel Caruso" subDetail="Suite Belvedere" />
          <LogisticsCard icon={<Car />} title="Transfer" detail="Maserati Quattroporte" subDetail="Driver: Giovanni V." />
        </div>
      </section>

      {/* 3. TIMELINE DO ROTEIRO */}
      <section className="py-12 px-6 lg:px-20 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Calendar className="text-[#C18D41] w-6 h-6" />
          <h2 className="text-2xl font-serif">O Cronograma da Sua Jornada</h2>
        </div>

        <div className="space-y-8 relative">
          {/* Linha vertical de fundo */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

          {TRIP_DATA.itinerary.map((item, idx) => (
            <motion.div 
              key={item.day}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-16"
            >
              {/* Círculo do Dia */}
              <div className={`absolute left-0 top-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center font-serif text-sm z-10 transition-colors ${expandedDay === item.day ? 'bg-[#C18D41] border-[#C18D41]' : 'bg-[#05070a]'}`}>
                {item.day}
              </div>

              <div 
                onClick={() => setExpandedDay(expandedDay === item.day ? null : item.day)}
                className={`bg-white/[0.03] border border-white/10 rounded-2xl p-6 cursor-pointer transition-all hover:bg-white/[0.05] ${expandedDay === item.day ? 'ring-1 ring-[#C18D41]/30 shadow-2xl' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#C18D41] font-bold block mb-1">Dia {item.day}</span>
                    <h3 className="text-xl font-serif">{item.title}</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-white/30 transition-transform ${expandedDay === item.day ? 'rotate-180' : ''}`} />
                </div>

                {expandedDay === item.day && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 pt-6 border-t border-white/5"
                  >
                    <p className="text-white/60 font-light leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                        <MapPin className="w-3 h-3 text-[#C18D41]" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                        <Clock className="w-3 h-3 text-[#C18D41]" />
                        Confirmação OK
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. CONCIERGE FLUTUANTE */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button 
          onClick={() => window.open('https://wa.me/5517996077150', '_blank')}
          className="rounded-full h-16 w-16 bg-[#C18D41] hover:bg-[#A67632] shadow-2xl shadow-[#C18D41]/40 flex items-center justify-center border border-white/10 group"
        >
          <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          <span className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Falar com Concierge
          </span>
        </Button>
      </div>
    </div>
  );
}

// Subcomponente de Card de Logística
function LogisticsCard({ icon, title, detail, subDetail }: any) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex items-start gap-5 hover:border-[#C18D41]/30 transition-colors">
      <div className="w-10 h-10 rounded-xl bg-[#C18D41]/10 flex items-center justify-center text-[#C18D41]">
        {icon}
      </div>
      <div>
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold block mb-1">{title}</span>
        <h4 className="text-sm font-medium text-white mb-1">{detail}</h4>
        <p className="text-[10px] text-white/40">{subDetail}</p>
      </div>
    </div>
  );
}