import { superValidate } from "sveltekit-superforms/server";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import validators from "$lib/validators";
import { trpcSC } from "$lib/server/trpc/router";

export const load: PageServerLoad = async (event) => {
	const collection = await (
		await trpcSC(event)
	).collection.loadOne({
		collectionId: event.params.id,
	});
	return {
		collection,
		form: await superValidate(collection, validators.collection.updateOne),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		formData.set("collectionId", event.params.id);
		const form = await superValidate(
			formData,
			validators.collection.updateOne,
		);
		if (!form.valid) {
			return fail(400, { form });
		}
		let updatedCollectionId: string | null = null;
		try {
			const { id } = await (
				await trpcSC(event)
			).collection.updateOne(form.data);
			updatedCollectionId = id;
		} catch (err) {
			console.error(err);
			return fail(500, { form });
		}
		if (updatedCollectionId) {
			return redirect(303, `/collections/${updatedCollectionId}`);
		}
		return fail(500, { form });
	},
};
