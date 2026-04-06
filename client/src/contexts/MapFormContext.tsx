import { createContext, useContext, useState, ReactNode } from 'react';

/**
 * MapFormContext
 * Compartilha dados entre o mapa interativo e o formulário de orçamento
 * Permite que o usuário selecione um destino no mapa e o formulário seja preenchido automaticamente
 */

interface MapFormContextType {
  selectedDestinationName: string | null;
  setSelectedDestinationName: (name: string | null) => void;
  scrollToForm: () => void;
}

const MapFormContext = createContext<MapFormContextType | undefined>(undefined);

export function MapFormProvider({ children }: { children: ReactNode }) {
  const [selectedDestinationName, setSelectedDestinationName] = useState<string | null>(null);

  const scrollToForm = () => {
    const formSection = document.getElementById('formulario-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MapFormContext.Provider
      value={{
        selectedDestinationName,
        setSelectedDestinationName,
        scrollToForm,
      }}
    >
      {children}
    </MapFormContext.Provider>
  );
}

export function useMapForm() {
  const context = useContext(MapFormContext);
  if (context === undefined) {
    throw new Error('useMapForm must be used within MapFormProvider');
  }
  return context;
}
