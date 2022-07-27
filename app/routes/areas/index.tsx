import { Link } from "@remix-run/react";
import GiphySearch from "~/components/giphy/GiphySearch";

export default function AreasIndexPage() {
  return (
    <div>
      <p>
        No area selected. Select a area on the left, or{" "}
        <Link to="new" className="text-blue-500 underline">
          create a new area.
        </Link>
      </p>
      <GiphySearch />
    </div>
  );
}
