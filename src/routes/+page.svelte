<script lang="ts">
	import PianoKeyboard from '$lib/components/PianoKeyboard.svelte'

	let showKeys = $state(false)
</script>

<label>
	<input type="checkbox" bind:checked={showKeys}>
	Show keys
</label>

<PianoKeyboard {showKeys}/>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		font-family: sans-serif;
		display: flex;
		flex-direction: column;
		height: 100vh;
		gap: 1rem;
		align-items: center;
		justify-content: flex-end;
		background: #efdac9;
		padding: 2rem 0;
		overflow-y: hidden;
	}
</style>