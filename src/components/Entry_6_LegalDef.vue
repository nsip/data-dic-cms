<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <br>
        <span class="hint2">{{ hint }}</span>
        <button class="hide-editor" @click="onToggleVisible()"> {{ vBtnTxt() }} </button>
        <button class="less-editor" @click="onMoreLessClick('-')" :disabled="editorCount == 1">-</button>
        <button class="more-editor" @click="onMoreLessClick('+')" :disabled="jsonTEXT.IsLastLegalDefEmpty()">+</button>
        <div :hidden=!visEditor v-for="(n, iGrp) in editorCount" :key="iGrp">
            <br>&nbsp;# {{ iGrp }}
            <QuillEditor theme="snow" toolbar="essential" placeholder="legislationName" @ready="onReady" @textChange="textChange(iGrp, 0)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder="citation" @ready="onReady" @textChange="textChange(iGrp, 1)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder="link" @ready="onReady" @textChange="textChange(iGrp, 2)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder="definition" @ready="onReady" @textChange="textChange(iGrp, 3)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder="commentary" @ready="onReady" @textChange="textChange(iGrp, 4)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder="datestamp" @ready="onReady" @textChange="textChange(iGrp, 5)" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import { jsonHTML, jsonTEXT } from './share/Entity'

export default defineComponent({
    name: 'EntryLegalDef',
    components: {
        QuillEditor
    },
    setup() {

        const label = "Legal Definitions:"
        const hint = "list of [legislationName, citation, link, definition, commentary, datestamp]"
        let thisQuills: Quill[] = []
        let idxQuill = 0
        let visEditor = ref(false)
        let editorCount = ref(1)

        const onReady = (quill: Quill) => {
            thisQuills[idxQuill++] = quill
            // console.log('onQuillReady@ ' + timestamp())
        }

        const textChange = (idxGrp: number, idx: number) => {
            const html = thisQuills[idxGrp * 6 + idx].root.innerHTML; // get html from quill
            const text = thisQuills[idxGrp * 6 + idx].getText(0, 100000) // get text from quill

            switch (idx) {
                case 0:
                    jsonHTML.SetLegalDef(idxGrp, html, "", "", "", "", "")
                    jsonTEXT.SetLegalDef(idxGrp, text, "", "", "", "", "")
                    break
                case 1:
                    jsonHTML.SetLegalDef(idxGrp, "", html, "", "", "", "")
                    jsonTEXT.SetLegalDef(idxGrp, "", text, "", "", "", "")
                    break
                case 2:
                    jsonHTML.SetLegalDef(idxGrp, "", "", html, "", "", "")
                    jsonTEXT.SetLegalDef(idxGrp, "", "", text, "", "", "")
                    break
                case 3:
                    jsonHTML.SetLegalDef(idxGrp, "", "", "", html, "", "")
                    jsonTEXT.SetLegalDef(idxGrp, "", "", "", text, "", "")
                    break
                case 4:
                    jsonHTML.SetLegalDef(idxGrp, "", "", "", "", html, "")
                    jsonTEXT.SetLegalDef(idxGrp, "", "", "", "", text, "")
                    break
                case 5:
                    jsonHTML.SetLegalDef(idxGrp, "", "", "", "", "", html)
                    jsonTEXT.SetLegalDef(idxGrp, "", "", "", "", "", text)
                    break
            }
        }

        const onToggleVisible = () => {
            visEditor.value = !visEditor.value
        }

        const vBtnTxt = () => {
            return visEditor.value ? "⤴" : "⤵"
        }

        const onMoreLessClick = (type: string) => {
            switch (type) {
                case "+":
                    // add new LegalDefinition element in json
                    jsonHTML.AddLegalDef()
                    jsonTEXT.AddLegalDef()

                    editorCount.value++
                    break
                case "-":
                    // clear preview
                    idxQuill -= 6

                    // remove last LegalDefinition element in json
                    jsonHTML.RmLegalDefLast()
                    jsonTEXT.RmLegalDefLast()

                    editorCount.value--
                    break
                default:
            }
        }

        return {
            label,
            hint,
            editorCount,
            visEditor,
            textChange,
            onReady,
            onMoreLessClick,
            onToggleVisible,
            vBtnTxt,
            jsonTEXT,
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
