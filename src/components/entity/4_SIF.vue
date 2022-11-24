<template>
    <div class="com">
        <span class="label">SIF:</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <button class="less-editor" @click="onMoreLessClick('-')">
            <font-awesome-icon icon="circle-minus" />
        </button>
        <button class="more-editor" @click="onMoreLessClick('+')">
            <font-awesome-icon icon="circle-plus" />
        </button>
        <span class="hint2">list of [xpath(list), definition, commentary, datestamp]</span>
        <div v-if="visEditor">
            <div v-for="(n, i) in nEditor" :key="i">
                <TextLine :text="i.toString()" textAlign="center" textColor="gray" lineColor="black" lineHeight="1.5px" />
                <EditorSIF :idx="i" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { jsonEntHTML as jsonHTML, jsonEntTEXT as jsonTEXT } from "@/share/EntType";
import { itemName, itemKind } from "@/share/share";
import TextLine from "../shared/TextLine.vue";
import EditorSIF from "./4_SIF_Editor.vue";

export default defineComponent({
    name: "EntSIF",
    components: {
        EditorSIF,
        TextLine,
    },
    setup() {
        const icon = ref("chevron-down");
        const visEditor = ref(false);
        const nEditor = ref(1);

        onMounted(async () => {
            await new Promise((f) => setTimeout(f, 500));
            if (itemName.value.length > 0 && itemKind.value.length > 0) {
                nEditor.value = jsonHTML.SIF.length;
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
                        if (jsonTEXT.IsLastSIFEmpty()) {
                            alert("please use available editor(s). if hidden, unfold it");
                            break;
                        }

                        // add new OtherStandard element in json
                        jsonHTML.AddSIF();
                        jsonTEXT.AddSIF();

                        nEditor.value++;
                    }
                    break;

                case "-":
                    {
                        if (nEditor.value == 1) {
                            alert("no more editor group to remove");
                            break;
                        }

                        // remove last OtherStandard element in json
                        jsonHTML.RmSIFLast();
                        jsonTEXT.RmSIFLast();

                        nEditor.value--;
                    }
                    break;

                default:
            }
            // console.log('editor count:', nEditor.value)
        };

        return {
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
