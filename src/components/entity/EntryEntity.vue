<template>
    <EntryName />
    <br />
    <EntryOtherNames />
    <br />
    <EntryDef />
    <br />
    <EntrySIF />
    <br />
    <EntryOtherStd />
    <br />
    <EntryLegalDef />
    <br />
    <EntryCol />
    <br />
    <EntryMeta />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EntryName from "./1_Name.vue";
import EntryOtherNames from "./2_OtherName.vue";
import EntryDef from "./3_Def.vue";
import EntrySIF from "./4_SIF.vue";
import EntryOtherStd from "./5_OtherStd.vue";
import EntryLegalDef from "./6_LegalDef.vue";
import EntryCol from "./7_Col.vue";
import EntryMeta from "./8_Meta.vue";

export default defineComponent({
    name: "EntryEntity",
    components: {
        EntryName,
        EntryOtherNames,
        EntryDef,
        EntrySIF,
        EntryOtherStd,
        EntryLegalDef,
        EntryCol,
        EntryMeta,
    },
    setup() {
        return {};
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
