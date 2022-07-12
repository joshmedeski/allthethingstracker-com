import { Link } from "@remix-run/react";

export default function Announcement() {
  return (
    <div className="bg-uncommon text-foreground">
      <div className="flex flex-1 items-center justify-center px-4 py-2">
        <span>📢</span>
        <p className="ml-3 truncate font-medium text-white">
          <span className="md:hidden">We announced a new product!</span>
          <span className="hidden md:inline">
            Big news, The <strong>beta program</strong> is live!
          </span>
        </p>
        <Link
          to="/blog/beta-program-launch"
          className="ml-3 flex items-center justify-center rounded-md border border-transparent bg-white px-3 py-1 text-sm font-medium text-uncommon shadow-sm hover:bg-indigo-50"
        >
          View
        </Link>
      </div>
    </div>
  );
}
