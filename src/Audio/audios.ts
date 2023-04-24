import { AudioPlayer } from './Audio';

export const audios: { [name: string]: AudioPlayer } = {
	// Scores
	overworld: new AudioPlayer('src/assets/audio/overworld.mp3'),

	// Sound Effects
	doorOpen: new AudioPlayer('src/assets/audio/dooropen.mp3'),
	doorClose: new AudioPlayer('src/assets/audio/doorclose.mp3'),
	newLog: new AudioPlayer('src/assets/audio/lilbeep.wav'),
};

// These prevent multiple of the same kind of audio from being played at the same time
export const audioTracks: { [track: string]: AudioPlayer } = {};
export const stopTrackAudio = async (track: string, options = { fadeInterval: 0 }) => {
	if (audioTracks[track]) {
		await audioTracks[track].stop(options.fadeInterval);
	}
};
export const playTrackAudio = async (
	track: string,
	audio: AudioPlayer,
	options = { fadeInterval: 0, loop: false },
) => {
	await stopTrackAudio(track, options);
	audioTracks[track] = audio;
	if (options.loop) audio.playLoop(options.fadeInterval);
	else audio.play(options.fadeInterval);
};
