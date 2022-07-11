import type { User, Area } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Area } from "@prisma/client";

export function getArea({
  id,
  userId,
}: Pick<Area, "id"> & {
  userId: User["id"];
}) {
  return prisma.area.findFirst({
    where: { id, userId },
  });
}

export function getAreaListItems({ userId }: { userId: User["id"] }) {
  return prisma.area.findMany({
    where: { userId },
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createArea({
  name,
  userId,
}: Pick<Area, "name"> & {
  userId: User["id"];
}) {
  return prisma.area.create({
    data: {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteArea({
  id,
  userId,
}: Pick<Area, "id"> & { userId: User["id"] }) {
  return prisma.area.deleteMany({
    where: { id, userId },
  });
}
