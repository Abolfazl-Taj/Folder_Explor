import { ActivityAction } from "@/generated/prisma";
import prisma from "./prisma";

type activityParamater = {
  actor: string;
  metadata?: Record<string, any>;
  entityId: string;
  entityType: "FILE" | "FOLDER" | "USER";
  ownerId: string;
  action: ActivityAction;
};
const createLog = async ({
  actor,
  metadata,
  entityId,
  entityType,
  action,
  ownerId,
}: activityParamater) => {
  return prisma.activityLog.create({
    data: {
      actorId: actor,
      targetOwnerId: ownerId,
      entityType,
      action,
      entityId,
      metadata,
    },
  });
};
export default createLog;
