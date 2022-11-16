<template>
    <div class="com">
        <span class="label">Legal Definitions:</span>
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
            <EditorLegDef :idx="i" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { jsonEntityHTML, jsonEntityTEXT } from "../../share/EntityType";
import { itemName, itemKind } from "../../share/share";
import TextLine from "../shared/TextLine.vue"
import EditorLegDef from "./6_LegalDef_Editor.vue"

export default defineComponent({
    name: "EntryLegalDef",
    components: {
        EditorLegDef,
        TextLine,
    },
    setup() {
        const hint = "list of [legislationName, citation, link, definition, commentary, datestamp]";
        let icon = ref("chevron-down");

        let visEditor = ref(false);
        let nEditor = ref(1);

        onMounted(async () => {
            await new Promise((f) => setTimeout(f, 500));
            if (itemName.value.length > 0 && itemKind.value.length > 0) {
                nEditor.value = jsonEntityHTML.LegalDefinitions.length;               
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
                        if (jsonEntityTEXT.IsLastLegalDefEmpty()) {
                            alert("please use available editor(s). if hidden, unfold it")
                            break
                        }

                        // add new LegalDefinition element in json
                        jsonEntityHTML.AddLegalDef();
                        jsonEntityTEXT.AddLegalDef();

                        nEditor.value++;
                    }
                    break;

                case "-":
                    {
                        if (nEditor.value == 1) {
                            alert("no more editor group to remove")
                            break;
                        }

                        // remove last LegalDefinition element in json
                        jsonEntityHTML.RmLegalDefLast();
                        jsonEntityTEXT.RmLegalDefLast();

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
