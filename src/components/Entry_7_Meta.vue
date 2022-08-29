<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <br>
        <span class="hint2">{{ hint }}</span>
        <button class="hide-editor" @click="onToggleVisible()"> {{ vBtnTxt() }} </button>
        <div :hidden=!visEditor>
            <!-- essential, minimal, full, and ""  -->
            <QuillEditor theme="snow" toolbar="essential" placeholder='identifier' @ready="onReady" @textChange="textChange(0)" />
            <QuillEditor theme="snow" toolbar="essential" placeholder='type' @ready="onReady" @textChange="textChange(1)" />
            <QuillEditor theme="snow" toolbar="essential" placeholder='expected attributes' @ready="onReady" @textChange="textChange(2)" />
            <QuillEditor theme="snow" toolbar="essential" placeholder='superclasses' @ready="onReady" @textChange="textChange(3)" />
            <QuillEditor theme="snow" toolbar="essential" placeholder='cross ref entities' @ready="onReady" @textChange="textChange(4)" />
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
    name: 'EntryMeta',
    components: {
        QuillEditor
    },
    setup() {

        const label = "Meta:"
        const hint = "list of [identifier, type, ExpectedAttributes(list), superclass(list), crossrefEntities(list)]"
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
                    sharedHTML.setMetaId(html)
                    sharedTEXT.setMetaId(text)
                    jsonEntity.SetMeta(html, "", "", "", "")
                    break
                case 1:
                    sharedHTML.setMetaType(html)
                    sharedTEXT.setMetaType(text)
                    jsonEntity.SetMeta("", html, "", "", "")
                    break
                case 2:
                    sharedHTML.setMetaAttr(html)
                    sharedTEXT.setMetaAttr(text)
                    jsonEntity.SetMeta("", "", html, "", "")
                    break
                case 3:
                    sharedHTML.setMetaSuperclass(html)
                    sharedTEXT.setMetaSuperclass(text)
                    jsonEntity.SetMeta("", "", "", html, "")
                    break
                case 4:
                    sharedHTML.setMetaRefentities(html)
                    sharedTEXT.setMetaRefentities(text)
                    jsonEntity.SetMeta("", "", "", "", html)
                    break
            }
        }

        const onToggleVisible = () => {
            visEditor.value = !visEditor.value
        }

        const vBtnTxt = () => {
            return visEditor.value ? "⏫" : "⏬"
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
</style>
