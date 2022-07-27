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
      <p>
        <input type="text" name="term" />{" "}
        <button type="submit" disabled={gifSearch.state === "submitting"}>
          Search
        </button>
      </p>

      <section className="grid grid-cols-4 gap-4">
        {gifSearch.type === "done" &&
          gifSearch.data &&
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
