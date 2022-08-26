<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <br>
        <span class="hint2">{{ hint }}</span>
        <button class="hide-editor" @click="onToggleVisible()"> {{ vBtnTxt() }} </button>
        <button class="less-editor" @click="onMoreLessClick('-')" :disabled="editorCount == 1">-</button>
        <button class="more-editor" @click="onMoreLessClick('+')">+</button>
        <div :hidden=!visEditor v-for="(n, i) in editorCount" :key="i">
            <QuillEditor theme="snow" toolbar="essential" :placeholder=holder @ready="onReady" @textChange="textChange(i)" />
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
    name: 'EntryOtherStd',
    components: {
        QuillEditor
    },
    setup() {

        const label = "Other Standards:"
        const hint = "list of [Standard, Link(list), Path(list), Definition, Commentary]"
        const holder = "[Standard, Link(list), Path(list), Definition, Commentary] are accepted"
        let thisQuills: Quill[] = []
        let idxQuill = 0
        let visEditor = ref(false)
        let editorCount = ref(1)

        const onReady = (quill: Quill) => {
            thisQuills[idxQuill] = quill
            // console.log('onQuillReady@ ' + timestamp())
        }

        const textChange = (idx: number) => {
            const html = thisQuills[idx].root.innerHTML; // get html from quill
            sharedHTML.setOtherStd(html, idx)

            const text = thisQuills[idx].getText(0, 100000)
            sharedTEXT.setOtherStd(text, idx)
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
                    idxQuill++
                    editorCount.value++
                    break
                case "-":
                    sharedHTML.setOtherStd("", idxQuill) // clear preview
                    idxQuill--
                    editorCount.value--
                    break
                default:
            }
        }

        return {
            label,
            hint,
            holder,
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
