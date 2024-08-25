import * as Tone from 'tone'

const urls: Record<string, string> = {
	'A0': 'A0.mp3',
	'C8': 'C8.mp3',
}

for (const note of ['C', 'D#', 'F#', 'A']) {
	for (let octave = 1; octave <= 7; octave++) {
		urls[note + octave] = note.replace('#', 's') + octave + '.mp3'
	}
}

export const sampler = new Tone.Sampler({
	urls,
	release: 1,
	baseUrl: "https://tonejs.github.io/audio/salamander/"
}).toDestination()

const cMajorScaleIndexMap: Record<string, number> = {
	'C': 0,
	'C#': 1,
	'Db': 1,
	'D': 2,
	'D#': 3,
	'Eb': 3,
	'E': 4,
	'F': 5,
	'F#': 6,
	'Gb': 6,
	'G': 7,
	'G#': 8,
	'Ab': 8,
	'A': 9,
	'A#': 10,
	// TODO: decide which to use
	'B': 10,
	'Hb': 10,
	'H': 11
};

const cMajorScaleNamesSharpMap: Record<number, string> = {
	0: 'C',
	1: 'C#',
	2: 'D',
	3: 'D#',
	4: 'E',
	5: 'F',
	6: 'F#',
	7: 'G',
	8: 'G#',
	9: 'A',
	10: 'A#',
	11: 'B'
}

const cMajorScaleNamesFlatMap: Record<number, string> = {
	0: 'C',
	1: 'Db',
	2: 'D',
	3: 'Eb',
	4: 'E',
	5: 'F',
	6: 'Gb',
	7: 'G',
	8: 'Ab',
	9: 'A',
	10: 'Bb',
	11: 'B'
}

export class Note {
	height: number;

	constructor(note: string | number) {
		if (typeof note === 'number') {
			this.height = note;
		}
		else {
			const letter = note.substring(0, note.length - 1)
			const octave = Number(note[note.length - 1])

			this.height = octave * 12 + cMajorScaleIndexMap[letter] - cMajorScaleIndexMap['A']
		}
	}

	get octave() {
		return Math.floor((this.height + cMajorScaleIndexMap['A']) / 12)
	}

	get cMajorIndex() {
		return (this.height + cMajorScaleIndexMap['A']) % 12
	}

	getLetter(preferredAccidental: '#' | 'b' = '#') {
		if (preferredAccidental === '#')
			return cMajorScaleNamesSharpMap[this.cMajorIndex]
		else
			return cMajorScaleNamesFlatMap[this.cMajorIndex]
	}

	getName(preferredAccidental: '#' | 'b' = '#') {
		return this.getLetter(preferredAccidental) + this.octave
	}

	get keyboardColor() {
		return [1, 3, 6, 8, 10].includes(this.cMajorIndex) ? 'black' : 'white'
	}
}

const minNote = new Note('A0')
const maxNote = new Note('C8')

export function getRandomNote(
	minHeight: number = minNote.height,
	maxHeight: number = maxNote.height
) {
	if (minHeight < minNote.height)
		minHeight = minNote.height
	if (maxHeight > maxNote.height)
		maxHeight = maxNote.height

	// make inclusive
	maxHeight++

	return new Note(Math.floor(Math.random() * (maxHeight - minHeight) + minHeight))
}
