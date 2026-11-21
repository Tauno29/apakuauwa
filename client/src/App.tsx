import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import { CartProvider } from "./contexts/CartContext";
import SiteLayout from "./components/site/SiteLayout";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const PAGE_TITLES: Record<string, string> = {
  "/": "Apaku Awua Investments CC — Fresh Fruits & Vegetables",
  "/shop": "Shop Fresh Produce — Apaku Awua",
  "/about": "About Us — Apaku Awua Investments CC",
  "/contact": "Contact & Hours — Apaku Awua",
  "/404": "404 — Page not found",
};

function Router() {
  const [path] = useLocation();
  useEffect(() => {
    document.title = PAGE_TITLES[path] ?? PAGE_TITLES["/404"];
  }, [path]);

  return (
    <SiteLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </SiteLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <CartProvider>
            <Toaster />
            <Router />
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
