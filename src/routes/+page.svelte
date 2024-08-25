<script lang="ts">
	import PianoKeyboard from '$lib/components/PianoKeyboard.svelte'
	import { getRandomNote, Note, sampler } from '$lib/note'

	let showKeys = $state(false)
	let showCurrentNote = $state(false)
	let currentNote = $state(getRandomNote(new Note('C3').height, new Note('C6').height))
</script>

<div class="card">
	<span class="current-note">{showCurrentNote ? currentNote.getName() : '?'}</span>
	<div class="buttons">
		<button
			onclick={() => showCurrentNote = true}
			disabled={showCurrentNote}
		>
			Reveal
		</button>
		<button
			onclick={() => sampler.triggerAttackRelease(currentNote.getName(), 1000)}
		>
			Play
		</button>
		<button
			onclick={() => {
				showCurrentNote = false
				currentNote = getRandomNote(new Note('C3').height, new Note('C6').height)
				sampler.triggerAttackRelease(currentNote.getName(), 1000)
			}}>
			New note
		</button>
	</div>
	<label>
		<input type="checkbox" bind:checked={showKeys}>
		Show keys
	</label>
</div>

<PianoKeyboard {showKeys}/>

<style>
	:global(*) {
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
	}

	:global(body) {
		font-family: sans-serif;
		display: flex;
		flex-direction: column;
		height: 100vh;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		background: #efdac9;
		padding: 2rem 0;
		overflow: hidden;
	}

	.card {
		background: #f3e7de;
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex-direction: column;
		width: 100%;
		max-width: 32rem;
		border-radius: 0.5rem;
		border: 1px solid #e4c6ae;
	}

	.current-note {
		font-size: 2rem;
		font-family: 'Times New Roman', Times, serif;
	}
</style>