import React from "react";
import MarketingHeader from "./MarketingHeader";

const MarketingLayout: React.FC = ({ children }) => {
  return (
    <div className="flex min-h-[100vh] flex-col justify-between">
      <section>
        <MarketingHeader />
        <div>{children}</div>
      </section>
      <footer>Footer</footer>
    </div>
  );
};

export default MarketingLayout;
