<template>
    <div class="com">
        <span class="label">Other Standards:</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <button class="less-editor" @click="onMoreLessClick('-')">
            <font-awesome-icon icon="circle-minus" />
        </button>
        <button class="more-editor" @click="onMoreLessClick('+')">
            <font-awesome-icon icon="circle-plus" />
        </button>
        <span class="hint2">list of [standard, link(list), path(list), definition, commentary]</span>
        <div v-if="visEditor">
            <div v-for="(n, i) in nEditor" :key="i">
                <TextLine :text="i.toString()" textAlign="center" textColor="gray" lineColor="black" lineHeight="1.5px" />
                <EditorOtherStd :idx="i" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { jsonEntityHTML as jsonHTML, jsonEntityTEXT as jsonTEXT } from "@/share/EntityType";
import { itemName, itemKind } from "@/share/share";
import TextLine from "../shared/TextLine.vue";
import EditorOtherStd from "./5_OtherStd_Editor.vue";

export default defineComponent({
    name: "EntOtherStd",
    components: {
        EditorOtherStd,
        TextLine,
    },
    setup() {
        let icon = ref("chevron-down");
        let visEditor = ref(false);
        let nEditor = ref(1);

        onMounted(async () => {
            await new Promise((f) => setTimeout(f, 500));
            if (itemName.value.length > 0 && itemKind.value.length > 0) {
                nEditor.value = jsonHTML.OtherStandards.length;
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
                        if (jsonTEXT.IsLastOtherStdEmpty()) {
                            alert("please use available editor(s). if hidden, unfold it");
                            break;
                        }

                        // add new OtherStandard element in json
                        jsonHTML.AddOtherStd();
                        jsonTEXT.AddOtherStd();

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
                        jsonHTML.RmOtherStdLast();
                        jsonTEXT.RmOtherStdLast();

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

</style>
