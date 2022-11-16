<template>
    <div class="com">
        <span class="label">Entities:</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <div v-if="visEditor">
            <textarea class="content" ref="taE" v-model="entities" placeholder="collection entities"></textarea>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { jsonCollectionHTML, jsonCollectionTEXT } from "../../share/CollectionType";

export default defineComponent({
    name: "EntryEntities",
    setup() {
        const icon = ref("chevron-down");
        const visEditor = ref(false);
        const entities = ref("");
        const taE = ref<HTMLTextAreaElement | null>(null); // fetch element
        const onToggleVisible = () => {
            visEditor.value = !visEditor.value;
            icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
        };
        onMounted(async () => {
            await new Promise((f) => setTimeout(f, 500));
            entities.value = jsonCollectionTEXT.Entities != null ? jsonCollectionTEXT.Entities.join('\n') : "";
        })
        watchEffect(() => {
            jsonCollectionTEXT.SetEntities(entities.value);
            jsonCollectionHTML.SetEntities(entities.value);

            // resize textarea
            if (taE.value != null) {
                const numberOfLineBreaks = (entities.value.match(/\n/g) || []).length;
                const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
                taE.value!.style.height = newHeight + "px";
            }
        })

        return {
            entities,
            taE,
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
