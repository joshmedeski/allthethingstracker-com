import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { getAreaListItems } from "~/models/area.server";
import Logo from "~/components/Logo";

type LoaderData = {
  areaListItems: Awaited<ReturnType<typeof getAreaListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const areaListItems = await getAreaListItems({ userId });
  return json<LoaderData>({ areaListItems });
};

export default function AreasPage() {
  const data = useLoaderData() as LoaderData;

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
