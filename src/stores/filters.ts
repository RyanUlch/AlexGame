import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export type FilterName = 'night' | '';
export const useFilterStore = defineStore('filters', () => {
	const enabledFilter = ref<FilterName>('');
	const background = computed((): string => {
		switch (enabledFilter.value) {
			case 'night':
				return 'radial-gradient(#00000063, #00000063 20%, #212143 95%)';
			default:
				return '';
		}
	});
	const enableFilter = (filterName: FilterName) => {
		enabledFilter.value = filterName;
	};
	const disableFilter = () => {
		enabledFilter.value = '';
	};
	return { enabledFilter, background, enableFilter, disableFilter };
});
