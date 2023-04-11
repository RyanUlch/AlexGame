import type { ComputedRef } from 'vue';

export class AudioPlayer {
	static isMuted: boolean;
	static volume: number;
	audio: HTMLAudioElement;

	getVolume = () => {};

	constructor(audioSrc: string) {
		this.audio = new Audio(audioSrc);
	}

	play = () => {
		if (!AudioPlayer.isMuted) {
			this.audio.volume = AudioPlayer.volume;
			this.audio.play();
		}
	};
}
