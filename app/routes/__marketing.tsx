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
      <footer className="mx-4 my-2">
        &copy; {new Date().getUTCFullYear()} All the Things Tracker.{" "}
        <a
          href="https://github.com/joshmedeski/allthethingstracker-com"
          rel="noopener noreferrer"
          target="_blank"
          className="underline"
        >
          Sorce code on GitHub
        </a>{" "}
        Thanks to
        <a
          href="https://planetscale.com"
          rel="noopener noreferrer"
          target="_blank"
          className="underline"
        >
          PlanetScale
        </a>{" "}
        and{" "}
        <a
          href="https://planetscale.com"
          rel="noopener noreferrer"
          target="_blank"
          className="underline"
        >
          Hashnode
        </a>
      </footer>
    </div>
  );
};

export default MarketingLayout;
