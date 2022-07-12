import type { User, Event, Area, Activity } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Event } from "@prisma/client";

export function getEvent({
  id,
  userId,
}: Pick<Event, "id"> & {
  userId: User["id"];
}) {
  return prisma.event.findFirst({
    where: { id, userId },
  });
}

export function getEventListItems({ userId }: { userId: User["id"] }) {
  return prisma.event.findMany({
    where: { userId },
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createEvent({
  name,
  activityId,
  userId,
}: Pick<Event, "name"> & {
  userId: User["id"];
  activityId: Activity["id"];
}) {
  return prisma.event.create({
    data: {
      name,
      activity: { connect: { id: activityId } },
      user: { connect: { id: userId } },
    },
  });
}

export function deleteEvent({
  id,
  userId,
}: Pick<Event, "id"> & { userId: User["id"] }) {
  return prisma.event.deleteMany({
    where: { id, userId },
  });
}
