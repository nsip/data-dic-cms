<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <br>
        <span class="hint2">{{ hint }}</span>
        <button class="hide-editor" @click="onToggleVisible()"> {{ vBtnTxt() }} </button>
        <button class="less-editor" @click="onMoreLessClick('-')" :disabled="editorCount == 1">-</button>
        <button class="more-editor" @click="onMoreLessClick('+')">+</button>
        <div :hidden=!visEditor v-for="(n, iGrp) in editorCount" :key="iGrp">
            <br>&nbsp;# {{ iGrp }}
            <QuillEditor theme="snow" toolbar="essential" placeholder="legislationName" @ready="onReady" @textChange="textChange(iGrp, 0)" />
            <QuillEditor theme="snow" toolbar="essential" placeholder="citation" @ready="onReady" @textChange="textChange(iGrp, 1)" />
            <QuillEditor theme="snow" toolbar="essential" placeholder="link" @ready="onReady" @textChange="textChange(iGrp, 2)" />
            <QuillEditor theme="snow" toolbar="essential" placeholder="definition" @ready="onReady" @textChange="textChange(iGrp, 3)" />
            <QuillEditor theme="snow" toolbar="essential" placeholder="commentary" @ready="onReady" @textChange="textChange(iGrp, 4)" />
            <QuillEditor theme="snow" toolbar="essential" placeholder="datestamp" @ready="onReady" @textChange="textChange(iGrp, 5)" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import { sharedHTML, sharedTEXT, jsonEntity, timestamp } from './share/share'

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
                    sharedHTML.setLegalDefName(html, idxGrp)
                    sharedTEXT.setLegalDefName(text, idxGrp)
                    jsonEntity.SetLegalDef(idxGrp, html, "", "", "", "", "")
                    break
                case 1:
                    sharedHTML.setLegalDefCitation(html, idxGrp)
                    sharedTEXT.setLegalDefCitation(text, idxGrp)
                    jsonEntity.SetLegalDef(idxGrp, "", html, "", "", "", "")
                    break
                case 2:
                    sharedHTML.setLegalDefLink(html, idxGrp)
                    sharedTEXT.setLegalDefLink(text, idxGrp)
                    jsonEntity.SetLegalDef(idxGrp, "", "", html, "", "", "")
                    break
                case 3:
                    sharedHTML.setLegalDefinition(html, idxGrp)
                    sharedTEXT.setLegalDefinition(text, idxGrp)
                    jsonEntity.SetLegalDef(idxGrp, "", "", "", html, "", "")
                    break
                case 4:
                    sharedHTML.setLegalDefCommentary(html, idxGrp)
                    sharedTEXT.setLegalDefCommentary(text, idxGrp)
                    jsonEntity.SetLegalDef(idxGrp, "", "", "", "", html, "")
                    break
                case 5:
                    sharedHTML.setLegalDefDateStamp(html, idxGrp)
                    sharedTEXT.setLegalDefDateStamp(text, idxGrp)
                    jsonEntity.SetLegalDef(idxGrp, "", "", "", "", "", html)
                    break
            }
        }

        const onToggleVisible = () => {
            visEditor.value = !visEditor.value
        }

        const vBtnTxt = () => {
            return visEditor.value ? "⏫" : "⏬"
        }

        const onMoreLessClick = (type: string) => {
            switch (type) {
                case "+":
                    // add new LegalDefinition element in json
                    jsonEntity.AddLegalDef()

                    editorCount.value++
                    break
                case "-":
                    // clear preview
                    idxQuill -= 6
                    sharedHTML.rmLegalDefLast()
                    sharedTEXT.rmLegalDefLast()

                    // remove last LegalDefinition element in json
                    jsonEntity.RmLegalDefLast()

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
            vBtnTxt
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
