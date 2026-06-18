import { useState } from "react";
import type { PageId, AdminSubPage, Persona } from "@/types";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import HelpModal from "@/components/modals/HelpModal";
import AlertsDrawer from "@/components/drawers/AlertsDrawer";
import DemoScriptModal from "@/components/modals/DemoScriptModal";
import AIStoreInsightsPage from "@/pages/AIStoreInsightsPage";
import LiftLabsPage from "@/pages/LiftLabsPage";
import OperationsPage from "@/pages/OperationsPage";
import VideoPage from "@/pages/VideoPage";
import TrafficPage from "@/pages/TrafficPage";
import PerformanceDashboard from "@/pages/PerformanceDashboard";
import OptimizationDashboard from "@/pages/OptimizationDashboard";
import BenchmarksPage from "@/pages/BenchmarksPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import ReportsPage from "@/pages/ReportsPage";
import AdminPage from "@/pages/admin/AdminPage";

export default function App() {
  const [page, setPage] = useState<PageId>("ai-insights");
  const [adminSubPage, setAdminSubPage] = useState<AdminSubPage>("users");
  const [showHelp, setShowHelp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [persona, setPersona] = useState<Persona>("corporate");
  const [showDemoScript, setShowDemoScript] = useState(false);

  const navigate = (p: PageId) => {
    setPage(p);
    setShowHelp(false);
    setShowUserMenu(false);
    setShowAlerts(false);
  };

  const renderPage = () => {
    switch (page) {
      case "ai-insights":
        return <AIStoreInsightsPage />;
      case "lift-labs":
        return <LiftLabsPage />;
      case "operations":
        return <OperationsPage navigate={navigate} />;
      case "video":
        return <VideoPage navigate={navigate} />;
      case "traffic":
        return <TrafficPage />;
      case "performance":
        return <PerformanceDashboard />;
      case "optimization":
        return <OptimizationDashboard />;
      case "benchmarks":
        return <BenchmarksPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "reports":
        return <ReportsPage />;
      case "admin":
        return (
          <AdminPage
            subPage={adminSubPage}
            setSubPage={setAdminSubPage}
          />
        );
      default:
        return <AIStoreInsightsPage />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>
      <Sidebar
        page={page}
        navigate={navigate}
        onDemoScript={() => setShowDemoScript(true)}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar
          persona={persona}
          setPersona={setPersona}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
          showAlerts={showAlerts}
          setShowAlerts={setShowAlerts}
          showHelp={showHelp}
          setShowHelp={setShowHelp}
          navigate={navigate}
        />

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {renderPage()}
        </div>
      </div>

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      {showAlerts && <AlertsDrawer onClose={() => setShowAlerts(false)} />}
      {showDemoScript && <DemoScriptModal onClose={() => setShowDemoScript(false)} />}
    </div>
  );
}
