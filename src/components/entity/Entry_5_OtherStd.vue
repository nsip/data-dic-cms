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
        <div v-if="visEditor" v-for="(n, i) in editorCount" :key="i">
            <TextLine :text="i.toString()" textAlign="center" textColor="gray" lineColor="black" lineHeight="1.5px" />
            <EditorOtherStd :idx="i" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { jsonEntityHTML, jsonEntityTEXT } from "../../share/EntityType";
import { itemName, itemKind } from "../../share/share";
import TextLine from "../shared/TextLine.vue"
import EditorOtherStd from "./Entry_5_OtherStd_editor.vue"

export default defineComponent({
    name: "EntryOtherStd",
    components: {
        EditorOtherStd,
        TextLine,
    },
    setup() {
        const label = "Other Standards:";
        const hint = "list of [standard, link(list), path(list), definition, commentary]";
        let icon = ref("chevron-down");

        let visEditor = ref(false);
        let editorCount = ref(1);

        onMounted(async () => {
            await new Promise((f) => setTimeout(f, 500));
            if (itemName.value.length > 0 && itemKind.value.length > 0) {
                editorCount.value = jsonEntityHTML.OtherStandards.length;
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
                        if (jsonEntityTEXT.IsLastOtherStdEmpty()) {
                            alert("please use available editor(s). if hidden, unfold it")
                            break
                        }

                        // add new OtherStandard element in json
                        jsonEntityHTML.AddOtherStd();
                        jsonEntityTEXT.AddOtherStd();

                        editorCount.value++;
                    }
                    break;

                case "-":
                    {
                        if (editorCount.value == 1) {
                            alert("no more editor group to remove")
                            break;
                        }

                        // remove last OtherStandard element in json
                        jsonEntityHTML.RmOtherStdLast();
                        jsonEntityTEXT.RmOtherStdLast();

                        editorCount.value--;
                    }
                    break;

                default:
            }
            // console.log('editor count:', editorCount.value)
        };

        return {
            label,
            hint,
            icon,
            editorCount,
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
