import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAreaListItems } from "~/models/area.server";
import { requireUserId } from "~/session.server";
import NewAreaPlaceholder from "~/components/areas/NewAreaPlaceholder";
import Image from "~/components/giphy/Image";

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
          <Link
            to={area.id}
            key={area.id}
            className="group text-center transition"
          >
            {area.imageUrl ? (
              <Image imageUrl={area.imageUrl} />
            ) : (
              <div className="aspect-video" />
            )}

            <h2 className="mt-4 text-2xl font-bold group-hover:text-primary">
              {area.name}
            </h2>
          </Link>
        ))}
        <NewAreaPlaceholder />
      </section>
    </div>
  );
}
