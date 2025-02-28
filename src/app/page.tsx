import Banner from "@/shared/components/banner/banner.component";
import FeaturesSection from "@/entities/home/x/home-feature-section.component";
import PromotionSection from "@/entities/home/x/home-promotion-section.component";
import React from "react";

export default function Home(): React.ReactElement {
  return (
    <>
      {/* 배너 영역 */}
      <Banner />

      {/* 메인 컨텐츠 영역 */}
      <FeaturesSection />
      <PromotionSection />
    </>
  );
}