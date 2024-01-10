import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";
import { trpcSC } from "$lib/server/trpc/router";
import validators from "$lib/validators";

export const load: PageServerLoad = async (event) => {
	const tSC = await trpcSC(event);
	const entry = await tSC.entry.loadOne({ entryId: event.params.id });
	return {
		entry,
		form: await superValidate(entry, validators.entry.updateOneForm),
		availableCollections: await tSC.collection.loadAll(),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		formData.set("entryId", event.params.id);
		const form = await superValidate(
			formData,
			validators.entry.updateOneForm,
		);
		if (!form.valid) {
			console.error(form.errors);
			return fail(400, { form });
		}
		let updatedEntryCollectionId: string | null = null;
		try {
			const { collectionId } = await (
				await trpcSC(event)
			).entry.updateOne(form.data);
			updatedEntryCollectionId = collectionId;
		} catch (err) {
			console.error(err);
			return fail(500, { form });
		}
		if (formData.has("seen") && updatedEntryCollectionId) {
			return redirect(303, `/collections/${updatedEntryCollectionId}`);
		}
		return redirect(303, `/entries/${form.data.entryId}`);
	},
};
