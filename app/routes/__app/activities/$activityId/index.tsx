import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import invariant from "tiny-invariant";
import NewEventPlaceholder from "~/components/events/AddEventPlaceholder";

import { getActivity } from "~/models/activity.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const userId = await requireUserId(request);
  invariant(params.activityId, "activityId not found");
  const activity = await getActivity({ userId, id: params.activityId });
  if (!activity) throw new Response("Not Found", { status: 404 });
  return json({ activity });
};

export default function ActivityIndexPage() {
  const { activity } = useLoaderData<typeof loader>();

  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold">Events</h2>
      <NewEventPlaceholder />
      <ul className="ml-4 list-disc">
        {activity.events.map((event) => (
          <li key={event.id}>
            {format(new Date(event.happenedAt), "EEE, MMM do, yyyy")}
          </li>
        ))}
      </ul>
    </div>
  );
}
