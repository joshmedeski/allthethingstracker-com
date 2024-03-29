import { Link } from "@remix-run/react";
import React from "react";

const NewIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{ fill: "currentColor" }}
    {...props}
  >
    <path d="M176 32C202.5 32 224 53.49 224 80V176C224 202.5 202.5 224 176 224H80C53.49 224 32 202.5 32 176V80C32 53.49 53.49 32 80 32H176zM176 288C202.5 288 224 309.5 224 336V432C224 458.5 202.5 480 176 480H80C53.49 480 32 458.5 32 432V336C32 309.5 53.49 288 80 288H176zM288 80C288 53.49 309.5 32 336 32H432C458.5 32 480 53.49 480 80V176C480 202.5 458.5 224 432 224H336C309.5 224 288 202.5 288 176V80zM384 272C397.3 272 408 282.7 408 296V360H472C485.3 360 496 370.7 496 384C496 397.3 485.3 408 472 408H408V472C408 485.3 397.3 496 384 496C370.7 496 360 485.3 360 472V408H296C282.7 408 272 397.3 272 384C272 370.7 282.7 360 296 360H360V296C360 282.7 370.7 272 384 272z" />
  </svg>
);

const NewAreaPlaceholder: React.FC = () => {
  return (
    <Link
      to="/areas/new"
      className="group grid aspect-video place-content-center rounded-3xl border-2 border-dashed border-neutral bg-neutral-subtle text-center transition hover:border-primary hover:bg-primary-subtle focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <NewIcon className="mx-auto h-12 w-12 text-neutral group-hover:text-primary" />
      <span className="text-lg font-bold text-neutral group-hover:text-primary">
        Create a new area
      </span>
    </Link>
  );
};

export default NewAreaPlaceholder;
