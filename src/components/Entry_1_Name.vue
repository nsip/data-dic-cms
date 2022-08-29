<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <span class="hint1">{{ hint }}</span>
        <button class="hide-editor" @click="onToggleVisible()"> {{ vBtnTxt() }} </button>
        <div :hidden=!visEditor >
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
import { sharedHTML, sharedTEXT, jsonEntity } from './share/share'

export default defineComponent({
    name: 'EntryName',
    components: {
        QuillEditor
    },
    setup() {

        const label = "Name:"
        const hint = "entity name"
        const holder = "entity name value"
        let thisQuill: Quill
        let visEditor = ref(true)

        const onReady = (quill: Quill) => {
            thisQuill = quill
        }

        const textChange = () => {
            const html = thisQuill.root.innerHTML; // get html from quill
            const text = thisQuill.getText(0, 100000)

            sharedHTML.setEntity(html)            
            sharedTEXT.setEntity(text)

            jsonEntity.SetName(html)
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
h4 {
    margin-left: 5px;
}
</style>
