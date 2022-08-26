<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <button class="hide-editor" @click="onToggleVisible()"> {{ vBtnTxt() }} </button>
        <div :hidden=!visEditor>
            <!-- essential, minimal, full, and ""  -->
            <QuillEditor theme="snow" toolbar="essential" :placeholder=holder @ready="onReady" @textChange="textChange" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { sharedHTML, sharedTEXT } from './share/share'

export default defineComponent({
    name: 'EntryDef',
    components: {
        QuillEditor
    },
    setup() {

        const label = "Definition:"
        const holder = "entity definition value"
        let thisQuill: Quill
        let visEditor = ref(false)

        const onReady = (quill: Quill) => {
            thisQuill = quill
        }

        const textChange = () => {
            const html = thisQuill.root.innerHTML; // get html from quill
            sharedHTML.setDefinition(html)

            const text = thisQuill.getText(0, 100000)
            sharedTEXT.setDefinition(text)
        }

        const onToggleVisible = () => {
            visEditor.value = !visEditor.value
        }

        const vBtnTxt = () => {
            return visEditor.value ? "⏫" : "⏬"
        }

        return {
            label,
            holder,
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
