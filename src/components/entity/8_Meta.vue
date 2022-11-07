<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <span class="hint2">{{ hint }}</span>
        <div v-if="visEditor">
            <EditorMeta />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { jsonEntityHTML, jsonEntityTEXT } from "../../share/EntityType";
import EditorMeta from "./8_Meta Editor.vue"

export default defineComponent({
    name: "EntryMeta",
    components: {
        EditorMeta,
    },
    setup() {
        const label = "Meta Data:";
        const hint = "[identifier, type, ExpectedAttributes(list), superclass(list), crossrefEntities(list)]";
        let icon = ref("chevron-down");

        let visEditor = ref(false);

        onMounted(async () => {
            await new Promise((f) => setTimeout(f, 500)); // textarea needs to wait, quill in 'onReady'
        })

        const onToggleVisible = () => {
            visEditor.value = !visEditor.value;
            icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
        };

        return {
            label,
            hint,
            icon,
            visEditor,
            onToggleVisible,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
