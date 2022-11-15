<template>
    <CollectionName />
    <br />
    <CollectionDef />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CollectionName from "./1_Name.vue";
import CollectionDef from "./2_Def.vue";

export default defineComponent({
    name: "CollectionEntity",
    components: {
        CollectionName,
        CollectionDef,
    },
    setup() {
        return {};
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
