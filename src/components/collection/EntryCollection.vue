<template>
    <ColName />
    <br />
    <ColDef />
    <br />
    <ColUrl />
    <br />
    <ColMeta />
    <br />
    <ColEntities />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ColName from "./1_Name.vue";
import ColDef from "./2_Def.vue";
import ColUrl from "./3_Url.vue";
import ColMeta from "./4_Meta.vue";
import ColEntities from "./5_Entities.vue";

export default defineComponent({
    name: "CollectionEntity",
    components: {
        ColName,
        ColDef,
        ColUrl,
        ColMeta,
        ColEntities,
    },
    setup() {
        return {};
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
