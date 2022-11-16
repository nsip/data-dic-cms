<template>
    <EntryName />
    <br />
    <EntryDef />
    <br />
    <EntryUrl />
    <br />
    <EntryMeta />
    <br />
    <EntryEntities />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EntryName from "./1_Name.vue";
import EntryDef from "./2_Def.vue";
import EntryUrl from "./3_Url.vue";
import EntryMeta from "./4_Meta.vue";
import EntryEntities from "./5_Entities.vue";

export default defineComponent({
    name: "CollectionEntity",
    components: {
        EntryName,
        EntryDef,
        EntryUrl,
        EntryMeta,
        EntryEntities,
    },
    setup() {
        return {};
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
