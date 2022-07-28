import type { ActionArgs, LoaderArgs, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, Outlet, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import BackToAreasLink from "~/components/areas/BackToAreasLink";
import Image from "~/components/giphy/Image";

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

export default function AreaPage() {
  const { area } = useLoaderData<typeof loader>();

  return (
    <div>
      <BackToAreasLink />

      <section className="flex min-h-[80vh] flex-col justify-between">
        <section className="grid grid-cols-4 gap-6">
          <div>
            <Image imageUrl={area.imageUrl} />
            <h1 className="mb-6 mt-6 text-center text-3xl font-bold">
              {area.name}
            </h1>
          </div>

          <div className="col-span-3">
            <Outlet />
          </div>
        </section>
      </section>
    </div>
  );
}
