<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <br>
        <span class="hint2">{{ hint }}</span>
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
import { sharedHTML, sharedTEXT, jsonEntity } from './share/share'

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
                    sharedHTML.setSIFXPaths(html)
                    sharedTEXT.setSIFXPaths(text)
                    jsonEntity.SetSIF(html, "", "", "")
                    break
                case 1:
                    sharedHTML.setSIFDefinition(html)
                    sharedTEXT.setSIFDefinition(text)
                    jsonEntity.SetSIF("", html, "", "")
                    break
                case 2:
                    sharedHTML.setSIFCommentary(html)
                    sharedTEXT.setSIFCommentary(text)
                    jsonEntity.SetSIF("", "", html, "")
                    break
                case 3:
                    sharedHTML.setSIFDatestamp(html)
                    sharedTEXT.setSIFDatestamp(text)
                    jsonEntity.SetSIF("", "", "", html)
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
