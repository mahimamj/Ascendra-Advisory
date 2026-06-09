import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustMetrics from "@/components/TrustMetrics";
import About from "@/components/About";
import SolutionsHub from "@/components/SolutionsHub";
import IndustryShowcase from "@/components/IndustryShowcase";
import FundingJourney from "@/components/FundingJourney";
import Testimonials from "@/components/Testimonials";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-navy-dark overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustMetrics />
        <About />
        <SolutionsHub />
        <IndustryShowcase />
        <FundingJourney />
        <Testimonials />
        <LeadCaptureForm />
      </main>
      <Footer />
    </div>
  );
}
