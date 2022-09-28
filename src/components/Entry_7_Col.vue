<template>
    <div class="com">
        <span class="label">{{ label }}</span>        
        <button class="hide-editor" @click="onToggleVisible()"> {{ vBtnTxt() }} </button>
        <button class="less-editor" @click="onMoreLessClick('-')" :disabled="editorCount == 1">-</button>
        <button class="more-editor" @click="onMoreLessClick('+')" :disabled="jsonTEXT.IsLastColEmpty()">+</button>
        <span class="hint2">{{ hint }}</span>
        <div :hidden=!visEditor v-for="(n, iGrp) in editorCount" :key="iGrp">
            <hr>&nbsp;# {{ iGrp }}
            <QuillEditor theme="snow" toolbar="essential" placeholder="name" @ready="onReady" @textChange="textChange(iGrp, 0)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder="description" @ready="onReady" @textChange="textChange(iGrp, 1)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder="standard" @ready="onReady" @textChange="textChange(iGrp, 2)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder="elements" @ready="onReady" @textChange="textChange(iGrp, 3)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder="business rules" @ready="onReady" @textChange="textChange(iGrp, 4)" />
            <hr class="subline">
            <QuillEditor theme="snow" toolbar="essential" placeholder="definition modification" @ready="onReady" @textChange="textChange(iGrp, 5)" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { jsonHTML, jsonTEXT } from './share/Entity'

export default defineComponent({
    name: 'EntryCol',
    components: {
        QuillEditor
    },
    setup() {

        const label = "Collections:"
        const hint = "list of [name, description, standard, elements(list), businessRules(list), definitionModification]"
        let thisQuills: Quill[] = []
        let idxQuill = 0
        let visEditor = ref(false)
        let editorCount = ref(1)

        const onReady = (quill: Quill) => {
            thisQuills[idxQuill++] = quill
            // console.log('onQuillReady@ ' + timestamp())
        }

        const textChange = (idxGrp: number, idx: number) => {
            const html = thisQuills[idxGrp * 5 + idx].root.innerHTML; // get html from quill
            const text = thisQuills[idxGrp * 5 + idx].getText(0, 100000) // get text from quill

            switch (idx) {
                case 0:
                    jsonHTML.SetCol("html", idxGrp, html, "", "", "", "", "")
                    jsonTEXT.SetCol("", idxGrp, text, "", "", "", "", "")
                    break
                case 1:
                    jsonHTML.SetCol("html", idxGrp, "", html, "", "", "", "")
                    jsonTEXT.SetCol("", idxGrp, "", text, "", "", "", "")
                    break
                case 2:
                    jsonHTML.SetCol("html", idxGrp, "", "", html, "", "", "")
                    jsonTEXT.SetCol("", idxGrp, "", "", text, "", "", "")
                    break
                case 3:
                    jsonHTML.SetCol("html", idxGrp, "", "", "", html, "", "")
                    jsonTEXT.SetCol("", idxGrp, "", "", "", text, "", "")
                    break
                case 4:
                    jsonHTML.SetCol("html", idxGrp, "", "", "", "", html, "")
                    jsonTEXT.SetCol("", idxGrp, "", "", "", "", text, "")
                    break
                case 5:
                    jsonHTML.SetCol("html", idxGrp, "", "", "", "", "", html)
                    jsonTEXT.SetCol("", idxGrp, "", "", "", "", "", text)
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
                    // add new Collection element in json
                    jsonHTML.AddCol()
                    jsonTEXT.AddCol()

                    editorCount.value++
                    break

                case "-":
                    // clear preview
                    idxQuill -= 6

                    // remove last Collection element in json
                    jsonHTML.RmColLast()
                    jsonTEXT.RmColLast()

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
            jsonTEXT
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
