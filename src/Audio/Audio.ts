// Modified from Stack Overflow
function swing(p: number) {
	return 0.5 - Math.cos(p * Math.PI) / 2;
}

const logging = false;

const context = new AudioContext();
const gain = context.createGain();
const masterGain = context.createGain();
gain.gain.value = 0.1;
masterGain.gain.value = 1;
gain.connect(masterGain);
masterGain.connect(context.destination);
window.addEventListener('click', () => {
	context.resume();
});

export class AudioPlayer {
	static context = context;
	static gain = gain;
	static masterGain = masterGain;
	static unmuteValue = 1;
	static isMuted = false;

	static mute() {
		AudioPlayer.masterGain.gain.value = 0;
		AudioPlayer.isMuted = true;
	}
	static unmute() {
		AudioPlayer.masterGain.gain.value = 1;
		AudioPlayer.isMuted = false;
	}
	static setVolume(volume: number) {
		AudioPlayer.gain.gain.value = volume;
	}

	static getVolume() {
		return AudioPlayer.gain.gain.value;
	}
	static getIsMuted() {
		return AudioPlayer.isMuted;
	}

	audio: HTMLAudioElement;
	loopListener: (() => void) | null = null;

	constructor(audioSrc: string) {
		this.audio = new Audio(audioSrc);
		context.createMediaElementSource(this.audio).connect(AudioPlayer.gain);
	}

	play(fadeInterval = 0): Promise<void> {
		AudioPlayer.context.resume();
		if (logging) console.log('played ' + this.audio.src);
		return new Promise<void>((resolve) => {
			if (!this.audio.paused) {
				// throw Error('audio already playing');
				return;
			}
			if (fadeInterval > 0) this.audio.volume = 0;
			this.audio.play();
			if (fadeInterval > 0) this.adjustVolume(1, { duration: fadeInterval });
			this.audio.addEventListener('ended', () => {
				this.stop();
				resolve();
			});
		});
	}

	playLoop(fadeInterval = 0): void {
		AudioPlayer.context.resume();
		if (logging) console.log('loop played ' + this.audio.src);
		if (!this.audio.paused) {
			// throw Error('audio already playing');
			return;
		}
		if (fadeInterval > 0) this.audio.volume = 0;
		this.audio.play();
		if (fadeInterval > 0) this.adjustVolume(1, { duration: fadeInterval });
		this.loopListener = () => {
			this.audio.currentTime = 0;
			this.play();
		};
		this.audio.addEventListener('ended', this.loopListener, { once: true });
	}

	stop(fadeInterval = 0): Promise<void> {
		if (logging) console.log('stopped ' + this.audio.src);
		if (this.loopListener) {
			this.audio.removeEventListener('ended', this.loopListener);
			this.loopListener = null;
		}
		return new Promise((resolve) => {
			this.adjustVolume(0, { duration: fadeInterval }).then(() => {
				this.audio.pause();
				this.audio.currentTime = 0;
				this.audio.volume = 1;
				resolve();
			});
		});
	}

	pause(fadeInterval = 0): Promise<void> {
		if (logging) console.log('stopped ' + this.audio.src);
		if (this.loopListener) {
			this.audio.removeEventListener('ended', this.loopListener);
			this.loopListener = null;
		}
		return new Promise((resolve) => {
			this.adjustVolume(0, { duration: fadeInterval }).then(() => {
				this.audio.pause();
				// this.audio.currentTime = 0;
				this.audio.volume = 1;
				resolve();
			});
		});
	}

	// Modified from Stack Overflow
	adjustVolume(
		newVolume: number,
		{
			duration = 0, // ms
			easing = swing,
			interval = 13,
		}: {
			duration?: number;
			easing?: typeof swing;
			interval?: number;
		} = {},
	): Promise<void> {
		const originalVolume = this.audio.volume;
		const delta = newVolume - originalVolume;

		if (!delta || !duration || !easing || !interval) {
			this.audio.volume = newVolume;
			return Promise.resolve();
		}

		const ticks = Math.floor(duration / interval);
		let tick = 1;

		return new Promise((resolve) => {
			const timer = setInterval(() => {
				this.audio.volume = originalVolume + easing(tick / ticks) * delta;

				if (++tick === ticks + 1) {
					clearInterval(timer);
					resolve();
				}
			}, interval);
		});
	}
}
