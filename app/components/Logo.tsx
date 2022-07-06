import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <img
        src="/all-the-things.png"
        alt="All the Things"
        className="mr-4 h-12"
      />
      <h1 className="mt-2 text-2xl font-extrabold">All The Things Tracker</h1>
    </div>
  );
};

export default Logo;
