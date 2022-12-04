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
        <span class="hint2">list of [legislationName, citation, link, definition, commentary, datestamp]</span>
        <div v-if="visEditor">
            <div v-for="(n, i) in nEditor" :key="i">
                <TextLine :text="i.toString()" textAlign="center" textColor="gray" lineColor="black" lineHeight="1.5px" />
                <EditorLegDef :idx="i" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from "vue";
import { jsonEntHTML as jsonHTML, jsonEntTEXT as jsonTEXT } from "@/share/EntType";
import { itemName, itemKind } from "@/share/share";
import TextLine from "../shared/TextLine.vue";
import EditorLegDef from "./6_LegalDef_Editor.vue";

let icon = ref("chevron-down");
let visEditor = ref(false);
let nEditor = ref(1);

onMounted(async () => {
    await new Promise((f) => setTimeout(f, 500));
    if (itemName.value.length > 0 && itemKind.value.length > 0) {
        if (jsonHTML.LegalDefinitions.length > 0) {
            nEditor.value = jsonHTML.LegalDefinitions.length;
        }
    }
});

const onToggleVisible = () => {
    visEditor.value = !visEditor.value;
    icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
};

const onMoreLessClick = (type: string) => {
    switch (type) {
        case "+":
            {
                if (jsonTEXT.IsLastLegalDefEmpty()) {
                    alert("please use available editor(s). if hidden, unfold it");
                    break;
                }

                // add new LegalDefinition element in json
                jsonHTML.AddLegalDef();
                jsonTEXT.AddLegalDef();

                nEditor.value++;
            }
            break;

        case "-":
            {
                if (nEditor.value <= 1) {
                    alert("no more editor group to remove");
                    break;
                }

                // remove last LegalDefinition element in json
                jsonHTML.RmLegalDefLast();
                jsonTEXT.RmLegalDefLast();

                nEditor.value--;
            }
            break;
        default:
    }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
