<template>
  <div class="com">
    <span class="label">{{ label }}</span>
    <button class="hide-editor" @click="onToggleVisible()"> {{ vBtnTxt() }} </button>
    <span class="hint2">{{ hint }}</span>
    <div :hidden="!visEditor">
      <!-- essential, minimal, full, and ""  -->
      <QuillEditor theme="snow" toolbar="essential" placeholder="identifier" @ready="onReady" @textChange="textChange(0)" />
      <hr class="subline" />
      <QuillEditor theme="snow" toolbar="essential" placeholder="type" @ready="onReady" @textChange="textChange(1)" />
      <hr class="subline" />
      <QuillEditor theme="snow" toolbar="essential" placeholder="expected attributes" @ready="onReady" @textChange="textChange(2)" />
      <hr class="subline" />
      <QuillEditor theme="snow" toolbar="essential" placeholder="superclasses" @ready="onReady" @textChange="textChange(3)" />
      <hr class="subline" />
      <QuillEditor theme="snow" toolbar="essential" placeholder="cross ref entities" @ready="onReady" @textChange="textChange(4)" />
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
  name: "EntryMeta",
  components: {
    QuillEditor,
  },
  setup() {
    const label = "Meta Data:";
    const hint =
      "list of [identifier, type, ExpectedAttributes(list), superclass(list), crossrefEntities(list)]";
    let thisQuills: Quill[] = [];
    let idxQuill = 0;
    let visEditor = ref(false);
    let flagSet: boolean = true;

    const onReady = (quill: Quill) => {
      thisQuills[idxQuill++] = quill;
    };

    const textChange = (idx: number) => {
      if (flagSet) {
        const html = thisQuills[idx].root.innerHTML; // get html from quill
        const text = thisQuills[idx].getText(0, 100000);
        switch (idx) {
          case 0:
            jsonEntityHTML.SetMeta("html", html, "", "", "", "");
            jsonEntityTEXT.SetMeta("", text, "", "", "", "");
            break;
          case 1:
            jsonEntityHTML.SetMeta("html", "", html, "", "", "");
            jsonEntityTEXT.SetMeta("", "", text, "", "", "");
            break;
          case 2:
            jsonEntityHTML.SetMeta("html", "", "", html, "", "");
            jsonEntityTEXT.SetMeta("", "", "", text, "", "");
            break;
          case 3:
            jsonEntityHTML.SetMeta("html", "", "", "", html, "");
            jsonEntityTEXT.SetMeta("", "", "", "", text, "");
            break;
          case 4:
            jsonEntityHTML.SetMeta("html", "", "", "", "", html);
            jsonEntityTEXT.SetMeta("", "", "", "", "", text);
            break;
        }
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

      const meta = jsonEntityHTML.Metadata
      thisQuills[0].root.innerHTML = meta.Identifier
      thisQuills[1].root.innerHTML = meta.Type
      thisQuills[2].root.innerHTML = meta.ExpectedAttributes != null ? meta.ExpectedAttributes.join('\n') : ""
      thisQuills[3].root.innerHTML = meta.Superclass != null ? meta.Superclass.join('\n') : ""
      thisQuills[4].root.innerHTML = meta.CrossrefEntities != null ? meta.CrossrefEntities.join('\n') : ""

      await new Promise((f) => setTimeout(f, 500));
      flagSet = true
    })

    return {
      label,
      hint,
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
