
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProfileSection from "@/components/ProfileSection";
import ServicesSection from "@/components/ServicesSection";
import InfoSection from "@/components/InfoSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HeroSection />;
      case "profile":
        return <ProfileSection />;
      case "services":
        return <ServicesSection />;
      case "info":
        return <InfoSection />;
      case "facilities":
        return <FacilitiesSection />;
      case "news":
        return <NewsSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="pt-20">
        {renderSection()}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
