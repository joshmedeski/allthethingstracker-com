import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAreaListItems } from "~/models/area.server";
import { requireUserId } from "~/session.server";
import NewAreaPlaceholder from "~/components/areas/NewAreaPlaceholder";
import ImageLink from "~/components/giphy/ImageLink";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const areaListItems = await getAreaListItems({ userId });
  return json({ areaListItems });
};

export default function AreasIndexPage() {
  const { areaListItems } = useLoaderData<typeof loader>();

  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold">Areas</h2>
      <section className="grid grid-cols-4 gap-6">
        {areaListItems.map((area) => (
          <ImageLink
            to={area.id}
            key={area.id}
            imageUrl={area.imageUrl}
            name={area.name}
          />
        ))}
        <NewAreaPlaceholder />
      </section>
    </div>
  );
}
