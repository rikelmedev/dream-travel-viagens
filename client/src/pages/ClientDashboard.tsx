import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import {
  Plane, Hotel, Car,
  MapPin, Clock, Calendar, MessageSquare,
  ChevronDown, Sparkles, Loader2
} from 'lucide-react';
import { Button } from '@/components/painel/button';

type ItineraryDay = { day: number; title: string; description: string; location: string };

type Itinerary = {
  destination: string;
  image_url: string | null;
  start_date: string | null;
  flight_detail: string | null;
  flight_sub: string | null;
  hotel_detail: string | null;
  hotel_sub: string | null;
  transfer_detail: string | null;
  transfer_sub: string | null;
  days: ItineraryDay[];
};

export default function ClientDashboard() {
  const [, setLocation] = useLocation();
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clientName = typeof window !== 'undefined'
    ? localStorage.getItem('vip_client_name') || 'Cliente VIP'
    : 'Cliente VIP';
  const vipCode = typeof window !== 'undefined'
    ? localStorage.getItem('vip_code') || ''
    : '';

  useEffect(() => {
    if (!localStorage.getItem('vip_client_name')) {
      setLocation('/viplogin');
      return;
    }

    fetch(`/api/itineraries/${vipCode}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { setItinerary(data); setIsLoading(false); })
      .catch(() => { setItinerary(null); setIsLoading(false); });
  }, [vipCode]);

  const daysUntil = (dateStr: string | null) => {
    if (!dateStr) return null;
    const parts = dateStr.match(/(\d+)\s+de\s+(\w+)[,\s]+(\d{4})/i);
    if (!parts) return null;
    const months: Record<string, number> = {
      janeiro: 0, fevereiro: 1, marco: 2, abril: 3, maio: 4, junho: 5,
      julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11
    };
    const month = months[parts[2].toLowerCase()];
    if (month === undefined) return null;
    const target = new Date(parseInt(parts[3]), month, parseInt(parts[1]));
    const diff = Math.ceil((target.getTime() - Date.now()) / 86400000);
    return diff > 0 ? diff : null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05070a] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#C18D41] mb-6" />
        <p className="font-serif text-2xl text-white italic">Acessando ao cofre digital...</p>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="min-h-screen bg-[#05070a] text-white flex flex-col items-center justify-center gap-10 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C18D41]/8 blur-[150px] rounded-full pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center max-w-md"
        >
          <div className="flex items-center justify-center gap-3 text-[#C18D41] mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Area Reservada</span>
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
            Ola, <span className="italic text-[#C18D41] font-light">{clientName}</span>
          </h1>
          <div className="h-px w-24 bg-[#C18D41]/40 mx-auto my-8" />
          <p className="text-white/50 font-light leading-relaxed text-lg mb-2">
            O seu roteiro personalizado esta sendo cuidadosamente elaborado.
          </p>
          <p className="text-white/30 text-sm font-light">
            Em breve os detalhes exclusivos da sua jornada estao aqui.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 bg-white/[0.03] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center"
        >
          <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4">Fale com a sua curadora</p>
          <Button
            onClick={() => window.open('https://wa.me/5517996077150', '_blank')}
            className="w-full h-14 bg-[#C18D41] hover:bg-[#A67632] text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl shadow-xl shadow-[#C18D41]/20"
          >
            Entrar em Contacto
          </Button>
        </motion.div>
      </div>
    );
  }

  const daysRemaining = daysUntil(itinerary.start_date);

  return (
    <div className="min-h-screen bg-[#05070a] text-white pb-24">

      <section className="relative h-[60vh] flex items-end p-8 md:p-20 overflow-hidden">
        {itinerary.image_url ? (
          <img
            src={itinerary.image_url}
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105"
            alt={itinerary.destination}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#C18D41]/10 to-transparent" />
        )}
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
                {itinerary.destination} <br />
                <span className="italic font-light text-[#C18D41]">{clientName}</span>
              </h1>
            </div>

            {(daysRemaining !== null || itinerary.start_date) && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col items-center min-w-[160px]">
                {daysRemaining !== null ? (
                  <>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Faltam</span>
                    <span className="text-4xl font-serif text-[#C18D41]">{daysRemaining} Dias</span>
                    <div className="h-px w-full bg-white/10 my-4" />
                  </>
                ) : null}
                {itinerary.start_date && (
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-white/60 text-center">{itinerary.start_date}</span>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {(itinerary.flight_detail || itinerary.hotel_detail || itinerary.transfer_detail) && (
        <section className="py-12 px-6 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {itinerary.flight_detail && (
              <LogisticsCard icon={<Plane />} title="Voo VIP" detail={itinerary.flight_detail} subDetail={itinerary.flight_sub || ''} />
            )}
            {itinerary.hotel_detail && (
              <LogisticsCard icon={<Hotel />} title="Alojamento" detail={itinerary.hotel_detail} subDetail={itinerary.hotel_sub || ''} />
            )}
            {itinerary.transfer_detail && (
              <LogisticsCard icon={<Car />} title="Transfer" detail={itinerary.transfer_detail} subDetail={itinerary.transfer_sub || ''} />
            )}
          </div>
        </section>
      )}

      {itinerary.days && itinerary.days.length > 0 && (
        <section className="py-12 px-6 lg:px-20 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Calendar className="text-[#C18D41] w-6 h-6" />
            <h2 className="text-2xl font-serif">O Cronograma da Sua Jornada</h2>
          </div>

          <div className="space-y-8 relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

            {itinerary.days.map((item, idx) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-16"
              >
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
                      <p className="text-white/60 font-light leading-relaxed mb-6">{item.description}</p>
                      <div className="flex flex-wrap gap-4">
                        {item.location && (
                          <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                            <MapPin className="w-3 h-3 text-[#C18D41]" />
                            {item.location}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                          <Clock className="w-3 h-3 text-[#C18D41]" />
                          Confirmacao OK
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

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

function LogisticsCard({ icon, title, detail, subDetail }: { icon: React.ReactNode; title: string; detail: string; subDetail: string }) {
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
