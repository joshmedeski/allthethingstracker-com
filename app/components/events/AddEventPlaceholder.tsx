import { Link } from "@remix-run/react";
import React from "react";

const NewEventPlaceholder: React.FC = () => {
  return (
    <Link to="new" className="text-primary underline">
      + Create a new event
    </Link>
  );
};

export default NewEventPlaceholder;
