<script lang="ts">
	import type { LayoutServerData } from "./$types";
	import { page } from "$app/stores";

	export let data: LayoutServerData;
</script>

<div class="flex h-full flex-row overflow-hidden">
	<div class="flex min-w-44 max-w-44 flex-col overflow-scroll border-r">
		{#each data.collections as collection (collection.id)}
			<a
				class="btn btn-ghost"
				class:btn-active="{$page.params.id === collection.id}"
				href="/collections/{collection.id}">
				{collection.title}
			</a>
		{/each}
	</div>

	<div class="w-full overflow-scroll">
		<slot />
	</div>
</div>
