<template>
    <div class="lbl_type">
        <label>Preview:</label>
        <input class="selection" type="radio" name="type" value="text" checked @click="select('text')" />
        <label>plain text json</label>
        <input class="selection" type="radio" name="type" value="html" @click="select('html')" />
        <label>html value json</label>
        <input class="selection" type="radio" name="type" value="preview" @click="select('preview')" />
        <label>effect</label>
    </div>
    <hr />
    <pre>{{ genJSON(selTYPE) }}</pre>
    <EntVisualContent v-if="selTYPE == 'preview' && Kind == 'entity'" />
    <ColVisualContent v-if="selTYPE == 'preview' && Kind == 'collection'" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { jsonEntityHTML, jsonEntityTEXT } from "@/share/EntityType";
import { jsonCollectionHTML, jsonCollectionTEXT } from "@/share/CollectionType";
import EntVisualContent from "@/components/entity/VisualContent.vue";
import ColVisualContent from "@/components/collection/VisualContent.vue";

export default defineComponent({
    name: "EntryPreview",
    props: {
        Kind: String,
    },
    components: {
        EntVisualContent,
        ColVisualContent,
    },
    setup(props) {

        let selTYPE = ref("text"); // default (checked) json type
        
        const jsonTEXT = props.Kind == 'entity' ? jsonEntityTEXT : jsonCollectionTEXT;
        const jsonHTML = props.Kind == 'entity' ? jsonEntityHTML : jsonCollectionHTML;

        const genJSON = (TYPE: string) => {
            switch (TYPE) {
                case "text":
                    return jsonTEXT.GenJSON(false);
                case "html":
                    return jsonHTML.GenJSON(true);
                default:
                    return "";
            }
        };
        const select = (TYPE: string) => {
            selTYPE.value = TYPE;
        };
        return {
            selTYPE,
            genJSON,
            select,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lbl_type {
    margin-top: 10px;
    margin-left: 10px;
    font-weight: bold;
}

.selection {
    margin-left: 15px;
}
</style>
