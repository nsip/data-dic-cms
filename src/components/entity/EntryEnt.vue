<template>
    <EntName />
    <br />
    <EntOtherNames />
    <br />
    <EntDef />
    <br />
    <EntSIF />
    <br />
    <EntOtherStd />
    <br />
    <EntLegalDef />
    <br />
    <EntCol />
    <br />
    <EntMeta />
</template>

<script setup lang="ts">
import EntName from "./1_Name.vue";
import EntOtherNames from "./2_OtherNames.vue";
import EntDef from "./3_Def.vue";
import EntSIF from "./4_SIF.vue";
import EntOtherStd from "./5_OtherStd.vue";
import EntLegalDef from "./6_LegalDef.vue";
import EntCol from "./7_Col.vue";
import EntMeta from "./8_Meta.vue";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
