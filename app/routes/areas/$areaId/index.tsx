import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import NewActivityPlaceholder from "~/components/activities/NewActivityPlaceholder";

import { getArea } from "~/models/area.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.areaId, "areaId not found");
  const area = await getArea({ userId, id: params.areaId });
  if (!area) throw new Response("Not Found", { status: 404 });
  return json({ area });
};

export default function AreaIndexPage() {
  const { area } = useLoaderData<typeof loader>();

  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold">Activities</h2>
      <section className="grid grid-cols-3 gap-6">
        {area.activities.map((activity) => (
          <div key={activity.id}>
            <h4 className="mb-2 text-2xl font-semibold">{activity.name}</h4>
          </div>
        ))}
        <NewActivityPlaceholder />
      </section>
    </div>
  );
}
