import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";

import HomePage from "./pages/HomePage";
import DestinationsPage from "./pages/DestinationsPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import PackagesPage from "./pages/PackagesPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

import Admin from "./pages/Admin";
import VipLogin from "./pages/VipLogin";
import ClientDashboard from "./pages/ClientDashboard";

function Router() {
  return (
    <Switch>
      {/* Rotas Públicas */}
      <Route path="/" component={HomePage} />
      <Route path="/destinos" component={DestinationsPage} />
      <Route path="/destinos/:id" component={DestinationDetailPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:id" component={BlogPostPage} />
      <Route path="/pacotes" component={PackagesPage} />
      <Route path="/sobre" component={AboutPage} />
      <Route path="/contato" component={ContactPage} />
      
      {/* Rotas de Sistema & Área Reservada */}
      <Route path="/admin" component={Admin} />
      <Route path="/viplogin" component={VipLogin} />
      <Route path="/dashboard" component={ClientDashboard} />
      
      {/* Rota de Erro */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <ScrollToTop />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;