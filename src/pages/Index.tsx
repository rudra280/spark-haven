import React from "react";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeatureCards } from "@/components/features/FeatureCards";
import { AIRecommendations } from "@/components/ai/AIRecommendations";
import { TutorSupport } from "@/components/tutor/TutorSupport";
import { PricingCards } from "@/components/pricing/PricingCards";

export default function Index() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeatureCards />
      <AIRecommendations />
      <TutorSupport />
      <PricingCards />
    </div>
  );
}
