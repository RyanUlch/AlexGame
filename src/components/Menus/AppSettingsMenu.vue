<script setup lang="ts">
import { useMenuStore } from '@/stores/menus';
import { storeToRefs } from 'pinia';
import AppModal from './AppModal.vue';
const { settingsMenuIsOpen, someGameSetting } = storeToRefs(useMenuStore());
const { closeSettingsMenu } = useMenuStore();
</script>

<template>
	<AppModal v-if="settingsMenuIsOpen" title="Settings" @close="closeSettingsMenu">
		<template v-slot="modal">
			<table>
				<tr>
					<td>Some Game Setting:</td>
					<td><input type="number" v-model.number="someGameSetting"></td>
				</tr>
			</table>
			<button @click="modal.close">Close</button>
		</template>
	</AppModal>
</template>