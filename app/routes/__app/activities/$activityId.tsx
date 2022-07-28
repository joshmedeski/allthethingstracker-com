import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import BackLink from "~/components/BackLink";
import Image from "~/components/giphy/Image";
import { getActivity } from "~/models/activity.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.activityId, "activityId not found");
  const activity = await getActivity({ userId, id: params.activityId });
  if (!activity) throw new Response("Not Found", { status: 404 });
  return json({ activity });
};

export default function AreaPage() {
  const { activity } = useLoaderData<typeof loader>();

  return (
    <div>
      <BackLink to={`/areas/${activity.areaId}`}>
        Back to {activity.area.name}
      </BackLink>

      <section className="flex min-h-[80vh] flex-col justify-between">
        <section className="grid grid-cols-4 gap-6">
          <div>
            <Image imageUrl={activity.imageUrl} />
            <h1 className="mb-6 mt-6 text-center text-3xl font-bold">
              {activity.name}
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
