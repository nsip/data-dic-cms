<template>
    <TextLine text="list of xpath:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taXP" v-model="xpath" placeholder="list of xpath"></textarea>

    <TextLine text="definition:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="definition" @ready="onReadyDef" @textChange="textChangeDef(idx || 0)" />

    <TextLine text="commentary:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="commentary" @ready="onReadyCmt" @textChange="textChangeCmt(idx || 0)" />

    <TextLine text="datestamp:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
    <textarea class="content" ref="taDS" v-model="datestamp" placeholder="datestamp"></textarea>
</template>

<script setup lang="ts">

import { ref, onMounted, watchEffect } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEntHTML as jsonHTML, jsonEntTEXT as jsonTEXT } from "@/share/EntType";
import TextLine from "../shared/TextLine.vue";

const xpath = ref("");
const datestamp = ref("");

const taXP = ref<HTMLTextAreaElement | null>(null); // fetch element
const taDS = ref<HTMLTextAreaElement | null>(null); // fetch element

let quillDef: Quill;
let quillCmt: Quill;

const props = defineProps({
    idx: Number,
})

onMounted(async () => {
    const sif = jsonHTML.SIF[props.idx || 0];

    // textarea
    xpath.value = sif.XPath != null ? sif.XPath.join("\n") : "";
    datestamp.value = sif.Datestamp;

    // quill
    quillDef.root.innerHTML = sif.Definition;
    quillCmt.root.innerHTML = sif.Commentary;
});

const onReadyDef = (quill: Quill) => {
    quillDef = quill;
};

const onReadyCmt = (quill: Quill) => {
    quillCmt = quill;
};

const textChangeDef = (idx: number) => {
    const html = quillDef.root.innerHTML;
    const text = quillDef.getText(0, 100000);
    jsonHTML.SetSIF("html", idx, "", html, "", "");
    jsonTEXT.SetSIF("", idx, "", text, "", "");
};

const textChangeCmt = (idx: number) => {
    const html = quillCmt.root.innerHTML;
    const text = quillCmt.getText(0, 100000);
    jsonHTML.SetSIF("html", idx, "", "", html, "");
    jsonTEXT.SetSIF("", idx, "", "", text, "");
};

watchEffect(() => {
    jsonTEXT.SetSIF("", props.idx || 0, xpath.value, "", "", datestamp.value);
    jsonHTML.SetSIF("html", props.idx || 0, xpath.value, "", "", datestamp.value);

    // resize textarea
    if (taXP.value != null) {
        const numberOfLineBreaks = (xpath.value.match(/\n/g) || []).length;
        const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
        taXP.value!.style.height = newHeight + "px";
    }
    if (taDS.value != null) {
        const numberOfLineBreaks = (datestamp.value.match(/\n/g) || []).length;
        const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
        taDS.value!.style.height = newHeight + "px";
    }
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
