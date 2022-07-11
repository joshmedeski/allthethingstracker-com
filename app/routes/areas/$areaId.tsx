import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Area } from "~/models/area.server";
import { deleteArea } from "~/models/area.server";
import { getArea } from "~/models/area.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  area: Area;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.areaId, "areaId not found");

  const area = await getArea({ userId, id: params.areaId });
  if (!area) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ area });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.areaId, "areaId not found");

  await deleteArea({ userId, id: params.areaId });

  return redirect("/areas");
};

export default function AreaDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.area.name}</h3>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Area not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
