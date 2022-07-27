import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";
import invariant from "tiny-invariant";
import BackToAreaLink from "~/components/activities/BackToAreaLink";
import GifSearchModal from "~/components/giphy/GifSearchModal";

import { createActivity } from "~/models/activity.server";
import { requireUserId } from "~/session.server";

type ActionData = {
  errors?: {
    name?: string;
  };
};

export const action: ActionFunction = async ({
  request,
  params: { areaId },
}) => {
  const userId = await requireUserId(request);
  invariant(areaId, "areaId not found");

  const formData = await request.formData();
  const name = formData.get("name");
  const imageUrl = formData.get("imageUrl");

  if (typeof name !== "string" || name.length === 0) {
    return json<ActionData>(
      { errors: { name: "Name is required" } },
      { status: 400 }
    );
  }

  if (typeof imageUrl !== "string" || name.length === 0) {
    return json<ActionData>(
      { errors: { name: "Image is required" } },
      { status: 400 }
    );
  }

  await createActivity({ name, imageUrl, userId, areaId });

  return redirect(`/areas/${areaId}`);
};

export default function NewActivityPage() {
  const actionData = useActionData() as ActionData;
  const nameRef = React.useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = React.useState<string>();

  React.useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    }
  }, [actionData]);

  return (
    <section className="mx-auto max-w-screen-sm">
      <BackToAreaLink />

      <h3 className="text-2xl font-bold">Add new activity</h3>

      <div className="mb-4">
        <GifSearchModal onSelect={(imageUrl) => setImageUrl(imageUrl)} />
      </div>

      <Form method="post">
        <input value={imageUrl} name="imageUrl" type="hidden" />
        <label className="mb-4 flex w-full flex-col gap-1">
          <span>Name</span>
          <input
            ref={nameRef}
            name="name"
            className="flex-1 rounded-md border-2 border-primary px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.name ? true : undefined}
            aria-errormessage={
              actionData?.errors?.name ? "name-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.name && (
          <div className="pt-1 text-error" id="name-error">
            {actionData.errors.name}
          </div>
        )}

        <div className="text-right">
          <button
            type="submit"
            className="rounded bg-primary py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Save
          </button>
        </div>
      </Form>
    </section>
  );
}
