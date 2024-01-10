import type { RequestEvent } from "@sveltejs/kit";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { t } from "$lib/server/trpc/t";
import { createContext } from "$lib/server/trpc/context";
import { collection, entry } from "$lib/server/trpc/routes";

export const router = t.router({
	collection,
	entry,
});

export async function trpcSC<
	Event extends RequestEvent<Partial<Record<string, string>>, string | null>,
>(event: Event) {
	return t.createCallerFactory(router)(await createContext(event));
}

export type Router = typeof router;
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
