<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <input class="content" type="text" v-model="entity" placeholder="entity name">
    </div>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { jsonEntityHTML, jsonEntityTEXT } from "../../share/EntityType";

export default defineComponent({
    name: "EntryName",
    setup() {
        const label = "Entity:";
        const entity = ref("")
        onMounted(async () => {
            await new Promise((f) => setTimeout(f, 500));
            entity.value = jsonEntityTEXT.Entity;
        })
        watchEffect(() => {
            jsonEntityHTML.SetName(entity.value)
            jsonEntityTEXT.SetName(entity.value)
        })
        return {
            label,
            entity,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
    margin-top: 10px;
}

.content {
    margin-left: 15px;
    width: 87%;
    padding-left: 1%;
    font-weight: bold;
    text-align: center;
}
</style>
