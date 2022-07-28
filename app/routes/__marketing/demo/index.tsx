import { Link } from "@remix-run/react";

export default function DemoIndexPage() {
  return (
    <section>
      <h1 className="text-4xl font-extrabold">Dashboard</h1>
      <div className="grid grid-cols-4">
        <Link to="pet">
          <img src="/demo/pet-demo.jpg" alt="pet demo" />
          <h2 className="text-center text-3xl font-extrabold">Pet</h2>
        </Link>
      </div>
    </section>
  );
}
