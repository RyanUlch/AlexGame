import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export type FilterName = 'night' | 'morning' | 'evening' | '';
export const useFilterStore = defineStore('filters', () => {
	const enabledFilter = ref<FilterName>('');
	const background = computed((): string => {
		switch (enabledFilter.value) {
			case 'morning':
				return 'radial-gradient(#00000020, #00000040 20%, #dc657160 95%)';
			case 'night':
				return 'radial-gradient(#09094460, #09094480 20%, #090944ff 95%)';
			case 'evening':
				return 'radial-gradient(#00000020, #00000020 20%, #da542f60 95%)';
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
