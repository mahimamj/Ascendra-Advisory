import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustMetrics from "@/components/TrustMetrics";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import SolutionsHub from "@/components/SolutionsHub";
import IndustryShowcase from "@/components/IndustryShowcase";
import EligibilityTool from "@/components/EligibilityTool";
import CaseStudies from "@/components/CaseStudies";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-navy-dark overflow-x-hidden antialiased">
      {/* Navigation Layer */}
      <Header />

      {/* Main Structural Flow */}
      <main className="flex-1">
        {/* Hero Area + Interactive Ecosystem */}
        <Hero />

        {/* Scroll counters trust stats */}
        <TrustMetrics />

        {/* About Ascendra Section */}
        <About />

        {/* Institutional Compliance Certifications */}
        <Certifications />

        {/* Product Explorer Hub */}
        <SolutionsHub />

        {/* Sector Showcase flips */}
        <IndustryShowcase />

        {/* Real-time Diagnostics calculator */}
        <EligibilityTool />

        {/* Client Outcomes carousels */}
        <CaseStudies />

        {/* Appointment scheduler Intake terminal */}
        <LeadCaptureForm />
      </main>

      {/* Footer disclaimer and newsletter */}
      <Footer />
    </div>
  );
}
