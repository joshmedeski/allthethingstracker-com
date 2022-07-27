import { useEffect, useRef } from "react";
import { useFetcher } from "@remix-run/react";
import type { GifsResult } from "@giphy/js-fetch-api";

const GiphySearch: React.FC = () => {
  const gifSearch = useFetcher<GifsResult>();
  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (gifSearch.type === "done" && gifSearch.data) {
      ref?.current?.reset();
    }
  }, [gifSearch]);

  return (
    <gifSearch.Form ref={ref} method="post" action="/gif/search">
      <div>
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700"
        >
          Gif search
        </label>
        <div className="relative mt-1 flex items-center">
          <input
            type="text"
            name="term"
            className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <button
              type="submit"
              className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400"
              disabled={gifSearch.state === "submitting"}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-4 gap-4">
        {gifSearch.type === "done" &&
          !!gifSearch.data.data &&
          gifSearch.data.data.map((gif) => (
            <div
              key={gif.id}
              className="aspect-video bg-neutral bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${gif.images.downsized_large.url})`,
              }}
            ></div>
          ))}
      </section>
    </gifSearch.Form>
  );
};

export default GiphySearch;
