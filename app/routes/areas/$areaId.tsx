import type { ActionArgs, LoaderArgs, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, Outlet, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import BackToAreasLink from "~/components/areas/BackToAreasLink";

import { deleteArea } from "~/models/area.server";
import { getArea } from "~/models/area.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.areaId, "areaId not found");
  const area = await getArea({ userId, id: params.areaId });
  if (!area) throw new Response("Not Found", { status: 404 });
  return json({ area });
};

export const action = async ({ request, params }: ActionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.areaId, "areaId not found");
  await deleteArea({ userId, id: params.areaId });
  return redirect("/areas");
};

export default function AreaDetailsPage() {
  const { area } = useLoaderData<typeof loader>();

  return (
    <div>
      <BackToAreasLink />
      <h1 className="text-2xl font-bold">{area.name}</h1>
      <hr className="my-4" />

      <div className="flex flex-col gap-16">
        <section>
          <h2 className="text-2xl font-bold">Activities</h2>
          <div className="flex flex-col gap-4">
            {area.activities.length ? (
              area.activities.map((activity) => (
                <div key={activity.id}>
                  <h4 className="text-2xl font-bold">{activity.name}</h4>
                </div>
              ))
            ) : (
              <p>
                No activities found. Select a area on the left, or{" "}
                <Link to="new" className="text-blue-500 underline">
                  create a new area.
                </Link>
              </p>
            )}
          </div>

          <Outlet />
        </section>

        <Form
          method="post"
          className="rounded-lg border border-warning bg-warning-subtle p-4"
        >
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Delete this area
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Once you delete this area, you will lose all data associated with
              it.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="rounded-md border border-transparent bg-warning px-4 py-2 font-medium text-black hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
            >
              Delete {area.name} Area
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();
  if (caught.status === 404) return <div>Area not found</div>;
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
