import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MapFormProvider } from "./contexts/MapFormContext";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import DestinationsPage from "./pages/DestinationsPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import PackagesPage from "./pages/PackagesPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Admin from "./pages/Admin";
import BlogPostPage from './pages/BlogPostPage';

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/destinos" component={DestinationsPage} />
      <Route path="/destinos/:id" component={DestinationDetailPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:id" component={BlogPostPage} />
      <Route path="/pacotes" component={PackagesPage} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}



function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <MapFormProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <ScrollToTop />
          </TooltipProvider>
        </MapFormProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
