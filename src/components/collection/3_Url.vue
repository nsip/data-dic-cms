<template>
    <div class="com">
        <span class="label">Url:</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <div v-if="visEditor">
            <textarea class="content" ref="taURL" v-model="urls" placeholder="collection urls"></textarea>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { jsonCollectionHTML, jsonCollectionTEXT } from "../../share/CollectionType";

export default defineComponent({
    name: "EntryUrl",
    setup() {
        const icon = ref("chevron-down");
        const visEditor = ref(false);
        const urls = ref("");
        const taURL = ref<HTMLTextAreaElement | null>(null); // fetch element
        const onToggleVisible = () => {
            visEditor.value = !visEditor.value;
            icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
        };
        onMounted(async () => {
            await new Promise((f) => setTimeout(f, 500));
            urls.value = jsonCollectionTEXT.Url != null ? jsonCollectionTEXT.Url.join('\n') : "";
        })
        watchEffect(() => {
            jsonCollectionTEXT.SetUrl(urls.value);
            jsonCollectionHTML.SetUrl(urls.value);

            // resize textarea
            if (taURL.value != null) {
                const numberOfLineBreaks = (urls.value.match(/\n/g) || []).length;
                const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
                taURL.value!.style.height = newHeight + "px";
            }
        })

        return {
            urls,
            taURL,
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
