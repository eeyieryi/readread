<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import type { PageServerData } from "./$types";

	export let data: PageServerData;

	const { form } = superForm(data.form);
</script>

<svelte:head>
	<title>Editing {data.collection.title} - Collection</title>
</svelte:head>

<form
	class="form-control mx-auto mt-8 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
	method="post">
	<h1 class="text-center font-serif font-bold uppercase"
		>Editing: {data.collection.title}</h1>
	<label class="label">
		<span class="label-text uppercase">title</span>
		<input
			class="input input-primary"
			name="title"
			type="text"
			bind:value="{$form.title}" />
	</label>
	<label class="label">
		<span class="label-text uppercase">description</span>
		<input
			class="input input-primary"
			name="description"
			type="text"
			bind:value="{$form.description}" />
	</label>
	<label class="label">
		<span class="label-text uppercase">url</span>
		<input
			class="input input-primary"
			name="url"
			type="text"
			bind:value="{$form.description}" />
	</label>
	<a
		href="/collections/{data.collection.id}"
		class="btn btn-warning"
		type="button">
		Discard Changes
	</a>
	<button
		class="btn btn-accent mt-2"
		type="submit">
		Save Collection
	</button>
</form>
