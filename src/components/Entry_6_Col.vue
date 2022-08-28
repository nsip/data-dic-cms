<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <br>
        <span class="hint2">{{ hint }}</span>
        <button class="hide-editor" @click="onToggleVisible()"> {{ vBtnTxt() }} </button>
        <button class="less-editor" @click="onMoreLessClick('-')" :disabled="editorCount == 1">-</button>
        <button class="more-editor" @click="onMoreLessClick('+')">+</button>
        <div :hidden=!visEditor v-for="(n, iGrp) in editorCount" :key="iGrp">
            <QuillEditor theme="snow" toolbar="essential" placeholder="name" @ready="onReady" @textChange="textChange(iGrp, 0)" />
            <QuillEditor theme="snow" toolbar="essential" placeholder="description" @ready="onReady" @textChange="textChange(iGrp, 1)" />
            <QuillEditor theme="snow" toolbar="essential" placeholder="standard" @ready="onReady" @textChange="textChange(iGrp, 2)" />
            <QuillEditor theme="snow" toolbar="essential" placeholder="elements" @ready="onReady" @textChange="textChange(iGrp, 3)" />
            <QuillEditor theme="snow" toolbar="essential" placeholder="definition modification" @ready="onReady" @textChange="textChange(iGrp, 4)" />
            <br>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { sharedHTML, sharedTEXT, timestamp } from './share/share'

export default defineComponent({
    name: 'EntryCol',
    components: {
        QuillEditor
    },
    setup() {

        const label = "Collections:"
        const hint = "list of [name, description, standard, elements(list), definitionModification]"
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
                    sharedHTML.setColName(html, idxGrp)
                    sharedTEXT.setColName(text, idxGrp)
                    break
                case 1:
                    sharedHTML.setColDescription(html, idxGrp)
                    sharedTEXT.setColDescription(text, idxGrp)
                    break
                case 2:
                    sharedHTML.setColStandard(html, idxGrp)
                    sharedTEXT.setColStandard(text, idxGrp)
                    break
                case 3:
                    sharedHTML.setColElements(html, idxGrp)
                    sharedTEXT.setColElements(text, idxGrp)
                    break
                case 4:
                    sharedHTML.setColDefmod(html, idxGrp)
                    sharedTEXT.setColDefmod(text, idxGrp)
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
                    editorCount.value++
                    break
                case "-":
                    // clear preview
                    idxQuill -= 5
                    sharedHTML.rmColLast()
                    sharedTEXT.rmColLast()

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
