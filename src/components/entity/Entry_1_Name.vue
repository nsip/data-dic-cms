<template>
  <div class="com">
    <span class="label">{{ label }}</span>
    <button class="hide-editor" @click="onToggleVisible()"> {{ vBtnTxt() }} </button>
    <span class="hint1">{{ hint }}</span>
    <div :hidden="!visEditor">
      <!-- essential, minimal, full, and ""  -->
      <QuillEditor theme="snow" toolbar="essential" :placeholder="holder" @ready="onReady" @textChange="textChange" />
    </div>
  </div>
</template>

<script lang="ts">
// npm install @vueup/vue-quill@beta --save

import { defineComponent, ref, onMounted } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEntityHTML, jsonEntityTEXT } from "../share/EntityType";

export default defineComponent({
  name: "EntryName",
  components: {
    QuillEditor,
  },
  setup() {
    const label = "Entity:";
    const hint = "entity name";
    const holder = "entity name value";
    let thisQuill: Quill;
    let visEditor = ref(true);
    let flagSet: boolean = true

    const onReady = (quill: Quill) => {
      thisQuill = quill;
    };

    const textChange = () => {
      if (flagSet) {
        jsonEntityHTML.SetName(thisQuill.root.innerHTML);
        jsonEntityTEXT.SetName(thisQuill.getText(0, 100000));
      }
    };

    const onToggleVisible = () => {
      visEditor.value = !visEditor.value;
    };

    const vBtnTxt = () => {
      return visEditor.value ? "⤴" : "⤵";
    };

    onMounted(async () => {
      await new Promise((f) => setTimeout(f, 400));
      flagSet = false

      thisQuill.root.innerHTML = jsonEntityHTML.Entity;

      await new Promise((f) => setTimeout(f, 100));
      flagSet = true
    })

    return {
      label,
      hint,
      holder,
      visEditor,
      textChange,
      onReady,
      onToggleVisible,
      vBtnTxt,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
  margin-left: 5px;
}
</style>
