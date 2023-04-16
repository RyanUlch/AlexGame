export class AudioPlayer {
	static isMuted: boolean = false; // Save
	static volume: number = 100; // Save
	audio: HTMLAudioElement;

	constructor(audioSrc: string) {
		this.audio = new Audio(audioSrc);
	}

	play = () => {
		return new Promise<void>((resolve) => {
			if (!AudioPlayer.isMuted) {
				this.audio.volume = AudioPlayer.volume / 100;
				this.audio.addEventListener('ended', () => {
					resolve();
				});
				this.audio.play();
			}
		});
	};
}
