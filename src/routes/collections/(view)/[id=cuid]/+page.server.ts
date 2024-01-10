import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { trpcSC } from "$lib/server/trpc/router";
import { collectionIdSchema } from "$lib/validators/shared";

export const load: PageServerLoad = async (event) => {
	return {
		collection: await (
			await trpcSC(event)
		).collection.loadOneWithEntries({
			collectionId: event.params.id,
		}),
	};
};

export const actions: Actions = {
	delete: async (event) => {
		const result = collectionIdSchema.safeParse({
			collectionId: event.params.id,
		});
		if (!result.success) {
			console.error(result.error);
			return fail(400);
		}
		let deletedId: string | null = null;
		try {
			const { id } = await (
				await trpcSC(event)
			).collection.deleteOne(result.data);
			deletedId = id;
		} catch (err) {
			console.error(err);
			return fail(500);
		}
		if (deletedId) {
			return redirect(303, "/collections");
		}
		return fail(500);
	},
};
