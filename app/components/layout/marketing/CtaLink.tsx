import { Link } from "@remix-run/react";
import clsx from "clsx";

export const CtaLink: React.FC = ({ children }) => {
  return (
    <Link
      to="/get-started"
      className={clsx([
        "overflow-hidden will-change-transform",
        "w-full rounded-xl sm:w-auto",
        "relative inline-flex items-stretch",
        "transition-slowest ease group",
        "shadow-lg shadow-cta-200 dark:shadow-cta-800",
        "font-bold tracking-wider",
        "bg-cta-600",
        "bg-gradient-to-r",
        "from-cta-600 to-cta-500",
        "text-white",
      ])}
    >
      <span
        className={clsx([
          "bg-cta-500 bg-opacity-10",
          "-top-4 -right-2",
          "group-hover:ovwerflow-hidden absolute",
          "h-16 w-16 group-hover:w-full",
          "transition-width duration-300 ease-in-out",
          "-skew-x-6 transform group-hover:right-0 group-hover:skew-x-0",
        ])}
      ></span>

      <span className="wt z-20 flex-grow px-5 py-3 text-center">
        Get Started
      </span>

      <span className="z-10 flex flex-col justify-center px-5 py-3">
        <span className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
            className="h-5 w-5 flex-initial fill-background"
            viewBox="0 0 512 512"
          >
            <path d="M344.7 238.5l-144.1-136C193.7 95.97 183.4 94.17 174.6 97.95C165.8 101.8 160.1 110.4 160.1 120V192H32.02C14.33 192 0 206.3 0 224v64c0 17.68 14.33 32 32.02 32h128.1v72c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C354.3 264.4 354.3 247.6 344.7 238.5zM416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32z" />
          </svg>
        </span>
      </span>
    </Link>
  );
};
