<template>
    <div class="com">
        <span class="label">{{ label }}</span>        
        <span class="hint1">{{ hint }}</span>
        <button class="hide-editor" @click="onToggleVisible()"> {{ vBtnTxt() }} </button>
        <div :hidden=!visEditor>
            <!-- essential, minimal, full, and ""  -->
            <QuillEditor theme="snow" toolbar="essential" placeholder='list of xpath' @ready="onReady" @textChange="textChange(0)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder='definition' @ready="onReady" @textChange="textChange(1)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder='commentary' @ready="onReady" @textChange="textChange(2)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder='datestamp' @ready="onReady" @textChange="textChange(3)" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { jsonHTML, jsonTEXT } from './share/json'

export default defineComponent({
    name: 'EntrySIF',
    components: {
        QuillEditor
    },
    setup() {

        const label = "SIF:"
        const hint = "list of [xpath(list), definition, commentary, datestamp]"
        let thisQuills: Quill[] = []
        let idxQuill = 0
        let visEditor = ref(false)

        const onReady = (quill: Quill) => {
            thisQuills[idxQuill++] = quill
        }

        const textChange = (idx: number) => {
            const html = thisQuills[idx].root.innerHTML; // get html from quill
            const text = thisQuills[idx].getText(0, 100000)

            switch (idx) {
                case 0:
                    jsonHTML.SetSIF("html", html, "", "", "")
                    jsonTEXT.SetSIF("", text, "", "", "")
                    break
                case 1:
                    jsonHTML.SetSIF("html", "", html, "", "")
                    jsonTEXT.SetSIF("", "", text, "", "")
                    break
                case 2:
                    jsonHTML.SetSIF("html", "", "", html, "")
                    jsonTEXT.SetSIF("", "", "", text, "")
                    break
                case 3:
                    jsonHTML.SetSIF("html", "", "", "", html)
                    jsonTEXT.SetSIF("", "", "", "", text)
                    break
            }
        }

        const onToggleVisible = () => {
            visEditor.value = !visEditor.value
        }

        const vBtnTxt = () => {
            return visEditor.value ? "⤴" : "⤵"
        }

        return {
            label,
            hint,
            visEditor,
            textChange,
            onReady,
            onToggleVisible,
            vBtnTxt
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    text-align: center;
}
</style>
