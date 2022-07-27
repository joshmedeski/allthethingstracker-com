import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";
import BackToAreasLink from "~/components/areas/BackToAreasLink";

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

  if (typeof name !== "string" || name.length === 0) {
    return json<ActionData>(
      { errors: { name: "Name is required" } },
      { status: 400 }
    );
  }

  const area = await createArea({ name, userId });

  return redirect(`/areas/${area.id}`);
};

export default function NewAreaPage() {
  const actionData = useActionData() as ActionData;
  const nameRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    }
  }, [actionData]);

  return (
    <section>
      <BackToAreasLink />
      <Form method="post" className="mx-auto max-w-screen-sm">
        <div>
          <h1 className="mb-4 text-2xl font-bold">Add new area</h1>
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
            Save
          </button>
        </div>
      </Form>
    </section>
  );
}
