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
    include: { activities: true },
  });
}

export function getAreaListItems({ userId }: { userId: User["id"] }) {
  return prisma.area.findMany({
    where: { userId },
    select: { id: true, name: true, imageUrl: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createArea({
  name,
  userId,
  imageUrl,
}: Pick<Area, "name"> &
  Pick<Area, "imageUrl"> & {
    userId: User["id"];
  }) {
  return prisma.area.create({
    data: {
      name,
      imageUrl,
      user: { connect: { id: userId } },
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
