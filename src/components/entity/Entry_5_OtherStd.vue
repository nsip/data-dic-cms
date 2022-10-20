<template>
  <div class="com">
    <span class="label">{{ label }}</span>
    <button class="hide-editor" @click="onToggleVisible()">
      <font-awesome-icon :icon="icon" />
    </button>
    <button class="less-editor" @click="onMoreLessClick('-')" :disabled="editorCount == 1"> 
      <font-awesome-icon icon="circle-minus" />
    </button>
    <button class="more-editor" @click="onMoreLessClick('+')" :disabled="jsonEntityTEXT.IsLastSIFEmpty()"> 
      <font-awesome-icon icon="circle-plus" />
    </button>
    <span class="hint2">{{ hint }}</span>
    <div :hidden="!visEditor" v-for="(n, iGrp) in editorCount" :key="iGrp">
      <hr />
      &nbsp;# {{ iGrp }}
      <QuillEditor theme="snow" toolbar="essential" placeholder="standard" @ready="onReady" @textChange="textChange(iGrp, 0)" />
      <hr class="subline" />
      <QuillEditor theme="snow" toolbar="essential" placeholder="link list" @ready="onReady" @textChange="textChange(iGrp, 1)" />
      <hr class="subline" />
      <QuillEditor theme="snow" toolbar="essential" placeholder="path list" @ready="onReady" @textChange="textChange(iGrp, 2)" />
      <hr class="subline" />
      <QuillEditor theme="snow" toolbar="essential" placeholder="definition" @ready="onReady" @textChange="textChange(iGrp, 3)" />
      <hr class="subline" />
      <QuillEditor theme="snow" toolbar="essential" placeholder="commentary" @ready="onReady" @textChange="textChange(iGrp, 4)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEntityHTML, jsonEntityTEXT } from "../share/EntityType";
import { itemName, itemKind } from "../share/share";

export default defineComponent({
  name: "EntryOtherStd",
  components: {
    QuillEditor,
  },
  setup() {
    const label = "Other Standards:";
    const hint = "list of [standard, link(list), path(list), definition, commentary]";
    let icon = ref("chevron-down");
    let thisQuills: Quill[] = [];
    let idxQuill = 0;
    let visEditor = ref(false);
    let editorCount = ref(1);
    let flagSet: boolean = true;

    const onReady = (quill: Quill) => {
      thisQuills[idxQuill++] = quill;
      // console.log('onQuillReady@ ' + timestamp())
      // console.log('idxQuill:', idxQuill)
    };

    const textChange = (idxGrp: number, idx: number) => {
      if (flagSet) {
        const html = thisQuills[idxGrp * 5 + idx].root.innerHTML; // get html from quill
        const text = thisQuills[idxGrp * 5 + idx].getText(0, 100000); // get text from quill        
        switch (idx) {
          case 0:
            jsonEntityHTML.SetOtherStd("html", idxGrp, html, "", "", "", "");
            jsonEntityTEXT.SetOtherStd("", idxGrp, text, "", "", "", "");
            break;
          case 1:
            jsonEntityHTML.SetOtherStd("html", idxGrp, "", html, "", "", "");
            jsonEntityTEXT.SetOtherStd("", idxGrp, "", text, "", "", "");
            break;
          case 2:
            jsonEntityHTML.SetOtherStd("html", idxGrp, "", "", html, "", "");
            jsonEntityTEXT.SetOtherStd("", idxGrp, "", "", text, "", "");
            break;
          case 3:
            jsonEntityHTML.SetOtherStd("html", idxGrp, "", "", "", html, "");
            jsonEntityTEXT.SetOtherStd("", idxGrp, "", "", "", text, "");
            break;
          case 4:
            jsonEntityHTML.SetOtherStd("html", idxGrp, "", "", "", "", html);
            jsonEntityTEXT.SetOtherStd("", idxGrp, "", "", "", "", text);
            break;
        }
      }
    };

    const onToggleVisible = () => {
      visEditor.value = !visEditor.value;
      icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
    };

    const onMoreLessClick = (type: string) => {
      switch (type) {
        case "+":
          // add new OtherStandard element in json
          jsonEntityHTML.AddOtherStd();
          jsonEntityTEXT.AddOtherStd();

          editorCount.value++;
          break;
        case "-":
          // clear preview
          idxQuill -= 5;

          // remove last OtherStandard element in json
          jsonEntityHTML.RmOtherStdLast();
          jsonEntityTEXT.RmOtherStdLast();

          editorCount.value--;
          break;
        default:
      }
      // console.log('editor count:', editorCount.value)
    };

    onMounted(async () => {
      await new Promise((f) => setTimeout(f, 500));
      flagSet = false

      if (itemName.value.length > 0 && itemKind.value.length > 0) {
        editorCount.value = jsonEntityHTML.OtherStandards.length;
        await new Promise((f) => setTimeout(f, 500));
        for (let i = 0; i < jsonEntityHTML.OtherStandards.length; i++) {
          const os = jsonEntityHTML.OtherStandards[i]
          thisQuills[i * 5 + 0].root.innerHTML = os.Standard
          thisQuills[i * 5 + 1].root.innerHTML = os.Link != null ? os.Link.join('\n') : ""
          thisQuills[i * 5 + 2].root.innerHTML = os.Path != null ? os.Path.join('\n') : ""
          thisQuills[i * 5 + 3].root.innerHTML = os.Definition
          thisQuills[i * 5 + 4].root.innerHTML = os.Commentary
        }
      }

      await new Promise((f) => setTimeout(f, 500));
      flagSet = true
    })

    return {
      label,
      hint,
      icon,
      editorCount,
      visEditor,
      textChange,
      onReady,
      onMoreLessClick,
      onToggleVisible,
      jsonEntityTEXT,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
