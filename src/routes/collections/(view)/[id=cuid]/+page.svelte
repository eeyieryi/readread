<script lang="ts">
	import type { PageServerData } from "./$types";
	import { enhance } from "$app/forms";

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{data.collection.title}</title>
</svelte:head>

<div class="flex w-full flex-col text-center">
	<h1 class="mt-8 text-3xl">
		{data.collection.title}
	</h1>
	<div class="my-2 flex flex-row">
		<a
			href="/collections/{data.collection.id}/edit"
			class="btn btn-warning btn-xs ml-auto opacity-50 hover:opacity-100"
			>Edit Collection</a>
		<form
			use:enhance="{({ cancel }) => {
				if (!confirm('Do you really want to delete this collection?')) {
					cancel();
				}
			}}"
			class="form-control"
			method="post"
			action="?/delete">
			<button
				type="submit"
				class="btn btn-error btn-xs opacity-50 hover:opacity-100"
				>Delete Collection</button>
		</form>
	</div>
	<a
		class="btn btn-accent btn-xs mb-2 max-w-44"
		href="/entries/new?fromCollection={data.collection.id}">Add Entry</a>
	<div class="flex flex-col">
		{#if data.collection.entries && data.collection.entries.length > 0}
			{#each data.collection.entries.sort((a, b) => {
				let aSeen = a.seen;
				let bSeen = b.seen;

				if (aSeen && !bSeen) return 1;
				if (bSeen && !aSeen) return -1;
				return 0;
			}) as entry (entry.id)}
				<a
					class="btn btn-outline border-t-0 first:border-t"
					class:btn-accent="{entry.seen}"
					href="/entries/{entry.id}">
					{entry.title}
				</a>
			{/each}
		{:else}
			<h1>No entries</h1>
		{/if}
	</div>
</div>
