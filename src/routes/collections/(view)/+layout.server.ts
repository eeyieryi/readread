import type { LayoutServerLoad } from "./$types";
import { trpcSC } from "$lib/server/trpc/router";

export const load: LayoutServerLoad = async (event) => {
	return {
		collections: await (
			await trpcSC(event)
		).collection.loadAllWithEntries(),
	};
};
