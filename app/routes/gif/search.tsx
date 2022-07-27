import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { GiphyFetch } from "@giphy/js-fetch-api";

function errorHasMessage(error: any): error is { message: string } {
  return error && typeof error.message === "string";
}

export const action: ActionFunction = async ({ request }) => {
  const gf = new GiphyFetch(process.env.GIPHY_API_KEY as string);
  const term = (await request.formData()).get("term") as string;
  try {
    const results = await gf.search(term, {
      sort: "relevant",
      lang: "en",
      limit: 10,
      type: "gifs",
    });
    return json(results);
  } catch (error) {
    if (errorHasMessage(error)) {
      return json({ error: error?.message });
    } else {
      return json({ error: "Unknown error" });
    }
  }
};
