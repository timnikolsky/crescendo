<script lang="ts">
	import { Note, sampler } from '$lib/note'
	import { onMount } from 'svelte'

	let { showKeys = $bindable(false) }: { showKeys?: boolean } = $props()

	const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const

	function playNote(note: string) {
		sampler.triggerAttackRelease(note, '0.2n');
	}

	let pressedNotes: string[] = $state([])

	const keyToNoteMap: Record<string, string> = {
		a: 'A3',
		w: 'A#3',
		s: 'B3',
		d: 'C4',
		r: 'C#4',
		f: 'D4',
		t: 'D#4',
		g: 'E4',
		h: 'F4',
		u: 'F#4',
		j: 'G4',
		i: 'G#4',
		k: 'A4',
		o: 'A#4',
		l: 'B4',
		';': 'C5',
		'[': 'C#5',
		'\'': 'D5',
		']': 'D#5',
		'\\': 'E5'
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (keyToNoteMap[e.key] && !pressedNotes.includes(keyToNoteMap[e.key])) {
			pressedNotes.push(keyToNoteMap[e.key])
			sampler.triggerAttack(keyToNoteMap[e.key])
		}
	}

	function handleKeyUp(e: KeyboardEvent) {
		pressedNotes = pressedNotes.filter(n => n !== keyToNoteMap[e.key])
		sampler.triggerRelease(keyToNoteMap[e.key])
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	})
</script>

<div class="keyboard" class:show-keys={showKeys}>
	{#each Array(88) as _, noteHeight}
		{@const note = new Note(noteHeight)}
		<button
			class:active={pressedNotes.includes(note.getName())}
			onmousedown={() => playNote(note.getName('#'))} 
			class="{note.keyboardColor}-key"
		>
			{note.getLetter()}
			{#if note.cMajorIndex === 0}
				<span class="octave-index">{note.octave}</span>
			{/if}
		</button>
	{/each}
</div>

<style lang="scss">
	.keyboard {
		display: flex;
		// position: absolute;
		// bottom: 0;
		// left: 50%;
		// transform: translateX(-50%);

		// background: #101011;
		// padding: 0.25rem;
		
		border-radius: 0.5rem;
		width: fit-content;
		overflow-x: scroll;
		user-select: none;
		-ms-overflow-style: none;  /* IE and Edge */
  		scrollbar-width: none;  /* Firefox */
		width: 100%;
		overflow-x: scroll;

		&.show-keys {
			.white-key, .black-key {
				color: gray;
			}
		}

		::-webkit-scrollbar {
			display: none;
		}
	}

	.white-key {
		box-shadow: 0px 4px 18px rgb(0 0 0/4%),0px 2.025px 7.84688px rgba(0,0,0,.027),0px 0.8px 2.925px rgb(0 0 0/2%),0px 0.175px 1.04062px rgba(0,0,0,.013);
		background: linear-gradient(#E5E5E5, white);
		height: 12.627rem;
		width: 2.215rem;
		border-radius: 0.25rem;
		border: none;
		box-shadow: inset 0 -0.5rem 2px lightgray;
		transition: 0.2s;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding-bottom: 1rem;
		color: transparent;
		flex-shrink: 0;
		position: relative;

		&:active, &.active {
			background: linear-gradient(#E5E5E5, #E5E5E5);
			box-shadow: inset 0 0rem 2px gray;
			padding-bottom: 0.5rem;
		}
	}

	.black-key {
		width: 1.37rem;
		height: 8rem;
		background: linear-gradient(black, #333);
		border-radius: 0.175rem;
		margin: 0 calc(-1 * 1.37rem / 2);
		z-index: 1;
		border: none;
		box-shadow: inset 0 -0.5rem 2px black;
		transition: 0.2s;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding-bottom: 0.5rem;
		font-size: 0.75rem;
		color: transparent;
		flex-shrink: 0;

		&:active, &.active {
			background: linear-gradient(black, black);;
			box-shadow: inset 0 0rem 2px black;
			padding-bottom: 2px;
		}
	}

	.octave-index {
		position: absolute;
		left: 0.5rem;
		top: 0.25rem;
		color: gray;
	}
</style>
