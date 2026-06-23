import { Toaster } from "sonner";
import NotFound from "@/pages/NotFound";
import { useEffect, useState } from "react";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";
import AdminPage from "./pages/AdminPage";
import Home from "./pages/Home";
import MyRequestsPage from "./pages/MyRequestsPage";
import QAPage from "./pages/QAPage";
import SupplierApplyPage from "./pages/SupplierApplyPage";
import SupplierDetailPage from "./pages/SupplierDetailPage";
import SuppliersPage from "./pages/SuppliersPage";

const getHashPath = () => {
  const path = window.location.hash.replace(/^#/, "");
  return path.startsWith("/") ? path : "/";
};

const useHashLocation = () => {
  const [location, setLocation] = useState(getHashPath);

  useEffect(() => {
    const onHashChange = () => setLocation(getHashPath());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (to: string) => {
    window.location.hash = to;
  };

  return [location, navigate] as [string, (path: string) => void];
};

function Router() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/qa" component={QAPage} />
        <Route path="/suppliers" component={SuppliersPage} />
        <Route path="/suppliers/:id" component={SupplierDetailPage} />
        <Route path="/supplier-apply" component={SupplierApplyPage} />
        <Route path="/my-requests" component={MyRequestsPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <Toaster position="top-right" />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Router />
          </main>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
