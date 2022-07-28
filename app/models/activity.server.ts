import type { User, Activity, Area } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Activity } from "@prisma/client";

export function getActivity({
  id,
  userId,
}: Pick<Activity, "id"> & {
  userId: User["id"];
}) {
  return prisma.activity.findFirst({
    where: { id, userId },
    select: {
      name: true,
      imageUrl: true,
      areaId: true,
      area: { select: { name: true } },
      events: { select: { id: true, happenedAt: true } },
    },
  });
}

export function getActivityListItems({ userId }: { userId: User["id"] }) {
  return prisma.activity.findMany({
    where: { userId },
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createActivity({
  name,
  imageUrl,
  areaId,
  userId,
}: Pick<Activity, "name"> &
  Pick<Activity, "imageUrl"> & {
    userId: User["id"];
    areaId: Area["id"];
  }) {
  return prisma.activity.create({
    data: {
      name,
      imageUrl,
      area: {
        connect: {
          id: areaId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteActivity({
  id,
  userId,
}: Pick<Activity, "id"> & { userId: User["id"] }) {
  return prisma.activity.deleteMany({
    where: { id, userId },
  });
}
