<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <div v-if="visEditor">
            <textarea class="content" ref="taON" v-model="othernames" placeholder="entity's other names"></textarea>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { jsonEntityHTML, jsonEntityTEXT } from "../../share/EntityType";

export default defineComponent({
    name: "EntryOtherNames",
    setup() {
        const label = "Other Name:";
        const icon = ref("chevron-down");
        const visEditor = ref(false);
        const othernames = ref("");
        const taON = ref<HTMLTextAreaElement | null>(null); // fetch element
        const onToggleVisible = () => {
            visEditor.value = !visEditor.value;
            icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
        };
        onMounted(async () => {
            await new Promise((f) => setTimeout(f, 500));
            othernames.value = jsonEntityTEXT.OtherNames != null ? jsonEntityTEXT.OtherNames.join('\n') : "";
        })
        watchEffect(() => {
            jsonEntityTEXT.SetOtherName(othernames.value);
            jsonEntityHTML.SetOtherName(othernames.value);

            // resize textarea
            if (taON.value != null) {
                const numberOfLineBreaks = (othernames.value.match(/\n/g) || []).length;
                const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
                taON.value!.style.height = newHeight + "px";
            }
        })

        return {
            label,
            othernames,
            taON,
            icon,
            visEditor,
            onToggleVisible,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
    margin-left: 5px;
}

.content {
    margin-left: 0px;
    padding-left: 1%;
    resize: vertical;
    display: block;
    overflow: hidden;
    width: 98%;
    min-height: 15px;
    line-height: 20px;
}
</style>
