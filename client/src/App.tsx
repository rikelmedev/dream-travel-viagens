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


function Router() {
  return (
    <Switch>
      <Route path={"/?from_webdev=1"} component={HomePage} />
      <Route path={"/"} component={HomePage} />
      <Route path={"/destinos"} component={DestinationsPage} />
      <Route path={"/destinos/:id"} component={DestinationDetailPage} />
      <Route path={"/pacotes"} component={PackagesPage} />
      <Route path={"/blog"} component={BlogPage} />
      <Route path={"/sobre"} component={AboutPage} />
      <Route path={"/contato"} component={ContactPage} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

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
