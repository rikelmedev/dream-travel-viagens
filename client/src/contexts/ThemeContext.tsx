import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'day' | 'night';

interface ThemeContextType {
  theme: Theme;
  isDayTime: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('day');

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      const isDay = hour >= 6 && hour < 18;
      const newTheme = isDay ? 'day' : 'night';
      
      setTheme(newTheme);
      
      // Aplica a classe .dark ao HTML para o Tailwind reconhecer o modo noturno
      if (!isDay) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    checkTime();
    // Verifica a cada minuto caso o cliente esteja no site durante a virada do dia/noite
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDayTime: theme === 'day' }}>
      <div className={`min-h-screen transition-colors duration-1000 ${theme === 'night' ? 'bg-[#020617] text-white' : 'bg-white text-slate-900'}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};