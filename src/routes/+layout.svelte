<script lang="ts">
	import '../styles/global.scss';
	const { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style lang="scss">
	.app {
		width: 100%;
		height: 100svh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
