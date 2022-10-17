<template>
  <div class="lbl_type">
    <label>Preview:</label>
    <input class="selection" type="radio" name="type" value="text" checked @click="select('text')" />
    <label>plain text json</label>
    <input class="selection" type="radio" name="type" value="html" @click="select('html')" />
    <label>html json value</label>
    <input class="selection" type="radio" name="type" value="preview" @click="select('preview')" />
    <label>effect</label>
  </div>
  <hr />
  <pre>{{ genJSON(selTYPE) }}</pre>
  <PreviewContent v-if="selTYPE == 'preview'" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { jsonEntityHTML, jsonEntityTEXT } from "../share/EntityType";
import PreviewContent from "./PreviewContent.vue";

export default defineComponent({
  name: "PreviewArea",
  // props: {
  //     msg: String,
  // },
  components: {
    PreviewContent,
  },
  setup() {
    let selTYPE = ref("text"); // default (checked) json type
    const genJSON = (TYPE: string) => {
      switch (TYPE) {
        case "text":
          return jsonEntityTEXT.GenJSON(false);
        case "html":
          return jsonEntityHTML.GenJSON(true);
        default:
          return "";
      }
    };
    const select = (TYPE: string) => {
      selTYPE.value = TYPE;
    };
    return {
      selTYPE,
      genJSON,
      select,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lbl_type {
  margin-top: 10px;
  margin-left: 10px;
  font-weight: bold;
}

.selection {
  margin-left: 15px;
}
</style>
