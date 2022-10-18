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
import { defineComponent, ref, onMounted } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEntityHTML, jsonEntityTEXT } from "../share/EntityType";

export default defineComponent({
  name: "EntryDef",
  components: {
    QuillEditor,
  },
  setup() {
    const label = "Definition:";
    const hint = "entity definition";
    const holder = "entity definition value";
    let thisQuill: Quill;
    let visEditor = ref(false);
    let flagSet: boolean = true;

    const onReady = (quill: Quill) => {
      thisQuill = quill;
    };

    const textChange = () => {
      if (flagSet) {
        jsonEntityHTML.SetDefinition(thisQuill.root.innerHTML);
        jsonEntityTEXT.SetDefinition(thisQuill.getText(0, 100000));
      }
    };

    const onToggleVisible = () => {
      visEditor.value = !visEditor.value;
    };

    const vBtnTxt = () => {
      return visEditor.value ? "⤴" : "⤵";
    };

    onMounted(async () => {
      await new Promise((f) => setTimeout(f, 500));
      flagSet = false

      thisQuill.root.innerHTML = jsonEntityHTML.Definition;

      await new Promise((f) => setTimeout(f, 500));
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

</style>
