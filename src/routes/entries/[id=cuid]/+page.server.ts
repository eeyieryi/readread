import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { trpcSC } from "$lib/server/trpc/router";
import { entryIdSchema } from "$lib/validators/shared";

export const load: PageServerLoad = async (event) => {
	const tSC = await trpcSC(event);
	return {
		entry: await tSC.entry.loadOneWithCollection({
			entryId: event.params.id,
		}),
	};
};

export const actions: Actions = {
	delete: async (event) => {
		const result = entryIdSchema.safeParse({
			entryId: event.params.id,
		});
		if (!result.success) {
			console.error(result.error);
			return fail(400);
		}
		let deletedCollectionId: string | null = null;
		try {
			const { collectionId } = await (
				await trpcSC(event)
			).entry.deleteOne(result.data);
			deletedCollectionId = collectionId;
		} catch (err) {
			console.error(err);
			return fail(500);
		}
		if (deletedCollectionId) {
			return redirect(303, `/collections/${deletedCollectionId}`);
		}
		console.error("Shouldn't fail here");
		return fail(500);
	},
};
