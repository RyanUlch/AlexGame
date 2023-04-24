import { AudioPlayer } from './Audio';

export const audios: { [name: string]: AudioPlayer } = {
	// Scores
	overworld: new AudioPlayer('src/assets/audio/overworld.mp3'),
	final: new AudioPlayer('src/assets/audio/FinalTheme.mp3'),
	inside: new AudioPlayer('src/assets/audio/inside.mp3'),

	// Sound Effects
	doorOpen: new AudioPlayer('src/assets/audio/dooropen.mp3'),
	doorClose: new AudioPlayer('src/assets/audio/doorclose.mp3'),
	newLog: new AudioPlayer('src/assets/audio/lilbeep.wav'),
	select: new AudioPlayer('src/assets/audio/select.wav'),
	blip: new AudioPlayer('src/assets/audio/menuBlip.wav'),
	interaction: new AudioPlayer('src/assets/audio/interactionStart.wav'),
	break: new AudioPlayer('src/assets/audio/woodBreak.wav'),
	splash: new AudioPlayer('src/assets/audio/splash.wav'),
	stab: new AudioPlayer('src/assets/audio/knife.wav'),
	steps: new AudioPlayer('src/assets/audio/steps.mp3'),
	punch: new AudioPlayer('src/assets/audio/punch.mp3'),
	warp: new AudioPlayer('src/assets/audio/warp.wav'),
};

let currentTrack = '';

// These prevent multiple of the same kind of audio from being played at the same time
export const audioTracks: { [track: string]: AudioPlayer } = {};
export const stopTrackAudio = async (track: string, options = { fadeInterval: 0 }) => {
	if (audioTracks[track]) {
		await audioTracks[track].pause(options.fadeInterval);
	}
};
export const playTrackAudio = async (
	track: string,
	audio: AudioPlayer,
	options = { fadeInterval: 0, loop: false },
) => {
	console.log(track, audio, options);
	if (track !== currentTrack) {
		await stopTrackAudio(currentTrack, options);
		currentTrack = track;
		audioTracks[track] = audio;
		if (options.loop) audio.playLoop(options.fadeInterval);
		else audio.play(options.fadeInterval);
	}
};
