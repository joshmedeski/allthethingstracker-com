import { Outlet } from "@remix-run/react";
import MarketingHeader from "~/components/layout/marketing/MarketingHeader";

const MarketingLayout: React.FC = () => {
  return (
    <div className="flex min-h-[100vh] flex-col justify-between">
      <section>
        <MarketingHeader />
        <div>
          <Outlet />
        </div>
      </section>
      <footer>Footer</footer>
    </div>
  );
};

export default MarketingLayout;
