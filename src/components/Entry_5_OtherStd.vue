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
            <QuillEditor theme="snow" toolbar="essential" placeholder='standard' @ready="onReady" @textChange="textChange(iGrp, 0)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder='link list' @ready="onReady" @textChange="textChange(iGrp, 1)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder='path list' @ready="onReady" @textChange="textChange(iGrp, 2)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder='definition' @ready="onReady" @textChange="textChange(iGrp, 3)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder='commentary' @ready="onReady" @textChange="textChange(iGrp, 4)" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { sharedHTML, sharedTEXT } from './share/share'
import { jsonHTML, jsonTEXT } from './share/json'

export default defineComponent({
    name: 'EntryOtherStd',
    components: {
        QuillEditor
    },
    setup() {

        const label = "Other Standards:"
        const hint = "list of [standard, link(list), path(list), definition, commentary]"
        let thisQuills: Quill[] = []
        let idxQuill = 0
        let visEditor = ref(false)
        let editorCount = ref(1)

        const onReady = (quill: Quill) => {
            thisQuills[idxQuill++] = quill
            // console.log('onQuillReady@ ' + timestamp())
            // console.log('idxQuill:', idxQuill)
        }

        // *** doesn't work as expected using map ***

        // const mIdxFnHTML = new Map<number, (val: string, idx: number) => void>()
        // mIdxFnHTML.set(0, sharedHTML.setOtherStd)
        // mIdxFnHTML.set(1, sharedHTML.setOtherStdLink)
        // mIdxFnHTML.set(2, sharedHTML.setOtherStdPath)
        // mIdxFnHTML.set(3, sharedHTML.setOtherStdDefinition)
        // mIdxFnHTML.set(4, sharedHTML.setOtherStdCommentary)

        // const mIdxFnTEXT = new Map<number, (val: string, idx: number) => void>()
        // mIdxFnTEXT.set(0, sharedTEXT.setOtherStd)
        // mIdxFnTEXT.set(1, sharedTEXT.setOtherStdLink)
        // mIdxFnTEXT.set(2, sharedTEXT.setOtherStdPath)
        // mIdxFnTEXT.set(3, sharedTEXT.setOtherStdDefinition)
        // mIdxFnTEXT.set(4, sharedTEXT.setOtherStdCommentary)

        // 

        const textChange = (idxGrp: number, idx: number) => {
            const html = thisQuills[idxGrp * 5 + idx].root.innerHTML; // get html from quill
            const text = thisQuills[idxGrp * 5 + idx].getText(0, 100000) // get text from quill

            // *** doesn't work as expected using map ***

            // mIdxFnHTML.get(idx)?.(html, idxGrp)
            // mIdxFnTEXT.get(idx)?.(text, idxGrp)

            //
            switch (idx) {
                case 0:
                    sharedHTML.setOtherStd(html, idxGrp)
                    sharedTEXT.setOtherStd(text, idxGrp)                    
                    jsonHTML.SetOtherStd("html", idxGrp, html, "", "", "", "")
                    jsonTEXT.SetOtherStd("", idxGrp, text, "", "", "", "")
                    break
                case 1:
                    sharedHTML.setOtherStdLink(html, idxGrp)
                    sharedTEXT.setOtherStdLink(text, idxGrp)
                    jsonHTML.SetOtherStd("html", idxGrp, "", html, "", "", "")
                    jsonTEXT.SetOtherStd("", idxGrp, "", text, "", "", "")
                    break
                case 2:
                    sharedHTML.setOtherStdPath(html, idxGrp)
                    sharedTEXT.setOtherStdPath(text, idxGrp)
                    jsonHTML.SetOtherStd("html", idxGrp, "", "", html, "", "")
                    jsonTEXT.SetOtherStd("", idxGrp, "", "", text, "", "")
                    break
                case 3:
                    sharedHTML.setOtherStdDefinition(html, idxGrp)
                    sharedTEXT.setOtherStdDefinition(text, idxGrp)
                    jsonHTML.SetOtherStd("html", idxGrp, "", "", "", html, "")
                    jsonTEXT.SetOtherStd("", idxGrp, "", "", "", text, "")
                    break
                case 4:
                    sharedHTML.setOtherStdCommentary(html, idxGrp)
                    sharedTEXT.setOtherStdCommentary(text, idxGrp)
                    jsonHTML.SetOtherStd("html", idxGrp, "", "", "", "", html)
                    jsonTEXT.SetOtherStd("", idxGrp, "", "", "", "", text)
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
                    // add new OtherStandard element in json
                    jsonHTML.AddOtherStd()
                    jsonTEXT.AddOtherStd()

                    editorCount.value++
                    break
                case "-":
                    // clear preview
                    idxQuill -= 5
                    sharedHTML.rmOtherStdLast()
                    sharedTEXT.rmOtherStdLast()

                    // remove last OtherStandard element in json
                    jsonHTML.RmOtherStdLast()
                    jsonTEXT.RmOtherStdLast()

                    editorCount.value--
                    break
                default:
            }
            // console.log('editor count:', editorCount.value)
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
