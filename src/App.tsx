import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { ServicePage } from "./components/ServicePage";
import { WorksPage } from "./components/WorksPage";
import { BlogPage } from "./components/BlogPage";
import { SupportPage } from "./components/SupportPage";
import { ContactPage } from "./components/ContactPage";
import CareersPage from "./components/CareersPage";
import { ClientPortalEnhanced } from "./components/ClientPortalEnhanced";
import { AdminPanelEnhanced } from "./components/AdminPanelEnhanced";
import { AdminPanel } from "./components/AdminPanel";
import { ClientAuth } from "./components/ClientAuth";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { TermsConditionsPage } from "./components/TermsConditionsPage";
import { RefundPolicyPage } from "./components/RefundPolicyPage";
import { CookiesPolicyPage } from "./components/CookiesPolicyPage";
import { CookieConsent } from "./components/CookieConsent";
import { OrangeAI } from "./components/OrangeAI";
import { DatabaseSetupAlert } from "./components/DatabaseSetupAlert";
import { SEOHead, pageSEO } from "./components/SEOHead";
import { CustomCursor } from "./components/CustomCursor";
import { LoadingAnimation } from "./components/LoadingAnimation";
import { ScrollProgress } from "./components/ScrollProgress";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "./components/ui/sonner";
import { checkDatabaseStatus } from "./utils/dbStatus";
import { useSmoothScroll } from "./utils/useSmoothScroll";
export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Get initial page from URL hash
    const hash = window.location.hash.slice(1) || "home";
    return hash;
  });
  const [isClientAuthenticated, setIsClientAuthenticated] =
    useState(false);
  const [showDatabaseSetup, setShowDatabaseSetup] =
    useState(false);
  const [setupDismissed, setSetupDismissed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Enable smooth scrolling
  useSmoothScroll();

  useEffect(() => {
    // Show loading animation for 3 seconds on initial load
    const hasLoadedBefore = sessionStorage.getItem("hasLoaded");

    if (!hasLoadedBefore) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Handle browser back/forward
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "home";
      setCurrentPage(hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () =>
      window.removeEventListener(
        "hashchange",
        handleHashChange,
      );
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Update URL hash when page changes
    window.location.hash = currentPage;
  }, [currentPage]);

  useEffect(() => {
    // Check if client is authenticated
    const currentClient = localStorage.getItem("currentClient");
    setIsClientAuthenticated(!!currentClient);

    // Check if setup was previously dismissed
    const dismissed = sessionStorage.getItem(
      "dbSetupDismissed",
    );
    setSetupDismissed(dismissed === "true");

    // Check database connection status
    checkDatabaseStatus().then((status) => {
      if (status.setupRequired && !dismissed) {
        // Show setup alert after a short delay
        setTimeout(() => setShowDatabaseSetup(true), 2000);
      }
    });
  }, []);

  const handleClientAuthSuccess = () => {
    setIsClientAuthenticated(true);
    setCurrentPage("client-portal");
  };

  const handleBackFromAuth = () => {
    setCurrentPage("home");
  };

  // Get SEO data for current page
  const getSEOForPage = () => {
    if (currentPage.startsWith("service-")) {
      return pageSEO.services;
    }

    const seoKey = currentPage as keyof typeof pageSEO;
    return pageSEO[seoKey] || pageSEO.home;
  };

  const renderPage = () => {
    // Service pages
    if (currentPage.startsWith("service-")) {
      const serviceId = parseInt(currentPage.split("-")[1]);
      return (
        <ServicePage
          serviceId={serviceId}
          onNavigate={setCurrentPage}
        />
      );
    }

    // Main pages
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "about":
        return <AboutPage />;
      case "works":
        return <WorksPage />;
      case "blog":
        return <BlogPage />;
      case "support":
        return <SupportPage onNavigate={setCurrentPage} />;
      case "contact":
        return <ContactPage />;
      case "careers":
        return <CareersPage />;
      case "client-portal":
        // Show auth screen if not authenticated, otherwise show portal
        return isClientAuthenticated ? (
          <ClientPortalEnhanced />
        ) : (
          <ClientAuth
            onSuccess={handleClientAuthSuccess}
            onBack={handleBackFromAuth}
          />
        );
      case "admin":
        return <AdminPanel onNavigate={setCurrentPage} />;
      case "admin-enhanced":
        return <AdminPanelEnhanced />;
      case "privacy-policy":
        return (
          <PrivacyPolicyPage onNavigate={setCurrentPage} />
        );
      case "terms-conditions":
        return (
          <TermsConditionsPage onNavigate={setCurrentPage} />
        );
      case "refund-policy":
        return <RefundPolicyPage onNavigate={setCurrentPage} />;
      case "cookies-policy":
        return (
          <CookiesPolicyPage onNavigate={setCurrentPage} />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  const showHeaderFooter =
    currentPage !== "admin" &&
    currentPage !== "admin-enhanced" &&
    currentPage !== "client-portal";

  return (
    <ThemeProvider>
      <SEOHead {...getSEOForPage()} />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingAnimation key="loading" />
        ) : (
          <div key="content" className="min-h-screen">
            <CustomCursor />
            <ScrollProgress />

            {showHeaderFooter && (
              <Header
                currentPage={currentPage}
                onNavigate={setCurrentPage}
              />
            )}

            <main className="page-transition">
              {renderPage()}
            </main>

            {showHeaderFooter && (
              <Footer onNavigate={setCurrentPage} />
            )}

            <CookieConsent onNavigate={setCurrentPage} />

            <OrangeAI onNavigate={setCurrentPage} />

            <DatabaseSetupAlert
              show={showDatabaseSetup && !setupDismissed}
              onDismiss={() => {
                setShowDatabaseSetup(false);
                setSetupDismissed(true);
                sessionStorage.setItem(
                  "dbSetupDismissed",
                  "true",
                );
              }}
            />

            <Toaster />
          </div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}