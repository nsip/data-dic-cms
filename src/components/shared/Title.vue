<template>
    <div>
        <span class="title"> {{ title }} </span>
        <span class="user"> {{ loginUser }} </span>
        <hr class="sep" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Mode, itemKind, loginUser } from "@/share/share";

export default defineComponent({
    name: "MainTitle",
    setup() {   
        const typeName = itemKind.value == "entity" ? "Entity" : "Collection";
        const title = Mode.value == "edit" ? `${typeName} Edit` : `New ${typeName}`;
        return {
            title,
            loginUser,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
    float: center;
    text-align: center;
    font-size: 160%;
    font-weight: bold;
    margin-left: 0.5%;
}

.user {
    float: right;
    margin-top: 0.4%;
    margin-right: 1%;
}

.sep {
    margin-top: 0.5%;
    margin-bottom: 1%;
}
</style>
