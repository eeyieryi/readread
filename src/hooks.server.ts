import type { Handle } from "@sveltejs/kit";
import { createTRPCHandle } from "trpc-sveltekit";
import { createContext } from "$lib/server/trpc/context";
import { router } from "$lib/server/trpc/router";

export const handle: Handle = createTRPCHandle({ router, createContext });
