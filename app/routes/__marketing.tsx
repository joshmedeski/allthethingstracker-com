import { Outlet } from "@remix-run/react";
import Announcement from "~/components/Announcement";
import MarketingHeader from "~/components/layout/marketing/MarketingHeader";

const MarketingLayout: React.FC = () => {
  return (
    <div className="flex min-h-[100vh] flex-col justify-between">
      <section>
        <Announcement />
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
