import { initTRPC } from "@trpc/server";
import type { Context } from "$lib/server/trpc/context";

export const t = initTRPC.context<Context>().create();
