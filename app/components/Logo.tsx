import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <img
        src="/all-the-things.jpeg"
        alt="All the Things"
        className="mr-1 h-12 rounded-xl bg-white"
      />
      <h1 className="text-2xl font-bold">All The Things Tracker</h1>
    </div>
  );
};

export default Logo;
