<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import type { PageServerData } from "./$types";

	export let data: PageServerData;

	const { form } = superForm(data.form);
</script>

<svelte:head>
	<title>New Entry</title>
</svelte:head>

<form
	class="form-control mx-auto mt-8 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
	enctype="multipart/form-data"
	method="post">
	<h1 class="text-center font-serif font-bold uppercase">New Entry</h1>
	<label class="label">
		<span class="label-text uppercase">title</span>
		<input
			class="input input-primary"
			name="title"
			type="text"
			bind:value="{$form.title}" />
	</label>
	<label class="label">
		<span class="label-text uppercase">url</span>
		<input
			class="input input-primary"
			name="url"
			type="text"
			bind:value="{$form.url}" />
	</label>
	<label class="label">
		<span class="label-text uppercase">audio file</span>
		<input
			class="file-input file-input-primary"
			name="audio-file"
			type="file"
			accept="audio/*" />
	</label>
	<label class="label flex-col">
		<span class="label-text mb-2 self-start uppercase">transcription</span>
		<textarea
			class="textarea textarea-primary h-56 w-full resize-none"
			name="transcription"
			bind:value="{$form.transcription}"></textarea>
	</label>
	<label class="label">
		<span class="label-text uppercase">existing collection</span>
		<select
			class="select select-primary w-56"
			name="collectionId"
			bind:value="{$form.collectionId}">
			<option
				selected
				value="">
				-
			</option>
			{#each data.availableCollections as collection (collection.id)}
				<option
					value="{collection.id}"
					selected="{$form.collectionId === collection.id}">
					{collection.title}
				</option>
			{/each}
		</select>
	</label>
	<label class="label">
		<span class="label-text uppercase">new collection</span>
		<input
			class="input input-primary w-56"
			id="collectionTitle"
			name="collectionTitle"
			type="text"
			bind:value="{$form.collectionTitle}" />
	</label>
	<button
		class="btn btn-accent mt-2"
		type="submit">
		Create Entry
	</button>
</form>
