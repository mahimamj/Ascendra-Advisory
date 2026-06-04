import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustMetrics from "@/components/TrustMetrics";
import SolutionsHub from "@/components/SolutionsHub";
import IndustryShowcase from "@/components/IndustryShowcase";
import AdvantageTimeline from "@/components/AdvantageTimeline";
import EligibilityTool from "@/components/EligibilityTool";
import SchemeExplorer from "@/components/SchemeExplorer";
import CaseStudies from "@/components/CaseStudies";
import InsightsHub from "@/components/InsightsHub";
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

        {/* Product Explorer Hub */}
        <SolutionsHub />

        {/* Sector Showcase flips */}
        <IndustryShowcase />

        {/* Advisory Timeline lines */}
        <AdvantageTimeline />

        {/* Real-time Diagnostics calculator */}
        <EligibilityTool />

        {/* Subsidies Explorer filter grids */}
        <SchemeExplorer />

        {/* Client Outcomes carousels */}
        <CaseStudies />

        {/* Article briefings Hub */}
        <InsightsHub />

        {/* Appointment scheduler Intake terminal */}
        <LeadCaptureForm />
      </main>

      {/* Footer disclaimer and newsletter */}
      <Footer />
    </div>
  );
}
