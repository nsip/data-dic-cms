<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <button class="less-editor" @click="onMoreLessClick('-')">
            <font-awesome-icon icon="circle-minus" />
        </button>
        <button class="more-editor" @click="onMoreLessClick('+')">
            <font-awesome-icon icon="circle-plus" />
        </button>
        <span class="hint2">{{ hint }}</span>
        <div v-if="visEditor" v-for="(n, i) in nEditor" :key="i">
            <TextLine :text="i.toString()" textAlign="center" textColor="gray" lineColor="black" lineHeight="1.5px" />
            <EditorSIF :idx="i" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { jsonEntityHTML, jsonEntityTEXT } from "../../share/EntityType";
import { itemName, itemKind } from "../../share/share";
import TextLine from "../shared/TextLine.vue"
import EditorSIF from "./4_SIF_Editor.vue"

export default defineComponent({
    name: "EntrySIF",
    components: {
        EditorSIF,
        TextLine,
    },
    setup() {
        const label = "SIF:";
        const hint = "list of [xpath(list), definition, commentary, datestamp]";
        const icon = ref("chevron-down");

        const visEditor = ref(false);
        const nEditor = ref(1);

        onMounted(async () => {
            await new Promise((f) => setTimeout(f, 500));
            if (itemName.value.length > 0 && itemKind.value.length > 0) {
                nEditor.value = jsonEntityHTML.SIF.length;
            }
        })

        const onToggleVisible = () => {
            visEditor.value = !visEditor.value;
            icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
        };

        const onMoreLessClick = (type: string) => {
            switch (type) {
                case "+":
                    {
                        if (jsonEntityTEXT.IsLastSIFEmpty()) {
                            alert("please use available editor(s). if hidden, unfold it")
                            break
                        }

                        // add new OtherStandard element in json
                        jsonEntityHTML.AddSIF();
                        jsonEntityTEXT.AddSIF();

                        nEditor.value++;
                    }
                    break;

                case "-":
                    {
                        if (nEditor.value == 1) {
                            alert("no more editor group to remove")
                            break;
                        }

                        // remove last OtherStandard element in json
                        jsonEntityHTML.RmSIFLast();
                        jsonEntityTEXT.RmSIFLast();

                        nEditor.value--;
                    }
                    break;
                    
                default:
            }
            // console.log('editor count:', nEditor.value)
        };

        return {
            label,
            hint,
            icon,
            nEditor,
            visEditor,
            onMoreLessClick,
            onToggleVisible,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    text-align: center;
}
</style>
