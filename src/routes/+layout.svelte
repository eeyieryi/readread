<script lang="ts">
	import { derived } from "svelte/store";
	import { page } from "$app/stores";
	import "../app.pcss";

	const routeId = derived(page, (v) => v.route.id);

	function matchRoute(
		route: string | null,
		path: string,
		...without: string[]
	) {
		return (
			route &&
			route.includes(path) &&
			without.every((v) => !route.includes(v))
		);
	}
</script>

<div class="flex h-screen flex-col overflow-hidden">
	<nav class="navbar max-h-12 min-h-12 justify-between border-b p-0">
		<ul>
			<a
				class:btn-active="{matchRoute($routeId, 'collections', '/new')}"
				class="btn btn-ghost"
				href="/collections">
				Collections
			</a>
			<a
				class:btn-active="{matchRoute($routeId, 'blank')}"
				class="btn btn-ghost"
				href="/blank">
				Blank
			</a>
		</ul>
		<ul>
			<a
				class:btn-active="{matchRoute($routeId, '/collections/new')}"
				class="btn btn-ghost"
				href="/collections/new">
				New Collection
			</a>
			<a
				class:btn-active="{matchRoute($routeId, '/entries/new')}"
				class="btn btn-ghost"
				href="/entries/new">
				New Entry
			</a>
		</ul>
	</nav>
	<div class="h-full overflow-auto">
		<slot />
	</div>
</div>
