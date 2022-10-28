<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <span class="hint1">{{ hint }}</span>
        <div :hidden="!visEditor">
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
    name: "EntryOtherNames",
    components: {
        QuillEditor,
    },
    setup() {
        const label = "Other Name:";
        const hint = "entity other names";
        const holder = "entity other names";
        let icon = ref("chevron-down");
        let thisQuill: Quill;
        let visEditor = ref(false);
        let flagSet: boolean = true

        const onReady = (quill: Quill) => {
            thisQuill = quill;
        };

        const textChange = () => {
            if (flagSet) {
                jsonEntityHTML.SetOtherName("html", thisQuill.root.innerHTML);
                jsonEntityTEXT.SetOtherName("", thisQuill.getText(0, 100000));
            }
        };

        const onToggleVisible = () => {
            visEditor.value = !visEditor.value;
            icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
        };

        onMounted(async () => {
            await new Promise((f) => setTimeout(f, 500));
            flagSet = false

            thisQuill.root.innerHTML = jsonEntityHTML.OtherNames != null ? jsonEntityHTML.OtherNames.join('\n') : "";

            await new Promise((f) => setTimeout(f, 500));
            flagSet = true
        })

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
h4 {
    margin-left: 5px;
}
</style>
