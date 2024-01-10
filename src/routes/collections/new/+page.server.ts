import { superValidate } from "sveltekit-superforms/server";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { trpcSC } from "$lib/server/trpc/router";
import validators from "$lib/validators";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const load: PageServerLoad = async (event) => {
	return {
		form: await superValidate(validators.collection.createOne),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(
			event.request,
			validators.collection.createOne,
		);
		if (!form.valid) {
			return fail(400, { form });
		}
		let createdCollectionId: string | null = null;
		try {
			const { id } = await (
				await trpcSC(event)
			).collection.createOne(form.data);
			createdCollectionId = id;
		} catch (err) {
			console.error(err);
			return fail(500, { form });
		}
		if (createdCollectionId) {
			return redirect(303, `/collections/${createdCollectionId}`);
		}
		return fail(400, { form });
	},
};
