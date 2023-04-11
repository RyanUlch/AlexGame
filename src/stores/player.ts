/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLogComposable } from '@/composables/logComposable';

export const usePlayerStore = defineStore('playerStore', () => {
	const { addLogLine } = useLogComposable();

	const health = ref(10);
	const maxHealth = ref(10);
	const energy = ref(5);
	const maxEnergy = ref(5);

	const heal = (amount: number) => {
		if (amount + health.value > maxHealth.value) {
			health.value = maxHealth.value;
		} else {
			health.value += amount;
		}
	};

	const takeDamage = (amount: number) => {
		if (health.value - amount <= 0) {
			addLogLine('You died. Bummer...');
			health.value = 0;
			return false;
		} else {
			health.value -= amount;
			return true;
		}
	};

	const energize = (amount: number) => {
		if (amount + energy.value > maxEnergy.value) {
			energy.value = maxEnergy.value;
		} else {
			energy.value += amount;
		}
	};

	const useEnergy = (amount: number) => {
		if (energy.value - amount < 0) {
			addLogLine(`You don't have enough energy to use that.`);
			return false;
		} else {
			energy.value -= amount;
			return true;
		}
	};

	return {
		health,
		maxHealth,
		energy,
		maxEnergy,
		heal,
		takeDamage,
		energize,
		useEnergy,
	};
});
