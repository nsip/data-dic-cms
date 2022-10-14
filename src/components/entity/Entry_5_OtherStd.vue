<template>
    <div class="com">
        <span class="label">{{ label }}</span>        
        <button class="hide-editor" @click="onToggleVisible()"> {{ vBtnTxt() }} </button>
        <button class="less-editor" @click="onMoreLessClick('-')" :disabled="editorCount == 1">-</button>
        <button class="more-editor" @click="onMoreLessClick('+')" :disabled="jsonEntityTEXT.IsLastOtherStdEmpty()">+</button>
        <span class="hint2">{{ hint }}</span>
        <div :hidden=!visEditor v-for="(n, iGrp) in editorCount" :key="iGrp">
            <hr>&nbsp;# {{ iGrp }}
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
import { jsonEntityHTML, jsonEntityTEXT } from '../share/EntityType'

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

        const textChange = (idxGrp: number, idx: number) => {
            const html = thisQuills[idxGrp * 5 + idx].root.innerHTML; // get html from quill
            const text = thisQuills[idxGrp * 5 + idx].getText(0, 100000) // get text from quill

            //
            switch (idx) {
                case 0:
                    jsonEntityHTML.SetOtherStd("html", idxGrp, html, "", "", "", "")
                    jsonEntityTEXT.SetOtherStd("", idxGrp, text, "", "", "", "")
                    break
                case 1:
                    jsonEntityHTML.SetOtherStd("html", idxGrp, "", html, "", "", "")
                    jsonEntityTEXT.SetOtherStd("", idxGrp, "", text, "", "", "")
                    break
                case 2:
                    jsonEntityHTML.SetOtherStd("html", idxGrp, "", "", html, "", "")
                    jsonEntityTEXT.SetOtherStd("", idxGrp, "", "", text, "", "")
                    break
                case 3:
                    jsonEntityHTML.SetOtherStd("html", idxGrp, "", "", "", html, "")
                    jsonEntityTEXT.SetOtherStd("", idxGrp, "", "", "", text, "")
                    break
                case 4:
                    jsonEntityHTML.SetOtherStd("html", idxGrp, "", "", "", "", html)
                    jsonEntityTEXT.SetOtherStd("", idxGrp, "", "", "", "", text)
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
                    jsonEntityHTML.AddOtherStd()
                    jsonEntityTEXT.AddOtherStd()

                    editorCount.value++
                    break
                case "-":
                    // clear preview
                    idxQuill -= 5

                    // remove last OtherStandard element in json
                    jsonEntityHTML.RmOtherStdLast()
                    jsonEntityTEXT.RmOtherStdLast()

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
            vBtnTxt,
            jsonEntityTEXT,
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
