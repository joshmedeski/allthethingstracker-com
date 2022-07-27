import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAreaListItems } from "~/models/area.server";
import { requireUserId } from "~/session.server";
import NewAreaPlaceholder from "~/components/areas/NewAreaPlaceholder";
import GifSearchModal from "~/components/giphy/GifSearchModal";
import GiphySearch from "~/components/giphy/GiphySearch";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const areaListItems = await getAreaListItems({ userId });
  return json({ areaListItems });
};

export default function AreasIndexPage() {
  const { areaListItems } = useLoaderData<typeof loader>();

  return (
    <div className="">
      <section className="grid grid-cols-4 gap-4">
        {areaListItems.map((area) => (
          <Link
            to={area.id}
            key={area.id}
            className="group text-center transition"
          >
            {area.imageUrl ? (
              <div
                className="aspect-video bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${area.imageUrl})`,
                }}
              ></div>
            ) : (
              <div className="aspect-video" />
            )}

            <h2 className="text-2xl font-bold group-hover:text-primary">
              {area.name}
            </h2>
          </Link>
        ))}
        <NewAreaPlaceholder />
      </section>
      <GiphySearch />
    </div>
  );
}
