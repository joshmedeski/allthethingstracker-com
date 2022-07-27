import { Link } from "@remix-run/react";
import React from "react";

const BackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    style={{ fill: "currentColor" }}
    {...props}
  >
    <path d="M32 64C14.33 64 0 78.33 0 95.1V416C0 433.7 14.33 448 31.1 448S64 433.7 64 416V95.1C64 78.33 49.67 64 32 64zM103.3 273.5l144.1 136c6.975 6.578 17.2 8.375 26 4.594c8.803-3.797 14.51-12.47 14.51-22.05L287.9 320h128.1c17.69 0 32.02-14.33 32.02-32V224c0-17.67-14.34-32-32.02-32h-128.1l-.0314-72c0-9.578-5.708-18.25-14.51-22.05c-8.805-3.781-19.03-1.984-26 4.594l-144.1 136C93.66 247.6 93.66 264.4 103.3 273.5z" />
  </svg>
);

const BackToAreasLink: React.FC = () => {
  return (
    <Link to="/areas" className="mb-2 flex items-center text-primary underline">
      <BackIcon className="mr-2 h-5 w-5" />
      <span>Back to Areas</span>
    </Link>
  );
};

export default BackToAreasLink;
