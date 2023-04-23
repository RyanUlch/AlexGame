<script setup lang="ts">
	import { useSettingsStore } from '@/stores/settings';
	import { useTimelineStore } from '@/stores/timeline';
	import { computed } from 'vue';
	import AppModal from './AppModal.vue';
	const timelineStore = useTimelineStore();
	const settingStore = useSettingsStore();

	const endingType = computed(() => {
		switch (timelineStore.endingChoice) {
			case 0:
				return 'Terrible Ending';
			case 1:
				return 'Saviour Ending';
			case 2:
				if (timelineStore.PCKillsTeddy) {
					return 'You Monster Ending';
				} else {
					return 'Asshole Ending';
				}
			case 4:
				return 'You Tried Your Best... Ending';
			case 5:
				return 'Whoopsy Ending';
			case 6:
				return 'Good Ending';
		}
		return '';
	});

	const endingText1 = computed(() => {
		switch (timelineStore.endingChoice) {
			case 0:
				return "Well, that was... Something. You managed to get yourself killed again, as well as Lavelle. So Really, the situation is kind of worse than when you began. Lavelle isn't around to bring you back this time either. So I guess that's it. Teddy will get away with it although they will be haunted by the site of your face as the blood drained away. So I guess that's some kind of justice...";
			case 1:
				return "Hmm... You tried to stop Teddy, that's for sure. Who knows how that fight got away from you. Sadly, Lavelle after getting the guard to come and help didn't think to go back to their altar to bring you back again. So that's it. You may not have stopped your own murder, but you did make sure that Teddy won't be able to hurt Lavelle again. So Good Job I guess...";
			case 2:
				if (timelineStore.PCKillsTeddy) {
					return "I.... Why? How was this the best solution in your eyes? To go along with the murder, then get rid of the only one who could snitch on you. You really don't care about human life, do you? It doesn't matter, I guess. You'll continue on in your life doing whatever you want. Maybe you'll go around killing everyone in town, what do I care?";
				} else {
					return 'Wow, what did you just do? Did you just go through with the murder of a (fairly) innocent soul just because it was likely you would survive? So their life is worth less than yours? Hmm, that probably says a lot about the person you are.';
				}

			case 4:
				return "Lavelle is ok, they are safe. Teddy however... Consumed with guilt of what they were about to do, took their own life. It's up to you to determine if that's an acceptable loss. They were attempting murder, but Teddy was mostly kind hearted, just mistaken. However, You do get to go on with your life. Let's just hope you're a bit more conscientious of others.";
			case 5:
				return "I guess your reasoning was a bit too persuasive. You ended up making Teddy feel like a monster, and maybe they were, that's not for me to judge. However I can tell you that they did not have evil in their heart, as misguided as their actions were. With Lavelle and you now safe you both can move on with your lives... If you are able to explain what the hell happened here tonight.";
			case 6:
				return 'Good job! You were able to prevent your own murder, stop Teddy from hurting Lavelle, and on top of that convince Teddy that they were in the wrong and that it was going to be ok.';
		}
		return '';
	});

	const endingText2 = computed(() => {
		if (
			!timelineStore.Abigail_angry &&
			timelineStore.Sam_atFarm &&
			timelineStore.endingChoice !== 2 &&
			timelineStore.endingChoice !== 33
		) {
			return 'On top of everything happening with Lavelle and Teddy, you were able to take the time to get Sam and Abigail to actually communicate with each other. Sometimes you just need to be reminded to be kind and understanding. If both parties come together with that in mind, things tend to get a little easier.';
		} else if (!timelineStore.Abigail_angry && timelineStore.Sam_atFarm) {
			return "So you didn't value life when yours was on the line, but you took the time to get Sam and Abigail to reconcile. You are a weird one.";
		} else if (timelineStore.Sam_Moving) {
			return 'Also Sam decided to move away due to a misunderstanding with Abigail. It really seems like if they were able to talk to each other with open and honest hearts they could have come to understand each other.';
		} else {
			return "Over on the Sam and Abigail front; They aren't really talking now. Maybe in time they will be able to have an honest discussion with each other, but it seems like that's not happening anytime soon.";
		}
	});
</script>

<template>
	<AppModal
		v-if="settingStore.endingIsOpen"
		title="Game Over"
		:noClose="true">
		<template v-slot="modal">
			<div class="full">
				<div class="textContainer">
					<h2 class="title">{{ endingType }}</h2>

					<p class="p">&emsp;&emsp;&emsp;{{ endingText1 }}</p>
					<p class="p">&emsp;&emsp;&emsp;{{ endingText2 }}</p>
					<hr />
					<p class="p">
						&emsp;&emsp;&emsp;Well that's it. We hope you enjoyed playing our game. We created it in
						the 2023 GameDev.JS Game Jam within a 2 week period. Have a great day and remember,
						being open and honest with those around you is the best way to foster relationships.
					</p>
					<p class="hint">
						&emsp;&emsp;&emsp;If you are having trouble in your life, please keep in mind that you
						are cared for, even when it doesn't feel like it. We can say for sure that we appreciate
						your existence.
					</p>
					<p class="p">International information for Suicide prevention:</p>
					<div class="center">
						<a
							class="link"
							href="https://blog.opencounseling.com/suicide-hotlines/"
							>OpenCounseling.com</a
						>
					</div>
					<p class="p">International information for Domestic Abuse Help:</p>
					<div class="center">
						<a
							class="link"
							href="https://www.hotpeachpages.net/a/countries.html"
							>HotPeachPages.net</a
						>
					</div>
					<p class="hint">
						(Please note: We are not associated with these sites, and make no guarantee that the
						link will work forever)
					</p>
					<p class="p">Thank you for playing. We love you.</p>
				</div>
			</div>
		</template>
	</AppModal>
</template>

<style scoped>
	.title {
		padding-bottom: 20px;
		text-decoration: underline;
		text-align: center;
		line-height: 2.2rem;
	}
	.p {
		padding: 10px;
		line-height: 1.3rem;
	}

	.center {
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.link {
		text-align: center;
	}
	.full {
		height: 30rem;
	}
	.textContainer {
		overflow-y: scroll;
		height: 100%;
	}
	.hint {
		border: 1px solid black;
		width: 90%;
		margin: 10px auto;
		padding: 10px;
		font-size: 0.8rem;
		line-height: 1.2rem;
		background-color: var(--modal-header-background);
	}
	.advanceBtn {
		width: 100%;
		height: 40px;
		background-color: var(--modal-header-background);
	}
</style>
