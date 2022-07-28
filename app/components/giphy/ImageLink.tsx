import { Link } from "@remix-run/react";
import Image from "./Image";
import React from "react";

const ImageLink: React.FC<{ imageUrl: string; to: string; name: string }> = ({
  imageUrl,
  to,
  name,
}) => {
  return (
    <Link to={to} className="group text-center transition">
      <Image imageUrl={imageUrl} />
      <h2 className="mt-4 text-2xl font-bold group-hover:text-primary">
        {name}
      </h2>
    </Link>
  );
};

export default ImageLink;
