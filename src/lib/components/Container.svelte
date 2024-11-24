<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ContainerProps {
		children: Snippet
	};

	const { children }: ContainerProps = $props();
</script>

<div class="container">
	<div class="content">
		{@render children()}
	</div>
</div>

<style lang="scss">
	.container {
		width: 100%;
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
		overflow-y: auto;
		padding-top: 6rem;
	}

	.content {
		width: 100%;
		max-width: 41rem;
		padding: 0 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
