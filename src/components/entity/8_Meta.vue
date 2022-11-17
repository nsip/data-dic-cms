<template>
    <div class="com">
        <span class="label">Meta Data:</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <span class="hint2">[identifier, type, ExpectedAttributes(list), superclass(list), crossrefEntities(list)]</span>
        <div v-if="visEditor">
            <EditorMeta />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import EditorMeta from "./8_Meta_Editor.vue"

export default defineComponent({
    name: "EntryMeta",
    components: {
        EditorMeta,
    },
    setup() {
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
