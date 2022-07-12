import Faqs from "~/components/Faqs";
import MarketingLayout from "~/components/layout/marketing";
import Pricing from "~/components/Pricing";
import { Hero } from "~/components/Hero";

export default function Index() {
  return (
    <MarketingLayout>
      <Hero />
      <Pricing />
      <Faqs />
    </MarketingLayout>
  );
}
