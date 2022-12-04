<template>
    <div class="com">
        <span class="label">Entity:</span>
        <input class="content" type="text" v-model="entity" :readonly="Mode == 'edit'" placeholder="entity name" />
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted, watchEffect } from "vue";
import { jsonEntHTML as jsonHTML, jsonEntTEXT as jsonTEXT } from "@/share/EntType";
import { Mode } from "@/share/share";

const entity = ref("");

onMounted(async () => {
    await new Promise((f) => setTimeout(f, 500));
    entity.value = jsonTEXT.Entity;
});

watchEffect(() => {
    jsonHTML.SetName(entity.value);
    jsonTEXT.SetName(entity.value);
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
    margin-top: 10px;
}

.content {
    position: relative;
    margin-left: 1%;
    width: 88%;
    padding-left: 1%;
    font-weight: bold;
    text-align: center;
}
</style>
