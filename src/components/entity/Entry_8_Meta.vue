<template>
    <div class="com">
        <span class="label">{{ label }}</span>
        <button class="hide-editor" @click="onToggleVisible()">
            <font-awesome-icon :icon="icon" />
        </button>
        <span class="hint2">{{ hint }}</span>
        <div v-if="visEditor">

            <TextLine text="identifier:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
            <textarea class="content-sl" ref="taID" v-model="identifier" placeholder="identifier"></textarea>

            <TextLine text="type:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
            <textarea class="content-sl" ref="taTP" v-model="type" placeholder="type"></textarea>

            <TextLine text="expected attributes:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
            <textarea class="content-ml" ref="taEA" v-model="attributes" placeholder="expected attributes"></textarea>

            <TextLine text="superclasses:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
            <textarea class="content-ml" ref="taSC" v-model="superclasses" placeholder="superclasses"></textarea>

            <TextLine text="cross ref entities:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0.5px" />
            <textarea class="content-ml" ref="taRE" v-model="refentities" placeholder="cross ref entities"></textarea>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { jsonEntityHTML, jsonEntityTEXT } from "../../share/EntityType";
import TextLine from "../shared/TextLine.vue"

export default defineComponent({
    name: "EntryMeta",
    components: {
        TextLine,
    },
    setup() {
        const label = "Meta Data:";
        const hint = "[identifier, type, ExpectedAttributes(list), superclass(list), crossrefEntities(list)]";
        let icon = ref("chevron-down");

        const identifier = ref("")
        const type = ref("")
        const attributes = ref("")
        const superclasses = ref("")
        const refentities = ref("")

        const taID = ref<HTMLTextAreaElement | null>(null); // fetch element
        const taTP = ref<HTMLTextAreaElement | null>(null); // fetch element
        const taEA = ref<HTMLTextAreaElement | null>(null); // fetch element
        const taSC = ref<HTMLTextAreaElement | null>(null); // fetch element
        const taRE = ref<HTMLTextAreaElement | null>(null); // fetch element

        let visEditor = ref(false);

        onMounted(async () => {
            await new Promise((f) => setTimeout(f, 500)); // textarea needs to wait, quill in 'onReady'
            const meta = jsonEntityTEXT.Metadata
            identifier.value = meta.Identifier
            type.value = meta.Type
            attributes.value = meta.ExpectedAttributes != null ? meta.ExpectedAttributes.join('\n') : ""
            superclasses.value = meta.Superclass != null ? meta.Superclass.join('\n') : ""
            refentities.value = meta.CrossrefEntities != null ? meta.CrossrefEntities.join('\n') : ""
        })

        watchEffect(() => {

            jsonEntityHTML.SetMeta("html", identifier.value, type.value, attributes.value, superclasses.value, refentities.value);
            jsonEntityTEXT.SetMeta("", identifier.value, type.value, attributes.value, superclasses.value, refentities.value);

            if (taEA.value != null) {
                const numberOfLineBreaks = (attributes.value.match(/\n/g) || []).length;
                const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
                taEA.value!.style.height = newHeight + "px";
            }

            if (taSC.value != null) {
                const numberOfLineBreaks = (superclasses.value.match(/\n/g) || []).length;
                const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
                taSC.value!.style.height = newHeight + "px";
            }

            if (taRE.value != null) {
                const numberOfLineBreaks = (refentities.value.match(/\n/g) || []).length;
                const newHeight = 10 + numberOfLineBreaks * 20 + 12 + 2;
                taRE.value!.style.height = newHeight + "px";
            }

        })

        const onToggleVisible = () => {
            visEditor.value = !visEditor.value;
            icon.value = icon.value == "chevron-down" ? "chevron-up" : "chevron-down";
        };

        return {
            label,
            hint,
            icon,
            visEditor,

            // bind variable
            identifier,
            type,
            attributes,
            superclasses,
            refentities,

            // textarea ref
            taID,
            taTP,
            taEA,
            taSC,
            taRE,

            onToggleVisible,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-sl {
    margin-left: 0px;
    padding-left: 1%;
    resize: none;
    display: block;
    overflow: hidden;
    width: 98%;
    min-height: 30px;
    line-height: 20px;
}

.content-ml {
    margin-left: 0px;
    padding-left: 1%;
    resize: vertical;
    display: block;
    overflow: hidden;
    width: 98%;
    min-height: 40px;
    line-height: 20px;
}
</style>
