<template>
    <div class="lbl_type">
        <label>value type:</label>
        <input class="selection" type="radio" name="json_val_type" value="" checked @click="selection('')"> <label>plain text value</label>
        <input class="selection" type="radio" name="json_val_type" value="html" @click="selection('html')"> <label>html value</label>
    </div>
    <hr>
    <pre>{{ genJSON(jsonTYPE) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { jsonHTML, jsonTEXT } from './share/Entity'

export default defineComponent({
    name: 'PreviewJSON',
    // props: {
    //     msg: String,
    // },
    setup() {
        let jsonTYPE = ref('') // default (checked) json type
        const genJSON = (TYPE: string) => {
            switch (TYPE) {
                case "html":
                    return jsonHTML.GenJSON(true)
                default:
                    return jsonTEXT.GenJSON(false)
            }
        }
        const selection = (TYPE: string) => {
           jsonTYPE.value = TYPE
        }
        return {
            jsonTYPE,
            genJSON,
            selection
        }
    }
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
