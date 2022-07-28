import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Outlet } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import Logo from "~/components/Logo";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  if (!userId) return redirect("/login");
  return null;
};

export default function AppLayout() {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between p-4">
        <Logo />
        <Form action="/logout" method="post">
          <button type="submit" className="text-primary underline">
            Logout
          </button>
        </Form>
      </header>

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
