<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <span class="hint1">{{ hint }}</span>
        <div v-if="visEditor">
            <!-- essential, minimal, full, and ""  -->
            <QuillEditor theme="snow" toolbar="essential" :placeholder="holder" @ready="onReady" @textChange="textChange" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEntityHTML, jsonEntityTEXT } from "../../share/EntityType";

export default defineComponent({
    name: "EntryDef",
    components: {
        QuillEditor,
    },
    setup() {
        const label = "Definition:";
        const hint = "";
        const holder = "entity definition";
        let icon = ref("chevron-down");
        let quillDef: Quill;
        let visEditor = ref(false);

        const onReady = (quill: Quill) => {

            quillDef = quill;

            // fill existing html text into quill, format could change by quill
            quillDef.root.innerHTML = jsonEntityHTML.Definition;
        };

        const textChange = () => {
            jsonEntityHTML.SetDefinition(quillDef.root.innerHTML);
            jsonEntityTEXT.SetDefinition(quillDef.getText(0, 100000));
        };

        const onToggleVisible = () => {
            visEditor.value = !visEditor.value;
            icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
        };

        return {
            label,
            hint,
            holder,
            icon,
            visEditor,
            textChange,
            onReady,
            onToggleVisible,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
