// https://github.com/prisma/prisma/issues/15614#issuecomment-1491269798

import { createRequire } from "module";
import type { PrismaClient as ImportedPrismaClient } from "@prisma/client";

const require = createRequire(import.meta.url);

const { PrismaClient: RequiredPrismaClient } = require("@prisma/client");

const _PrismaClient: typeof ImportedPrismaClient = RequiredPrismaClient;

class PrismaClient extends _PrismaClient {}
export const prisma = new PrismaClient({
	log: ["info", "warn", "error"],
});
