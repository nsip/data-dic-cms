<template>

    <TextLine text="legislationName:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <textarea class="content" ref="taLN" v-model="legname" placeholder="standard"></textarea>

    <TextLine text="citation:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="citation" @ready="onReadyCit" @textChange="textChangeCit(idx || 0)" />

    <TextLine text="link:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <textarea class="content" ref="taLK" v-model="link" placeholder="standard"></textarea>

    <TextLine text="definition:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="definition" @ready="onReadyDef" @textChange="textChangeDef(idx || 0)" />

    <TextLine text="commentary:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="commentary" @ready="onReadyCmt" @textChange="textChangeCmt(idx || 0)" />

    <TextLine text="datestamp:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <textarea class="content" ref="taDS" v-model="datestamp" placeholder="standard"></textarea>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEntityHTML, jsonEntityTEXT } from "../../share/EntityType";
import TextLine from "../shared/TextLine.vue"

export default defineComponent({
    name: "EditorLegalDef",
    components: {
        QuillEditor,
        TextLine,
    },
    props: {
        idx: Number
    },
    setup(props) {

        const legname = ref("")
        const link = ref("")
        const datestamp = ref("")

        const taLN = ref<HTMLTextAreaElement | null>(null); // fetch element
        const taLK = ref<HTMLTextAreaElement | null>(null); // fetch element
        const taDS = ref<HTMLTextAreaElement | null>(null); // fetch element

        let quillCit: Quill
        let quillDef: Quill
        let quillCmt: Quill

        onMounted(async () => {

            const ld = jsonEntityHTML.LegalDefinitions[props.idx || 0]

            // textarea
            legname.value = ld.LegislationName
            link.value = ld.Link
            datestamp.value = ld.Datestamp

            // quill
            quillCit.root.innerHTML = ld.Citation
            quillDef.root.innerHTML = ld.Definition
            quillCmt.root.innerHTML = ld.Commentary
        })

        const onReadyCit = (quill: Quill) => {
            quillCit = quill
        };
        const onReadyDef = (quill: Quill) => {
            quillDef = quill
        };
        const onReadyCmt = (quill: Quill) => {
            quillCmt = quill
        };

        const textChangeCit = (idx: number) => {
            const html = quillCit.root.innerHTML;
            const text = quillCit.getText(0, 100000);
            jsonEntityHTML.SetLegalDef(idx, "", html, "", "", "", "");
            jsonEntityTEXT.SetLegalDef(idx, "", text, "", "", "", "");
        };
        const textChangeDef = (idx: number) => {
            const html = quillDef.root.innerHTML;
            const text = quillDef.getText(0, 100000);
            jsonEntityHTML.SetLegalDef(idx, "", "", "", html, "", "");
            jsonEntityTEXT.SetLegalDef(idx, "", "", "", text, "", "");
        };
        const textChangeCmt = (idx: number) => {
            const html = quillCmt.root.innerHTML;
            const text = quillCmt.getText(0, 100000);
            jsonEntityHTML.SetLegalDef(idx, "", "", "", "", html, "");
            jsonEntityTEXT.SetLegalDef(idx, "", "", "", "", text, "");
        };

        watchEffect(() => {

            jsonEntityHTML.SetLegalDef(props.idx || 0, legname.value, "", link.value, "", "", datestamp.value);
            jsonEntityTEXT.SetLegalDef(props.idx || 0, legname.value, "", link.value, "", "", datestamp.value);

            if (taLN.value != null) {
                const numberOfLineBreaks = (legname.value.match(/\n/g) || []).length;
                const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
                taLN.value!.style.height = newHeight + "px";
            }
            if (taLK.value != null) {
                const numberOfLineBreaks = (link.value.match(/\n/g) || []).length;
                const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
                taLK.value!.style.height = newHeight + "px";
            }
            if (taDS.value != null) {
                const numberOfLineBreaks = (datestamp.value.match(/\n/g) || []).length;
                const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
                taDS.value!.style.height = newHeight + "px";
            }
        })

        return {
            legname,
            link,
            datestamp,
            taLN,
            taLK,
            taDS,
            onReadyCit,
            onReadyDef,
            onReadyCmt,
            textChangeCit,
            textChangeDef,
            textChangeCmt,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    text-align: center;
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
