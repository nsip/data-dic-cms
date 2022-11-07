<template>

    <TextLine text="standard:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <textarea class="content" ref="taS" v-model="std" placeholder="standard"></textarea>

    <TextLine text="link list:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <textarea class="content" ref="taL" v-model="links" placeholder="link list"></textarea>

    <TextLine text="path list:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <textarea class="content" ref="taP" v-model="paths" placeholder="path list"></textarea>

    <TextLine text="definition:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="definition" @ready="onReadyDef" @textChange="textChangeDef(idx || 0)" />
    
    <TextLine text="commentary:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="1px" />
    <QuillEditor theme="snow" toolbar="essential" placeholder="commentary" @ready="onReadyCmt" @textChange="textChangeCmt(idx || 0)" />

</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEntityHTML, jsonEntityTEXT } from "../../share/EntityType";
import TextLine from "../shared/TextLine.vue"

export default defineComponent({
    name: "EditorOtherStd",
    components: {
        QuillEditor,
        TextLine,
    },
    props: {
        idx: Number
    },
    setup(props) {

        const std = ref("")
        const links = ref("")
        const paths = ref("")

        const taS = ref<HTMLTextAreaElement | null>(null); // fetch element
        const taL = ref<HTMLTextAreaElement | null>(null); // fetch element
        const taP = ref<HTMLTextAreaElement | null>(null); // fetch element

        let quillDef: Quill
        let quillCmt: Quill

        onMounted(async () => {

            const os = jsonEntityHTML.OtherStandards[props.idx || 0]

            // textarea
            std.value = os.Standard
            links.value = os.Link != null ? os.Link.join('\n') : ""
            paths.value = os.Path != null ? os.Path.join('\n') : ""

            // quill
            quillDef.root.innerHTML = os.Definition
            quillCmt.root.innerHTML = os.Commentary
        })

        const onReadyDef = (quill: Quill) => {
            quillDef = quill
        };

        const textChangeDef = (idx: number) => {
            const html = quillDef.root.innerHTML;
            const text = quillDef.getText(0, 100000);
            jsonEntityHTML.SetOtherStd("html", idx, "", "", "", html, "");
            jsonEntityTEXT.SetOtherStd("", idx, "", "", "", text, "");
        };

        const onReadyCmt = (quill: Quill) => {
            quillCmt = quill
        };

        const textChangeCmt = (idx: number) => {
            const html = quillCmt.root.innerHTML;
            const text = quillCmt.getText(0, 100000);
            jsonEntityHTML.SetOtherStd("html", idx, "", "", "", "", html);
            jsonEntityTEXT.SetOtherStd("", idx, "", "", "", "", text);
        };

        watchEffect(() => {

            jsonEntityHTML.SetOtherStd("html", props.idx || 0, std.value, links.value, paths.value, "", "");
            jsonEntityTEXT.SetOtherStd("", props.idx || 0, std.value, links.value, paths.value, "", "");

            if (taS.value != null) {
                const numberOfLineBreaks = (std.value.match(/\n/g) || []).length;
                const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
                taS.value!.style.height = newHeight + "px";
            }
            if (taL.value != null) {
                const numberOfLineBreaks = (links.value.match(/\n/g) || []).length;
                const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
                taL.value!.style.height = newHeight + "px";
            }
            if (taP.value != null) {
                const numberOfLineBreaks = (paths.value.match(/\n/g) || []).length;
                const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
                taP.value!.style.height = newHeight + "px";
            }
        })

        return {
            std,
            links,
            paths,
            taS,
            taL,
            taP,
            onReadyDef,
            textChangeDef,
            onReadyCmt,
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
    min-height: 20px;
    line-height: 25px;
}
</style>
