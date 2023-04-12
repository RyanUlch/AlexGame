export class AudioPlayer {
	static isMuted: boolean = false; // Save
	static volume: number = 1; // Save
	audio: HTMLAudioElement;

	constructor(audioSrc: string) {
		this.audio = new Audio(audioSrc);
	}

	play = () => {
		if (!AudioPlayer.isMuted) {
			this.audio.volume = AudioPlayer.volume / 100;
			this.audio.play();
		}
	};
}
