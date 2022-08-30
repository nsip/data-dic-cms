<template>
    <pre>{{ genJSON(jsonTYPE) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { jsonHTML, jsonTEXT } from './share/json'

export default defineComponent({
    name: 'PreviewJSON',
    // props: {
    //     msg: String,
    // },
    setup() {
        let jsonTYPE = ref("html")
        const genJSON = (TYPE: string) => {
            switch (TYPE) {
                case "html":
                    return jsonHTML.GenJSON(true)                    
                default:
                    return jsonTEXT.GenJSON(false)
            }           
        }
        return {
            jsonTYPE,
            genJSON
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
 