import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import React from "react";
import BackToAreasLink from "~/components/areas/BackToAreasLink";
import GifSearchModal from "~/components/giphy/GifSearchModal";

import { createArea } from "~/models/area.server";
import { requireUserId } from "~/session.server";

type ActionData = {
  errors?: {
    name?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

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

  const area = await createArea({ name, userId, imageUrl });
  return redirect(`/areas/${area.id}`);
};

export default function NewAreaPage() {
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
      <BackToAreasLink />

      <h1 className="mb-4 text-2xl font-bold">Add new area</h1>

      <div className="mb-4">
        <GifSearchModal onSelect={(imageUrl) => setImageUrl(imageUrl)} />
      </div>

      <Form method="post">
        <div>
          <input value={imageUrl} name="imageUrl" type="hidden" />
          <label className="flex w-full flex-col gap-1">
            <span>Name</span>
            <input
              ref={nameRef}
              name="name"
              className="mb-2 flex-1 rounded-md border-2 border-primary px-3 text-lg leading-loose"
              aria-invalid={actionData?.errors?.name ? true : undefined}
              aria-errormessage={
                actionData?.errors?.name ? "name-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.name && (
            <div className="text-error" id="name-error">
              {actionData.errors.name}
            </div>
          )}
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="rounded bg-primary py-2 px-4 font-bold tracking-wider text-white"
          >
            Add
          </button>
        </div>
      </Form>
    </section>
  );
}
