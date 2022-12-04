<template>
    <div class="com">
        <span class="label">Collection:</span>
        <input class="content" type="text" v-model="collection" :readonly="Mode == 'edit'" placeholder="collection name" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { jsonColHTML as jsonHTML, jsonColTEXT as jsonTEXT } from "@/share/ColType";
import { Mode } from "@/share/share";

const collection = ref("");

onMounted(async () => {
    await new Promise((f) => setTimeout(f, 500));
    collection.value = jsonTEXT.Entity;
});

watchEffect(() => {
    jsonHTML.SetName(collection.value);
    jsonTEXT.SetName(collection.value);
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
