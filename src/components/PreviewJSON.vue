<template>
    <pre>{{ genJSON() }}</pre>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { jsonEntity } from './share/share'

export default defineComponent({
    name: 'PreviewJSON',
    // props: {
    //     msg: String,
    // },
    setup() {
        const genJSON = () => {
            const json = jsonEntity.GenJSON()
            // console.log(json)
            return json
        }
        return {
            genJSON
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
 