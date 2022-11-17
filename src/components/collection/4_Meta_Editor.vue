<template>

    <TextLine text="identifier:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taID" v-model="identifier" placeholder="identifier"></textarea>

    <TextLine text="type:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taTP" v-model="type" placeholder="type"></textarea>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { jsonCollectionHTML, jsonCollectionTEXT } from "@/share/CollectionType";
import TextLine from "../shared/TextLine.vue"

export default defineComponent({
    name: "EditorMeta",
    components: {
        TextLine,
    },
    setup() {

        const identifier = ref("")
        const type = ref("")

        const taID = ref<HTMLTextAreaElement | null>(null); 
        const taTP = ref<HTMLTextAreaElement | null>(null); 
        
        onMounted(async () => {

            const meta = jsonCollectionHTML.Metadata

            // textarea
            identifier.value = meta.Identifier
            type.value = meta.Type
        })

        watchEffect(() => {

            jsonCollectionHTML.SetMeta(identifier.value, type.value);
            jsonCollectionTEXT.SetMeta(identifier.value, type.value);

        })

        return {

            // bind variable
            identifier,
            type,

            // textarea ref
            taID,
            taTP,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
    padding-left: 1%;
    resize: vertical;
    display: block;
    overflow: hidden;
    width: 98%;
    min-height: 15px;
    line-height: 20px;
}
</style>
