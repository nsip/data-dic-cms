<template>
  <div class="lbl_type">
    <label>value type:</label>
    <input
      class="selection"
      type="radio"
      name="json_val_type"
      value=""
      checked
      @click="select('')"
    />
    <label>plain text value</label>
    <input
      class="selection"
      type="radio"
      name="json_val_type"
      value="html"
      @click="select('html')"
    />
    <label>html value</label>
  </div>
  <hr />
  <pre>{{ genJSON(jsonTYPE) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { jsonEntityHTML, jsonEntityTEXT } from "../share/EntityType";

export default defineComponent({
  name: "PreviewJSON",
  // props: {
  //     msg: String,
  // },
  setup() {
    let jsonTYPE = ref(""); // default (checked) json type
    const genJSON = (TYPE: string) => {
      switch (TYPE) {
        case "html":
          return jsonEntityHTML.GenJSON(true);
        default:
          return jsonEntityTEXT.GenJSON(false);
      }
    };
    const select = (TYPE: string) => {
      jsonTYPE.value = TYPE;
    };
    return {
      jsonTYPE,
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
