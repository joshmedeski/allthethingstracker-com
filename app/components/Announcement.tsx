export default function Announcement() {
  return (
    <div className="bg-uncommon text-foreground">
      <div className="flex flex-1 items-center justify-center px-4 py-2">
        <span>📢</span>
        <p className="ml-3 truncate font-medium text-white">
          <span className="md:hidden">We are launched!</span>
          <span className="hidden md:inline">
            Big news, we are officially launched!
          </span>
        </p>
        <a
          href="https://joshmedeski.hashnode.dev/hackathon-submission-all-the-things-tracker"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 flex items-center justify-center rounded-md border border-transparent bg-white px-3 py-1 text-sm font-medium text-uncommon shadow-sm hover:bg-indigo-50"
        >
          View Annoucement
        </a>
      </div>
    </div>
  );
}
