<template>
    <div v-html="genJSON()"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { sharedHTML } from './share/share'

export default defineComponent({
    name: 'PreviewJSON',
    // props: {
    //     msg: String,
    // },
    setup() {        
        const genJSON = () => {

            


            return sharedHTML.entity
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
