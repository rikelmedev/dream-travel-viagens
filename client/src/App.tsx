import { Toaster } from "@/components/painel/sonner";
import { TooltipProvider } from "@/components/painel/tooltip";
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
import AdminLogin from "./pages/AdminLogin";
import VipLogin from "./pages/VipLogin";
import ClientDashboard from "./pages/ClientDashboard";
import { AdminAuthProvider, useAdminAuth } from "./contexts/AdminAuthContext";

function ProtectedAdmin() {
  const { isAdmin } = useAdminAuth();
  return isAdmin ? <Admin /> : <AdminLogin />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/destinos" component={DestinationsPage} />
      <Route path="/destinos/:id" component={DestinationDetailPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:id" component={BlogPostPage} />
      <Route path="/pacotes" component={PackagesPage} />
      <Route path="/sobre" component={AboutPage} />
      <Route path="/contato" component={ContactPage} />

      {/* Rotas de Sistema & Area Reservada */}
      <Route path="/admin" component={ProtectedAdmin} />
      <Route path="/viplogin" component={VipLogin} />
      <Route path="/dashboard" component={ClientDashboard} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AdminAuthProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
            <ScrollToTop />
          </TooltipProvider>
        </ThemeProvider>
      </AdminAuthProvider>
    </ErrorBoundary>
  );
}

export default App;