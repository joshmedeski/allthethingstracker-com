import Faqs from "~/components/Faqs";
import Pricing from "~/components/Pricing";
import { Hero } from "~/components/Hero";

export default function Index() {
  return (
    <>
      <Hero />
      <Pricing />
      <Faqs />
    </>
  );
}
