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
        <div v-if="visEditor" v-for="(n, iGrp) in editorCount" :key="iGrp">
            <hr />
            &nbsp;# {{ iGrp }}
            <QuillEditor theme="snow" toolbar="essential" placeholder="name" @ready="onReady" @textChange="textChange(iGrp, 0)" />
            <hr class="subline" />
            <QuillEditor theme="snow" toolbar="essential" placeholder="description" @ready="onReady" @textChange="textChange(iGrp, 1)" />
            <hr class="subline" />
            <QuillEditor theme="snow" toolbar="essential" placeholder="standard" @ready="onReady" @textChange="textChange(iGrp, 2)" />
            <hr class="subline" />
            <QuillEditor theme="snow" toolbar="essential" placeholder="elements" @ready="onReady" @textChange="textChange(iGrp, 3)" />
            <hr class="subline" />
            <QuillEditor theme="snow" toolbar="essential" placeholder="business rules" @ready="onReady" @textChange="textChange(iGrp, 4)" />
            <hr class="subline" />
            <QuillEditor theme="snow" toolbar="essential" placeholder="definition modification" @ready="onReady" @textChange="textChange(iGrp, 5)" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { jsonEntityHTML, jsonEntityTEXT } from "../../share/EntityType";
import { itemName, itemKind } from "../../share/share";

export default defineComponent({
    name: "EntryCol",
    components: {
        QuillEditor,
    },
    setup() {
        const label = "Collections:";
        const hint = "list of [name, description, standard, elements(list), businessRules(list), definitionModification]";
        let icon = ref("chevron-down");
        let thisQuills: Quill[] = [];
        let idxQuill = 0;
        let visEditor = ref(false);
        let editorCount = ref(1);
        let flagSet: boolean = true;

        const onReady = (quill: Quill) => {
            thisQuills[idxQuill++] = quill;
            // console.log('onQuillReady@ ' + timestamp())
        };

        const textChange = (idxGrp: number, idx: number) => {
            if (flagSet) {
                const html = thisQuills[idxGrp * 5 + idx].root.innerHTML; // get html from quill
                const text = thisQuills[idxGrp * 5 + idx].getText(0, 100000); // get text from quill
                switch (idx) {
                    case 0:
                        jsonEntityHTML.SetCol("html", idxGrp, html, "", "", "", "", "");
                        jsonEntityTEXT.SetCol("", idxGrp, text, "", "", "", "", "");
                        break;
                    case 1:
                        jsonEntityHTML.SetCol("html", idxGrp, "", html, "", "", "", "");
                        jsonEntityTEXT.SetCol("", idxGrp, "", text, "", "", "", "");
                        break;
                    case 2:
                        jsonEntityHTML.SetCol("html", idxGrp, "", "", html, "", "", "");
                        jsonEntityTEXT.SetCol("", idxGrp, "", "", text, "", "", "");
                        break;
                    case 3:
                        jsonEntityHTML.SetCol("html", idxGrp, "", "", "", html, "", "");
                        jsonEntityTEXT.SetCol("", idxGrp, "", "", "", text, "", "");
                        break;
                    case 4:
                        jsonEntityHTML.SetCol("html", idxGrp, "", "", "", "", html, "");
                        jsonEntityTEXT.SetCol("", idxGrp, "", "", "", "", text, "");
                        break;
                    case 5:
                        jsonEntityHTML.SetCol("html", idxGrp, "", "", "", "", "", html);
                        jsonEntityTEXT.SetCol("", idxGrp, "", "", "", "", "", text);
                        break;
                }
            }

        };

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

                        editorCount.value++;
                    }
                    break;

                case "-":
                    {
                        if (editorCount.value == 1) {
                            alert("no more editor group to remove")
                            break;
                        }

                        // clear preview
                        idxQuill -= 6;

                        // remove last Collection element in json
                        jsonEntityHTML.RmColLast();
                        jsonEntityTEXT.RmColLast();

                        editorCount.value--;
                    }
                    break;

                default:
            }
        };

        onMounted(async () => {
            await new Promise((f) => setTimeout(f, 500));
            flagSet = false

            if (itemName.value.length > 0 && itemKind.value.length > 0) {
                editorCount.value = jsonEntityHTML.Collections.length;
                await new Promise((f) => setTimeout(f, 500));
                for (let i = 0; i < jsonEntityHTML.Collections.length; i++) {
                    const col = jsonEntityHTML.Collections[i]
                    thisQuills[i * 6 + 0].root.innerHTML = col.Name
                    thisQuills[i * 6 + 1].root.innerHTML = col.Description
                    thisQuills[i * 6 + 2].root.innerHTML = col.Standard
                    thisQuills[i * 6 + 3].root.innerHTML = col.Elements != null ? col.Elements.join('\n') : ""
                    thisQuills[i * 6 + 4].root.innerHTML = col.BusinessRules != null ? col.BusinessRules.join('\n') : ""
                    thisQuills[i * 6 + 5].root.innerHTML = col.DefinitionModification
                }
            }

            await new Promise((f) => setTimeout(f, 500));
            flagSet = true
        })

        return {
            label,
            hint,
            icon,
            editorCount,
            visEditor,
            textChange,
            onReady,
            onMoreLessClick,
            onToggleVisible,
            jsonEntityTEXT,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
