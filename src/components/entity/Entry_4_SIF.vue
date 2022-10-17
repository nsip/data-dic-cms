<template>
  <div class="com">
    <span class="label">{{ label }}</span>
    <button class="hide-editor" @click="onToggleVisible()">
      {{ vBtnTxt() }}
    </button>
    <button
      class="less-editor"
      @click="onMoreLessClick('-')"
      :disabled="editorCount == 1"
    >
      -
    </button>
    <button
      class="more-editor"
      @click="onMoreLessClick('+')"
      :disabled="jsonEntityTEXT.IsLastSIFEmpty()"
    >
      +
    </button>
    <span class="hint2">{{ hint }}</span>
    <div :hidden="!visEditor" v-for="(n, iGrp) in editorCount" :key="iGrp">
      <hr />
      &nbsp;# {{ iGrp }}
      <QuillEditor
        theme="snow"
        toolbar="essential"
        placeholder="list of xpath"
        @ready="onReady"
        @textChange="textChange(iGrp, 0)"
      />
      <hr class="subline" />
      <QuillEditor
        theme="snow"
        toolbar="essential"
        placeholder="definition"
        @ready="onReady"
        @textChange="textChange(iGrp, 1)"
      />
      <hr class="subline" />
      <QuillEditor
        theme="snow"
        toolbar="essential"
        placeholder="commentary"
        @ready="onReady"
        @textChange="textChange(iGrp, 2)"
      />
      <hr class="subline" />
      <QuillEditor
        theme="snow"
        toolbar="essential"
        placeholder="datestamp"
        @ready="onReady"
        @textChange="textChange(iGrp, 3)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEntityHTML, jsonEntityTEXT } from "../share/EntityType";

export default defineComponent({
  name: "EntrySIF",
  components: {
    QuillEditor,
  },
  setup() {
    const label = "SIF:";
    const hint = "list of [xpath(list), definition, commentary, datestamp]";
    let thisQuills: Quill[] = [];
    let idxQuill = 0;
    let visEditor = ref(false);
    let editorCount = ref(1);

    const onReady = (quill: Quill) => {
      thisQuills[idxQuill++] = quill;
    };

    const textChange = (idxGrp: number, idx: number) => {
      const html = thisQuills[idxGrp * 4 + idx].root.innerHTML; // get html from quill
      const text = thisQuills[idxGrp * 4 + idx].getText(0, 100000); // get text from quill

      switch (idx) {
        case 0:
          jsonEntityHTML.SetSIF("html", idxGrp, html, "", "", "");
          jsonEntityTEXT.SetSIF("", idxGrp, text, "", "", "");
          break;
        case 1:
          jsonEntityHTML.SetSIF("html", idxGrp, "", html, "", "");
          jsonEntityTEXT.SetSIF("", idxGrp, "", text, "", "");
          break;
        case 2:
          jsonEntityHTML.SetSIF("html", idxGrp, "", "", html, "");
          jsonEntityTEXT.SetSIF("", idxGrp, "", "", text, "");
          break;
        case 3:
          jsonEntityHTML.SetSIF("html", idxGrp, "", "", "", html);
          jsonEntityTEXT.SetSIF("", idxGrp, "", "", "", text);
          break;
      }
    };

    const onToggleVisible = () => {
      visEditor.value = !visEditor.value;
    };

    const vBtnTxt = () => {
      return visEditor.value ? "⤴" : "⤵";
    };

    const onMoreLessClick = (type: string) => {
      switch (type) {
        case "+":
          // add new OtherStandard element in json
          jsonEntityHTML.AddSIF();
          jsonEntityTEXT.AddSIF();

          editorCount.value++;
          break;
        case "-":
          // clear preview
          idxQuill -= 4;

          // remove last OtherStandard element in json
          jsonEntityHTML.RmSIFLast();
          jsonEntityTEXT.RmSIFLast();

          editorCount.value--;
          break;
        default:
      }
      // console.log('editor count:', editorCount.value)
    };

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
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  text-align: center;
}
</style>
