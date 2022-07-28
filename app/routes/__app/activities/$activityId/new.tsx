import * as React from "react";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import invariant from "tiny-invariant";
import BackLink from "~/components/BackLink";
import DatePicker from "~/components/DatePicker";

import { createEvent } from "~/models/event.server";
import { requireUserId } from "~/session.server";

type ActionData = {
  errors?: {
    name?: string;
    date?: string;
  };
};

export const action: ActionFunction = async ({
  request,
  params: { activityId },
}) => {
  const userId = await requireUserId(request);
  invariant(activityId, "activityId not found");
  const formData = await request.formData();
  const date = formData.get("date");
  console.log("date: ", date);

  if (date === null) {
    return json<ActionData>(
      { errors: { date: "Date is required" } },
      { status: 400 }
    );
  }

  if (date) {
    await createEvent({ happenedAt: new Date(date), userId, activityId });
    return redirect(`/activities/${activityId}`);
  } else {
    return json<ActionData>(
      { errors: { name: "Something went wrong" } },
      { status: 500 }
    );
  }
};

export default function NeweventPage() {
  const actionData = useActionData() as ActionData;
  const nameRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    }
  }, [actionData]);

  return (
    <section className="mx-auto max-w-screen-sm">
      <BackLink to="..">Back to Events</BackLink>
      <h3 className="text-2xl font-bold">Add new event</h3>

      <Form method="post">
        <DatePicker />
        {actionData?.errors?.date && (
          <div className="pt-1 text-error" id="name-error">
            {actionData.errors.date}
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
