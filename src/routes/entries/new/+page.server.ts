import path from "path";
import { writeFile } from "fs/promises";
import { superValidate } from "sveltekit-superforms/server";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { trpcSC } from "$lib/server/trpc/router";
import validators from "$lib/validators";
import type { WithCollectionId } from "$lib/validators/shared";

export const load: PageServerLoad = async (event) => {
	const defaultValues: WithCollectionId = {
		collectionId: event.url.searchParams.get("fromCollection") ?? "",
	};
	return {
		form: await superValidate(defaultValues, validators.entry.createOne),
		availableCollections: await (await trpcSC(event)).collection.loadAll(),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, validators.entry.createOne);
		if (!form.valid) {
			return fail(400, { form });
		}

		let withAudiofile: boolean | undefined;
		const audioFile = formData.get("audio-file");
		if (audioFile && audioFile instanceof File) {
			withAudiofile = false;
			try {
				const audiofilename = `${form.data.title
					.split("/")
					.join("_")}_${audioFile.name.split("/").join("_")}`;
				await writeFile(
					path.join("_data", "audios", "temp", audiofilename),
					Buffer.from(await audioFile.arrayBuffer()),
				);
				form.data.audiofilename = `temp/${audiofilename}`;
				withAudiofile = true;
			} catch (err) {
				console.error(err);
				return fail(500, { form });
			}
		}
		if (withAudiofile === false) {
			return fail(500, { form });
		}
		let createdEntryId: string | null = null;
		try {
			const { id } = await (
				await trpcSC(event)
			).entry.createOne(form.data);
			createdEntryId = id;
		} catch (err) {
			console.error(err);
			return fail(500, { form });
		}
		if (createdEntryId) {
			return redirect(303, `/entries/${createdEntryId}`);
		}
		return fail(400, { form });
	},
};
