/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLogComposable } from '@/composables/logComposable';

export const usePawnStore = defineStore('pawnStore', () => {
	const { addLogLine } = useLogComposable();

	const health = ref(10);
	const maxHealth = ref(10);
	const energy = ref(5);
	const maxEnergy = ref(5);

	const npcList: { id: string; health: number }[] = [];

	const registerNpc = (npcId: string, startingHealth: number) => {
		npcList.push({ id: npcId, health: startingHealth });
	};

	const deregisterNpc = (npcIndex: number) => {
		if (npcIndex > -1) {
			npcList.splice(npcIndex, 1);
		}
	};

	const heal = (amount: number, index: number) => {
		if (index < 0) {
			if (amount + health.value > maxHealth.value) {
				health.value = maxHealth.value;
			} else {
				health.value += amount;
			}
		} else {
			npcList[index].health += amount;
		}
	};

	const takeDamage = (amount: number, index: number) => {
		if (index < 0) {
			if (health.value - amount <= 0) {
				addLogLine('You died. Bummer...');
				health.value = 0;
				return false;
			} else {
				health.value -= amount;
				return true;
			}
		} else {
			npcList[index].health -= amount;
			if (npcList[index].health <= 0) {
				deregisterNpc(index);
			}
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

		npcList,

		heal,
		takeDamage,
		energize,
		useEnergy,

		registerNpc,
		deregisterNpc,
	};
});
