<script lang="ts">
	import type { PageServerData } from "./$types";
	import AudioPlayer from "$lib/components/AudioPlayer.svelte";
	import { enhance } from "$app/forms";

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{data.entry.title} - {data.entry.collection.title}</title>
</svelte:head>

<div class="flex h-full flex-col overflow-auto text-center">
	<div class="mb-2 ml-auto flex flex-row gap-x-0">
		<a
			href="/entries/{data.entry.id}/edit"
			class="btn btn-warning btn-xs w-28 opacity-50 hover:opacity-100"
			>Edit Entry</a>
		<form
			use:enhance="{({ cancel }) => {
				if (!confirm('Do you really want to delete this entry?')) {
					cancel();
				}
			}}"
			class="form-control"
			method="post"
			action="?/delete">
			<button
				class="btn btn-error btn-xs w-28 opacity-50 hover:opacity-100"
				>Delete Entry</button>
		</form>
	</div>
	<div class="flex flex-col items-center pb-96">
		<h1 class="mb-2 text-3xl">{data.entry.title}</h1>
		<form
			class="mb-4"
			method="post"
			action="/entries/{data.entry.id}/edit">
			<input
				type="hidden"
				name="seen"
				value="{!data.entry.seen}" />
			<button type="submit">
				<input
					class="pointer-events-none"
					type="checkbox"
					checked="{data.entry.seen}" />
				Mark as {data.entry.seen ? "unread" : "read"}
			</button>
		</form>
		<a
			class="mb-2 w-32 underline underline-offset-8"
			href="/collections/{data.entry.collection.id}">
			{data.entry.collection.title}
		</a>
		<pre
			class="mx-16 my-14 whitespace-pre-wrap font-[NotoSansSc] text-2xl lg:mx-72"
			>{data.entry.transcription}</pre>
	</div>
</div>

<div class="fixed bottom-0 w-full bg-white">
	<div
		class="flex flex-row items-center gap-x-4 bg-secondary p-2 opacity-45 hover:opacity-100">
		<form
			method="post"
			action="/entries/{data.entry.id}/edit">
			<input
				type="hidden"
				name="seen"
				value="{!data.entry.seen}" />
			<button type="submit">
				<input
					class="pointer-events-none"
					type="checkbox"
					checked="{data.entry.seen}" />
				Mark as {data.entry.seen ? "unread" : "read"}
			</button>
		</form>
		{#if data.entry.audiofilename && data.entry.audiofilename.length > 0}
			<AudioPlayer audiofilename="{data.entry.audiofilename}" />
		{/if}
	</div>
</div>
