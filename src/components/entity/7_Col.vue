<template>
    <div class="com">
        <span class="label">Collections:</span>
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
            <EditorCol :idx="i" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { jsonEntityHTML, jsonEntityTEXT } from "../../share/EntityType";
import { itemName, itemKind } from "../../share/share";
import TextLine from "../shared/TextLine.vue"
import EditorCol from "./7_Col_Editor.vue"

export default defineComponent({
    name: "EntryCol",
    components: {
        EditorCol,
        TextLine,
    },
    setup() {
        const hint = "list of [name, description, standard, elements(list), businessRules(list), definitionModification]";
        let icon = ref("chevron-down");

        let visEditor = ref(false);        
        let nEditor = ref(1);

        onMounted(async () => {
            await new Promise((f) => setTimeout(f, 500));
            if (itemName.value.length > 0 && itemKind.value.length > 0) {
                nEditor.value = jsonEntityHTML.Collections.length;
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
                        if (jsonEntityTEXT.IsLastColEmpty()) {
                            alert("please use available editor(s). if hidden, unfold it")
                            break
                        }

                        // add new Collection element in json
                        jsonEntityHTML.AddCol();
                        jsonEntityTEXT.AddCol();

                        nEditor.value++;
                    }
                    break;

                case "-":
                    {
                        if (nEditor.value == 1) {
                            alert("no more editor group to remove")
                            break;
                        }

                        // remove last Collection element in json
                        jsonEntityHTML.RmColLast();
                        jsonEntityTEXT.RmColLast();

                        nEditor.value--;
                    }
                    break;

                default:
            }
        };

        return {
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

</style>
